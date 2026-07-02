#!/usr/bin/env python3
"""Validate JSON files and local Markdown links without extra dependencies."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED_PARTS = {".git", ".next", "node_modules"}
MARKDOWN_LINK = re.compile(r"!?\[[^\]]*\]\(([^)]+)\)")


def included(path: Path) -> bool:
    return not any(part in EXCLUDED_PARTS for part in path.parts)


def validate_json() -> list[str]:
    errors: list[str] = []
    for path in sorted(ROOT.rglob("*.json")):
        if not included(path.relative_to(ROOT)):
            continue
        try:
            with path.open("r", encoding="utf-8") as handle:
                json.load(handle)
        except (OSError, UnicodeError, json.JSONDecodeError) as exc:
            errors.append(f"JSON {path.relative_to(ROOT)}: {exc}")
    return errors


def link_target(raw_target: str) -> str:
    target = raw_target.strip()
    if target.startswith("<") and target.endswith(">"):
        target = target[1:-1]
    # Remove an optional Markdown title after the URL/path.
    if " \"" in target:
        target = target.split(" \"", 1)[0]
    if " '" in target:
        target = target.split(" '", 1)[0]
    return unquote(target)


def validate_markdown_links() -> list[str]:
    errors: list[str] = []
    ignored_prefixes = (
        "http://",
        "https://",
        "mailto:",
        "data:",
        "ipfs://",
        "#",
    )

    for path in sorted(ROOT.rglob("*.md")):
        relative = path.relative_to(ROOT)
        if not included(relative):
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except (OSError, UnicodeError) as exc:
            errors.append(f"Markdown {relative}: {exc}")
            continue

        for match in MARKDOWN_LINK.finditer(text):
            target = link_target(match.group(1))
            if not target or target.startswith(ignored_prefixes):
                continue

            target = target.split("#", 1)[0].split("?", 1)[0]
            if not target:
                continue

            candidate = (ROOT / target.lstrip("/")) if target.startswith("/") else (path.parent / target)
            if not candidate.exists():
                line = text.count("\n", 0, match.start()) + 1
                errors.append(f"Markdown {relative}:{line}: missing local target {target}")

    return errors


def main() -> int:
    errors = validate_json() + validate_markdown_links()
    if errors:
        print("Repository validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Repository validation passed: JSON and local Markdown links are valid.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
