from __future__ import annotations

import json
import re
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from translate_papers import (
    MANUAL_KEYS,
    load_existing,
    load_papers,
    make_client,
    paragraph_text,
    parse_json_response,
    passage_payload,
    validate_translation,
    write_output,
)


ROOT = Path(__file__).resolve().parents[1]
ANNOTATIONS_FILE = ROOT / "data" / "annotations.js"
WORKERS = 3
MAX_RETRIES = 4
MIN_ANNOTATIONS = 10


def load_annotation_cache() -> dict[str, list[dict]]:
    if not ANNOTATIONS_FILE.exists():
        return {}
    raw = ANNOTATIONS_FILE.read_text(encoding="utf-8").strip()
    prefix = "window.CET6_ANNOTATIONS = "
    if not raw.startswith(prefix) or not raw.endswith(";"):
        return {}
    try:
        return json.loads(raw[len(prefix) : -1])
    except json.JSONDecodeError:
        return {}


def write_annotations(annotations: dict[str, list[dict]]) -> None:
    ordered = {key: annotations[key] for key in sorted(annotations)}
    payload = json.dumps(ordered, ensure_ascii=False, indent=2)
    temp = ANNOTATIONS_FILE.with_suffix(".js.tmp")
    temp.write_text(f"window.CET6_ANNOTATIONS = {payload};\n", encoding="utf-8")
    temp.replace(ANNOTATIONS_FILE)


def phrase_key(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip().lower()


def validate_annotations(source_text: str, raw_annotations) -> list[dict]:
    if not isinstance(raw_annotations, list):
        raise ValueError("annotations is not an array")
    haystack = phrase_key(source_text)
    seen = set()
    cleaned = []
    for item in raw_annotations:
        if not isinstance(item, dict):
            continue
        phrase = str(item.get("phrase", "")).strip()
        zh = str(item.get("zh", "")).strip()
        note = str(item.get("note", "")).strip()
        kind = str(item.get("type", "")).strip().lower()
        if not phrase or not zh:
            continue
        key = phrase_key(phrase)
        if key in seen or key not in haystack:
            continue
        if len(phrase) > 100:
            continue
        if kind not in {"word", "phrase", "special"}:
            kind = "phrase" if " " in phrase else "word"
        seen.add(key)
        cleaned.append(
            {
                "phrase": phrase,
                "zh": zh,
                "type": kind,
                "note": note,
            }
        )
    if len(cleaned) < MIN_ANNOTATIONS:
        raise ValueError(f"Only {len(cleaned)} valid annotations")
    return cleaned[:30]


def enhance_passage(client, paper: dict, passage: dict, draft_translation: list[list[str]]):
    key = f"{paper['id']}:{passage['id']}"
    payload = passage_payload(passage)
    source_text = " ".join(paragraph_text(paragraph) for paragraph in passage.get("paragraphs", []))
    source = {
        "paper": paper["title"],
        "section": passage["label"],
        "paragraphs": [
            {
                "index": index,
                "sentences": sentences,
                "draft_translation": draft_translation[index] if index < len(draft_translation) else [],
            }
            for index, sentences in enumerate(payload)
        ],
    }
    prompt = (
        "You are a CET-6 intensive-reading editor. Improve the Chinese translation and "
        "annotate the passage for Chinese learners preparing for CET-6.\n\n"
        "Translation requirements:\n"
        "1. Return the same paragraph count and sentence count as the source.\n"
        "2. Preserve cloze placeholders such as ___26___ exactly.\n"
        "3. Use accurate, idiomatic Simplified Chinese rather than literal word matching.\n"
        "4. Keep academic argumentation precise and do not add explanations.\n\n"
        "Annotation requirements:\n"
        "1. Select 18-28 CET-6-level difficult words, context-specific meanings, academic "
        "verbs, logical connectors, collocations, and multi-word chunks that materially help "
        "comprehension.\n"
        "2. Each phrase must be an exact, continuous English substring copied from the source. "
        "Do not paraphrase, inflect, or add punctuation.\n"
        "3. Prioritize CET-6 high-frequency vocabulary and words whose meaning changes by context. "
        "Skip names, numbers, and basic function words.\n"
        "4. Chinese glosses must be short and contextual, usually 2-8 Chinese characters. "
        "The note can briefly identify collocation, special meaning, or grammar.\n"
        "5. Avoid duplicates and avoid annotating the same word and a larger chunk containing it.\n\n"
        "Return valid JSON only:\n"
        '{"translations":[["第1段第1句译文","第1段第2句译文"],["第2段第1句译文"]],'
        '"annotations":[{"phrase":"prevent an employer from","zh":"阻止雇主","type":"phrase",'
        '"note":"搭配"},{"phrase":"provisions","zh":"条款","type":"word","note":"熟词僻义"}]}\n\n'
        f"Source and draft translations:\n{json.dumps(source, ensure_ascii=False)}"
    )

    last_error = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            response = client.chat.completions.create(
                model="deepseek-chat",
                temperature=0.15,
                max_tokens=10000,
                response_format={"type": "json_object"},
                messages=[
                    {
                        "role": "system",
                        "content": "You are a meticulous CET-6 reading editor and lexicographer.",
                    },
                    {"role": "user", "content": prompt},
                ],
            )
            parsed = parse_json_response(response.choices[0].message.content or "")
            translations = validate_translation(payload, parsed)
            annotations = validate_annotations(source_text, parsed.get("annotations"))
            return key, translations, annotations
        except Exception as exc:
            last_error = exc
            if attempt < MAX_RETRIES:
                time.sleep(attempt * 2)
    raise RuntimeError(f"{key} failed after {MAX_RETRIES} attempts: {last_error}")


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    papers = load_papers()
    translations = load_existing()
    annotations = load_annotation_cache()
    client = make_client()
    lock = threading.Lock()
    tasks = []

    for paper in papers:
        for passage in paper["passages"]:
            key = f"{paper['id']}:{passage['id']}"
            if key in MANUAL_KEYS or len(annotations.get(key, [])) >= MIN_ANNOTATIONS:
                continue
            draft = translations.get(key)
            if not draft:
                raise RuntimeError(f"Missing draft translation for {key}")
            tasks.append((paper, passage, draft))

    print(f"Need {len(tasks)} enhanced annotation sets")
    completed = 0
    failures = []
    with ThreadPoolExecutor(max_workers=WORKERS) as pool:
        futures = {
            pool.submit(enhance_passage, client, paper, passage, draft): (paper, passage)
            for paper, passage, draft in tasks
        }
        for future in as_completed(futures):
            paper, passage = futures[future]
            key = f"{paper['id']}:{passage['id']}"
            try:
                result_key, polished, annotation_set = future.result()
                with lock:
                    translations[result_key] = polished
                    annotations[result_key] = annotation_set
                    write_output(translations)
                    write_annotations(annotations)
                    completed += 1
                    print(
                        f"[{completed}/{len(tasks)}] {result_key}: "
                        f"{sum(len(p) for p in polished)} sentences, "
                        f"{len(annotation_set)} annotations"
                    )
            except Exception as exc:
                failures.append((key, str(exc)))
                print(f"[failed] {key}: {exc}", file=sys.stderr)

    write_output(translations)
    write_annotations(annotations)
    missing = [
        f"{paper['id']}:{passage['id']}"
        for paper in papers
        for passage in paper["passages"]
        if f"{paper['id']}:{passage['id']}" not in MANUAL_KEYS
        and len(annotations.get(f"{paper['id']}:{passage['id']}", [])) < MIN_ANNOTATIONS
    ]
    print(f"Wrote {len(annotations)} annotation sets; missing {len(missing)}")
    if failures or missing:
        for key, error in failures:
            print(f"- {key}: {error}", file=sys.stderr)
        for key in missing:
            print(f"- missing: {key}", file=sys.stderr)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
