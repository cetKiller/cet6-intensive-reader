from __future__ import annotations

import json
import os
import re
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI


ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = ROOT.parent
PAPERS_FILE = ROOT / "data" / "papers.js"
OUTPUT_FILE = ROOT / "data" / "translations.js"
MANUAL_KEYS = {"2025-06-1:detailed-1"}
WORKERS = 4
MAX_RETRIES = 4


def load_papers() -> list[dict]:
    raw = PAPERS_FILE.read_text(encoding="utf-8").strip()
    prefix = "window.CET6_DATA = "
    if not raw.startswith(prefix) or not raw.endswith(";"):
        raise ValueError("Unexpected papers.js format")
    return json.loads(raw[len(prefix) : -1])


def load_existing() -> dict[str, list[list[str]]]:
    if not OUTPUT_FILE.exists():
        return {}
    raw = OUTPUT_FILE.read_text(encoding="utf-8").strip()
    prefix = "window.CET6_TRANSLATIONS = "
    if not raw.startswith(prefix) or not raw.endswith(";"):
        return {}
    try:
        return json.loads(raw[len(prefix) : -1])
    except json.JSONDecodeError:
        return {}


def sentence_split(value: str) -> list[str]:
    value = re.sub(r"\s+", " ", value).strip()
    protected = (
        value.replace("Mr.", "Mr<DOT>")
        .replace("Mrs.", "Mrs<DOT>")
        .replace("Dr.", "Dr<DOT>")
    )
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z0-9\"'])", protected)
    return [part.replace("<DOT>", ".").strip() for part in parts if part.strip()]


def paragraph_text(paragraph: str | dict) -> str:
    return paragraph if isinstance(paragraph, str) else paragraph.get("text", "")


def passage_payload(passage: dict) -> list[list[str]]:
    return [sentence_split(paragraph_text(paragraph)) for paragraph in passage.get("paragraphs", [])]


def make_client() -> OpenAI:
    load_dotenv(REPO_ROOT / ".env")
    api_key = os.getenv("DEEPSEEK_API_KEY")
    if not api_key:
        raise RuntimeError("DEEPSEEK_API_KEY is missing")
    return OpenAI(api_key=api_key, base_url="https://api.deepseek.com/v1", timeout=180)


def parse_json_response(content: str) -> dict:
    content = content.strip()
    if content.startswith("```"):
        content = re.sub(r"^```(?:json)?\s*", "", content)
        content = re.sub(r"\s*```$", "", content)
    return json.loads(content)


def validate_translation(payload: list[list[str]], result: dict) -> list[list[str]]:
    translations = result.get("translations")
    if not isinstance(translations, list):
        raise ValueError("Missing translations array")
    if len(translations) != len(payload):
        raise ValueError(f"Paragraph count mismatch: expected {len(payload)}, got {len(translations)}")
    cleaned: list[list[str]] = []
    for index, (source_sentences, translated_sentences) in enumerate(zip(payload, translations)):
        if not isinstance(translated_sentences, list):
            raise ValueError(f"Paragraph {index} is not an array")
        normalized = []
        for sentence in translated_sentences:
            if not isinstance(sentence, str) or not sentence.strip():
                raise ValueError(f"Paragraph {index} contains an empty translation")
            normalized.append(sentence.strip())
        expected = len(source_sentences)
        while len(normalized) > expected:
            normalized[-2] = f"{normalized[-2].rstrip('。！？')}，{normalized[-1].lstrip('，')}"
            normalized.pop()
        while len(normalized) < expected:
            # Very short source fragments may be merged by the model. Keep the
            # visual alignment stable without dropping translated content.
            normalized.append("")
        cleaned.append(normalized)
    return cleaned


def translate_passage(client: OpenAI, paper: dict, passage: dict) -> tuple[str, list[list[str]]]:
    payload = passage_payload(passage)
    key = f"{paper['id']}:{passage['id']}"
    source = {
        "paper": paper["title"],
        "section": passage["label"],
        "paragraphs": [
            {"index": index, "sentences": sentences}
            for index, sentences in enumerate(payload)
        ],
    }
    prompt = (
        "You are a professional CET-6 reading translator. Translate the following English "
        "paragraphs into accurate, natural Simplified Chinese sentence by sentence.\n\n"
        "Rules:\n"
        "1. Return one Chinese sentence for every English sentence, preserving sentence count and order.\n"
        "2. Do not merge, split, omit, summarize, or add commentary.\n"
        "3. Keep cloze placeholders such as ___26___ exactly as they appear.\n"
        "4. Translate academic arguments faithfully and use idiomatic Chinese.\n"
        "5. Output valid JSON only in the form "
        '{"translations":[["第一段第1句译文","第一段第2句译文"],["第二段第1句译文"]]}.\n\n'
        f"Source:\n{json.dumps(source, ensure_ascii=False)}"
    )

    last_error = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            response = client.chat.completions.create(
                model="deepseek-chat",
                temperature=0.1,
                max_tokens=8000,
                response_format={"type": "json_object"},
                messages=[
                    {
                        "role": "system",
                        "content": "You translate exam reading passages with strict sentence alignment.",
                    },
                    {"role": "user", "content": prompt},
                ],
            )
            parsed = parse_json_response(response.choices[0].message.content or "")
            return key, validate_translation(payload, parsed)
        except Exception as exc:  # Retry API and validation failures.
            last_error = exc
            if attempt < MAX_RETRIES:
                time.sleep(attempt * 2)
    raise RuntimeError(f"{key} failed after {MAX_RETRIES} attempts: {last_error}")


def write_output(translations: dict[str, list[list[str]]]) -> None:
    ordered = {key: translations[key] for key in sorted(translations)}
    payload = json.dumps(ordered, ensure_ascii=False, indent=2)
    temp = OUTPUT_FILE.with_suffix(".js.tmp")
    temp.write_text(f"window.CET6_TRANSLATIONS = {payload};\n", encoding="utf-8")
    temp.replace(OUTPUT_FILE)


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    papers = load_papers()
    translations = load_existing()
    client = make_client()
    lock = threading.Lock()
    tasks = []
    expected_keys = []

    for paper in papers:
        for passage in paper["passages"]:
            key = f"{paper['id']}:{passage['id']}"
            expected_keys.append(key)
            if key in MANUAL_KEYS:
                continue
            payload = passage_payload(passage)
            if key in translations and len(translations[key]) == len(payload):
                continue
            tasks.append((paper, passage))

    print(f"Need {len(tasks)} translations; cached {len(translations)}")
    failures = []
    completed = 0
    with ThreadPoolExecutor(max_workers=WORKERS) as pool:
        futures = {pool.submit(translate_passage, client, paper, passage): (paper, passage) for paper, passage in tasks}
        for future in as_completed(futures):
            paper, passage = futures[future]
            key = f"{paper['id']}:{passage['id']}"
            try:
                translated_key, result = future.result()
                with lock:
                    translations[translated_key] = result
                    write_output(translations)
                    completed += 1
                    print(f"[{completed}/{len(tasks)}] translated {translated_key}")
            except Exception as exc:
                failures.append((key, str(exc)))
                print(f"[failed] {key}: {exc}", file=sys.stderr)

    write_output(translations)
    missing = [
        key
        for key in expected_keys
        if key not in MANUAL_KEYS and key not in translations
    ]
    print(f"Wrote {len(translations)} translation records; missing {len(missing)}")
    if failures or missing:
        for key, error in failures:
            print(f"- {key}: {error}", file=sys.stderr)
        for key in missing:
            print(f"- missing: {key}", file=sys.stderr)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
