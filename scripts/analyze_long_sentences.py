from __future__ import annotations

import json
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from translate_papers import (
    MANUAL_KEYS,
    load_papers,
    make_client,
    paragraph_text,
    parse_json_response,
    passage_payload,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_FILE = ROOT / "data" / "long-sentences.js"
WORKERS = 3
MAX_RETRIES = 4
MIN_ANALYSES = 2


def load_existing() -> dict[str, list[dict]]:
    if not OUTPUT_FILE.exists():
        return {}
    raw = OUTPUT_FILE.read_text(encoding="utf-8").strip()
    prefix = "window.CET6_LONG_SENTENCES = "
    if not raw.startswith(prefix) or not raw.endswith(";"):
        return {}
    try:
        return json.loads(raw[len(prefix) : -1])
    except json.JSONDecodeError:
        return {}


def write_output(data: dict[str, list[dict]]) -> None:
    ordered = {key: data[key] for key in sorted(data)}
    payload = json.dumps(ordered, ensure_ascii=False, indent=2)
    temp = OUTPUT_FILE.with_suffix(".js.tmp")
    temp.write_text(f"window.CET6_LONG_SENTENCES = {payload};\n", encoding="utf-8")
    temp.replace(OUTPUT_FILE)


def validate_analyses(payload: list[list[str]], raw_items) -> list[dict]:
    if not isinstance(raw_items, list):
        raise ValueError("long_sentences is not an array")
    seen = set()
    cleaned = []
    for item in raw_items:
        if not isinstance(item, dict):
            continue
        try:
            paragraph = int(item.get("paragraph"))
            sentence = int(item.get("sentence"))
        except (TypeError, ValueError):
            continue
        if paragraph < 0 or paragraph >= len(payload):
            continue
        if sentence < 0 or sentence >= len(payload[paragraph]):
            continue
        key = (paragraph, sentence)
        if key in seen:
            continue
        source_sentence = payload[paragraph][sentence]
        main = str(item.get("main", "")).strip()
        clauses = item.get("clauses")
        reading = str(item.get("reading", "")).strip()
        if not main or not reading or not isinstance(clauses, list):
            continue
        clauses = [str(clause).strip() for clause in clauses if str(clause).strip()]
        if not clauses:
            continue
        seen.add(key)
        cleaned.append(
            {
                "paragraph": paragraph,
                "sentence": sentence,
                "label": f"P{paragraph + 1} · S{sentence + 1}",
                "preview": source_sentence[:86],
                "main": main,
                "clauses": clauses[:6],
                "reading": reading,
            }
        )
    if len(cleaned) < MIN_ANALYSES:
        raise ValueError(f"Only {len(cleaned)} valid long-sentence analyses")
    return cleaned[:6]


def analyze_passage(client, paper: dict, passage: dict) -> tuple[str, list[dict]]:
    key = f"{paper['id']}:{passage['id']}"
    payload = passage_payload(passage)
    source = {
        "paper": paper["title"],
        "section": passage["label"],
        "paragraphs": [
            {"index": index, "sentences": sentences}
            for index, sentences in enumerate(payload)
        ],
    }
    prompt = (
        "You are a CET-6 long-sentence analyst. Select 3-5 sentences that Chinese "
        "CET-6 readers would most likely struggle with and explain their grammar.\n\n"
        "Rules:\n"
        "1. Paragraph and sentence indices are zero-based and must refer to the given source.\n"
        "2. Choose genuinely complex sentences with clauses, non-finite structures, "
        "insertions, comparison, inversion, or long modifiers.\n"
        "3. `main` should state the sentence skeleton clearly in English with brackets if useful.\n"
        "4. `clauses` must contain 2-5 concise Chinese bullets explaining grammar and logic.\n"
        "5. `reading` should explain the order in which a learner should parse the sentence.\n"
        "6. Do not repeat the same sentence.\n\n"
        "Return valid JSON only:\n"
        '{"long_sentences":[{"paragraph":1,"sentence":2,"main":"The study found that [X]...",'
        '"clauses":["that 引导宾语从句","which 修饰前文名词"],'
        '"reading":"先找主句谓语，再回到从句补充信息。"}]}\n\n'
        f"Source:\n{json.dumps(source, ensure_ascii=False)}"
    )

    last_error = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            response = client.chat.completions.create(
                model="deepseek-chat",
                temperature=0.15,
                max_tokens=7000,
                response_format={"type": "json_object"},
                messages=[
                    {
                        "role": "system",
                        "content": "You explain CET-6 long sentences accurately and concisely.",
                    },
                    {"role": "user", "content": prompt},
                ],
            )
            parsed = parse_json_response(response.choices[0].message.content or "")
            analyses = validate_analyses(payload, parsed.get("long_sentences"))
            return key, analyses
        except Exception as exc:
            last_error = exc
            if attempt < MAX_RETRIES:
                time.sleep(attempt * 2)
    raise RuntimeError(f"{key} failed after {MAX_RETRIES} attempts: {last_error}")


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    papers = load_papers()
    analyses = load_existing()
    client = make_client()
    lock = threading.Lock()
    tasks = []
    for paper in papers:
        for passage in paper["passages"]:
            key = f"{paper['id']}:{passage['id']}"
            if key in MANUAL_KEYS or len(analyses.get(key, [])) >= MIN_ANALYSES:
                continue
            tasks.append((paper, passage))

    print(f"Need {len(tasks)} long-sentence analysis sets")
    failures = []
    completed = 0
    with ThreadPoolExecutor(max_workers=WORKERS) as pool:
        futures = {
            pool.submit(analyze_passage, client, paper, passage): (paper, passage)
            for paper, passage in tasks
        }
        for future in as_completed(futures):
            paper, passage = futures[future]
            key = f"{paper['id']}:{passage['id']}"
            try:
                result_key, items = future.result()
                with lock:
                    analyses[result_key] = items
                    write_output(analyses)
                    completed += 1
                    print(f"[{completed}/{len(tasks)}] {result_key}: {len(items)} analyses")
            except Exception as exc:
                failures.append((key, str(exc)))
                print(f"[failed] {key}: {exc}", file=sys.stderr)

    write_output(analyses)
    missing = [
        f"{paper['id']}:{passage['id']}"
        for paper in papers
        for passage in paper["passages"]
        if f"{paper['id']}:{passage['id']}" not in MANUAL_KEYS
        and len(analyses.get(f"{paper['id']}:{passage['id']}", [])) < MIN_ANALYSES
    ]
    print(f"Wrote {len(analyses)} long-sentence sets; missing {len(missing)}")
    if failures or missing:
        for key, error in failures:
            print(f"- {key}: {error}", file=sys.stderr)
        for key in missing:
            print(f"- missing: {key}", file=sys.stderr)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
