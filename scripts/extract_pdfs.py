from __future__ import annotations

import json
import re
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
PDF_DIR = Path(r"D:\浏览器下载\cet6\cte6")
OUTPUT = ROOT / "data" / "papers.js"


def normalize_text(value: str) -> str:
    value = value.replace("\u00a0", " ")
    value = value.replace("\uFFFD\uFFFD", "'")
    value = value.replace("\uFFFD", "'")
    value = value.replace("  ", " ")
    value = re.sub(r"[ \t]*\n[ \t]*", "\n", value)
    value = re.sub(r"\n{3,}", "\n\n", value)
    value = re.sub(r"[ \t]+", " ", value)
    return value.strip()


def remove_noise(value: str) -> str:
    value = re.sub(r"\(\s*'[^)]{0,16}\)", "", value)
    value = re.sub(r"\b([A-Za-z]{3,})\s+(ry|tion|ment|ing|ed|ly|al|ity|ence|ance)\b", r"\1\2", value)
    value = value.replace("Y ou", "You").replace("Y ou", "You")
    value = value.replace(" ;", ";").replace(" ,", ",")
    value = value.replace(" - ", "-").replace("( ", "(").replace(" )", ")")
    value = re.sub(r"\n{3,}", "\n\n", value)
    return value.strip()


def paper_meta(filename: str) -> dict[str, object]:
    match = re.fullmatch(r"cet6_(\d{4})_(\d{2})_(\d+)\.pdf", filename)
    if not match:
        raise ValueError(f"Unexpected paper filename: {filename}")
    year, month, paper_no = match.groups()
    month_label = "6月" if month == "06" else "12月"
    return {
        "id": f"{year}-{month}-{paper_no}",
        "year": int(year),
        "month": int(month),
        "paperNo": int(paper_no),
        "title": f"{year}年{month_label}第{paper_no}套",
        "shortTitle": f"{year}.{month} · 第{paper_no}套",
        "sourceFile": filename,
    }


def extract_reading_text(path: Path) -> str:
    reader = PdfReader(str(path))
    full = "\n".join((page.extract_text() or "") for page in reader.pages)
    full = normalize_text(full)
    marker = full.find("Reading Comprehension")
    if marker < 0:
        raise ValueError(f"No reading section in {path.name}")
    reading = full[marker:]
    end_markers = ["Part IV Translation", "Part IV", "Translation (30 minutes)"]
    ends = [reading.find(item) for item in end_markers if reading.find(item) > 200]
    if ends:
        reading = reading[: min(ends)]
    return remove_noise(reading)


def split_sections(reading: str) -> dict[str, str]:
    section_a = reading.find("Section A")
    section_b = reading.find("Section B", section_a + 1)
    section_c = reading.find("Section C", section_b + 1)
    if min(section_a, section_b, section_c) < 0:
        raise ValueError("Could not locate reading sections")
    return {
        "a": reading[section_a:section_b],
        "b": reading[section_b:section_c],
        "c": reading[section_c:],
    }


def strip_directions(value: str) -> str:
    if "word bank following" in value:
        directions_end = re.search(r"more than once\.\s*", value[:1400], flags=re.IGNORECASE)
        if directions_end:
            return value[directions_end.end() :].strip()
    if "ten statements attached" in value:
        directions_end = re.search(r"Answer Sheet 2\.\s*", value[:1800], flags=re.IGNORECASE)
        if directions_end:
            return value[directions_end.end() :].strip()
    line_end = re.search(r"\n\s*(?=[A-Z][a-z])", value)
    if line_end:
        return value[line_end.end() :].strip()
    return value


def split_paragraphs(value: str) -> list[str]:
    value = re.sub(r"\n(?=\d{2,3}\.)", "\n\n", value)
    value = re.sub(r"(?<=[.!?\"'])\n(?=[A-Z\"“])", "\n\n", value)
    chunks = [re.sub(r"\s+", " ", item).strip() for item in re.split(r"\n\s*\n", value)]
    return [item for item in chunks if len(item) > 30]


def sentence_split(value: str) -> list[str]:
    value = re.sub(r"\s+", " ", value).strip()
    protected = value.replace("Mr.", "Mr<DOT>").replace("Mrs.", "Mrs<DOT>").replace("Dr.", "Dr<DOT>")
    parts = re.split(r"(?<=[.!?])\s+(?=[A-Z0-9\"'])", protected)
    return [part.replace("<DOT>", ".").strip() for part in parts if part.strip()]


def parse_cloze(section: str) -> dict[str, object]:
    body = strip_directions(section)
    bank_match = re.search(r"\n\s*A\)\s", body)
    if bank_match:
        passage_raw = body[: bank_match.start()]
        bank_raw = body[bank_match.start() :]
    else:
        passage_raw = body
        bank_raw = ""

    tokens = re.findall(r"\b([A-O])\)\s*([A-Za-z][A-Za-z-]*)", bank_raw)
    bank = [{"letter": letter, "word": word} for letter, word in tokens]
    paragraphs = split_paragraphs(passage_raw)
    return {
        "id": "cloze",
        "type": "cloze",
        "label": "选词填空",
        "title": "10 空选词填空",
        "paragraphs": paragraphs,
        "wordBank": bank,
    }


def parse_matching(section: str) -> dict[str, object]:
    body = strip_directions(section)
    first_marker = re.search(r"\n\s*A\)\s*", body)
    if not first_marker:
        raise ValueError("Matching passage markers missing")
    intro = body[: first_marker.start()].strip()
    paragraph_area = body[first_marker.start() :]
    statement_start = re.search(r"\n\s*36(?:[.)]|\s)\s*", paragraph_area)
    if statement_start:
        passage_raw = paragraph_area[: statement_start.start()]
        statement_raw = paragraph_area[statement_start.start() :]
    else:
        passage_raw = paragraph_area
        statement_raw = ""

    paragraph_matches = list(re.finditer(r"(?:^|\n)\s*([A-N])\)\s*", passage_raw))
    paragraphs = []
    for index, match in enumerate(paragraph_matches):
        end = paragraph_matches[index + 1].start() if index + 1 < len(paragraph_matches) else len(passage_raw)
        text = re.sub(r"\s+", " ", passage_raw[match.end() : end]).strip()
        if text:
            paragraphs.append({"letter": match.group(1), "text": text})

    statement_matches = list(re.finditer(r"(?:^|\n)\s*(\d{2})(?:[.)]|\s)\s*", statement_raw))
    statements = []
    for index, match in enumerate(statement_matches):
        end = statement_matches[index + 1].start() if index + 1 < len(statement_matches) else len(statement_raw)
        text = re.sub(r"\s+", " ", statement_raw[match.end() : end]).strip()
        if text:
            statements.append({"number": int(match.group(1)), "text": text})

    title_lines = [line.strip() for line in intro.splitlines() if line.strip()]
    title = title_lines[-1] if title_lines else "段落信息匹配"
    return {
        "id": "matching",
        "type": "matching",
        "label": "段落匹配",
        "title": title,
        "paragraphs": paragraphs,
        "statements": statements,
    }


def parse_choices(raw: str) -> tuple[str, list[dict[str, str]]]:
    text = re.sub(r"\s+", " ", raw).strip()
    text = re.sub(r"(?<!\w)O\)", "C)", text)
    first = re.search(r"\bA\)\s*", text)
    if not first:
        return text, []
    prompt = text[: first.start()].strip()
    choices_raw = text[first.start() :]
    marks = list(re.finditer(r"([A-D])\)\s*", choices_raw))
    choices = []
    for index, mark in enumerate(marks):
        end = marks[index + 1].start() if index + 1 < len(marks) else len(choices_raw)
        choices.append({"letter": mark.group(1), "text": choices_raw[mark.end() : end].strip()})
    return prompt, choices


def parse_questions(raw: str) -> list[dict[str, object]]:
    matches = list(re.finditer(r"(?:^|\n)\s*(\d{2})(?:[.)]|\s)\s*", raw))
    questions = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(raw)
        prompt, choices = parse_choices(raw[match.end() : end])
        if prompt:
            questions.append(
                {
                    "number": int(match.group(1)),
                    "prompt": prompt,
                    "choices": choices,
                }
            )
    return questions


def parse_detailed(section: str) -> list[dict[str, object]]:
    start_matches = list(re.finditer(r"\bPassage (One|Two)\b", section))
    passages = []
    for index, match in enumerate(start_matches):
        end = start_matches[index + 1].start() if index + 1 < len(start_matches) else len(section)
        chunk = section[match.end() : end]
        q_match = re.search(r"(?:^|\n)\s*(\d{2})\.\s*", chunk)
        if q_match:
            passage_raw = chunk[: q_match.start()]
            question_raw = chunk[q_match.start() :]
        else:
            passage_raw = chunk
            question_raw = ""
        passage_raw = re.sub(
            r"^.*?Questions\s+\d+\s+to\s+\d+\s+are\s+based\s+on\s+the\s+following\s+passage\.\s*",
            "",
            passage_raw,
            flags=re.IGNORECASE | re.DOTALL,
        )
        paragraphs = split_paragraphs(passage_raw)
        questions = parse_questions(question_raw)
        passages.append(
            {
                "id": f"detailed-{index + 1}",
                "type": "detailed",
                "label": "仔细阅读",
                "title": f"仔细阅读 Passage {index + 1}",
                "passageName": f"Passage {match.group(1)}",
                "paragraphs": paragraphs,
                "questions": questions,
            }
        )
    return passages


def build_paper(path: Path) -> dict[str, object]:
    meta = paper_meta(path.name)
    reading = extract_reading_text(path)
    sections = split_sections(reading)
    cloze = parse_cloze(sections["a"])
    matching = parse_matching(sections["b"])
    detailed = parse_detailed(sections["c"])
    passages = [cloze, matching, *detailed]
    for passage in passages:
        paragraphs = passage.get("paragraphs", [])
        sentence_count = 0
        for paragraph in paragraphs:
            if isinstance(paragraph, dict):
                sentence_count += len(sentence_split(paragraph.get("text", "")))
            else:
                sentence_count += len(sentence_split(paragraph))
        passage["sentenceCount"] = sentence_count
        passage["estimatedMinutes"] = max(6, round(sentence_count * 0.55))
    return {**meta, "passages": passages}


def main() -> None:
    papers = [build_paper(path) for path in sorted(PDF_DIR.glob("cet6_*.pdf"))]
    papers.sort(key=lambda item: (item["year"], item["month"], item["paperNo"]))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(papers, ensure_ascii=False, indent=2)
    OUTPUT.write_text(f"window.CET6_DATA = {payload};\n", encoding="utf-8")
    total = sum(len(paper["passages"]) for paper in papers)
    print(f"Wrote {len(papers)} papers and {total} passages to {OUTPUT}")


if __name__ == "__main__":
    main()
