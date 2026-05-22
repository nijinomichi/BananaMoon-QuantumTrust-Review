#!/usr/bin/env python3
"""Build a simple slideshow video from publicly discoverable X/Twitter images."""

from __future__ import annotations

import argparse
import os
import re
import sys
import tempfile
from pathlib import Path
from typing import List, Sequence
from urllib.parse import parse_qs, quote_plus, urlparse

import requests
from moviepy.editor import ImageSequenceClip

MEDIA_URL_PATTERN = re.compile(r"https://pbs\.twimg\.com/media/[A-Za-z0-9_-]+(?:\?[^\"'\s<]+)?")
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
DEFAULT_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}


def infer_extension_from_url(url: str) -> str:
    """Infer image extension from a Twitter media URL querystring/path."""
    parsed = urlparse(url)
    query = parse_qs(parsed.query)

    if "format" in query and query["format"]:
        ext = f".{query['format'][0].lower()}"
        if ext in ALLOWED_EXTENSIONS:
            return ext

    ext = Path(parsed.path).suffix.lower()
    if ext in ALLOWED_EXTENSIONS:
        return ext

    return ".jpg"


def fetch_image_urls(keyword: str, max_images: int = 10) -> List[str]:
    """Retrieve unique Twitter image URLs from the public search results HTML."""
    search_url = f"https://x.com/search?q={quote_plus(keyword)}&src=typed_query&f=image"

    try:
        print(f"[1/4] Fetching search results for '{keyword}' from X…")
        response = requests.get(search_url, headers=DEFAULT_HEADERS, timeout=15)
        if response.status_code != 200:
            print(f"⚠️  Failed to fetch search page (HTTP {response.status_code}).")
            return []
        html = response.text
    except requests.RequestException as exc:
        print(f"⚠️  Error fetching search page: {exc}")
        return []

    matches = MEDIA_URL_PATTERN.findall(html)
    deduped: List[str] = []
    seen: set[str] = set()

    for url in matches:
        if url in seen:
            continue
        seen.add(url)
        deduped.append(url)
        if len(deduped) >= max_images:
            break

    print(f"[2/4] Found {len(deduped)} unique image URL(s).")
    return deduped


def download_images(urls: Sequence[str], output_dir: str) -> List[str]:
    """Download image URLs into ``output_dir`` and return successful file paths."""
    os.makedirs(output_dir, exist_ok=True)
    downloaded_paths: List[str] = []

    with requests.Session() as session:
        session.headers.update(DEFAULT_HEADERS)

        for idx, url in enumerate(urls, start=1):
            extension = infer_extension_from_url(url)
            filepath = os.path.join(output_dir, f"image_{idx}{extension}")

            try:
                print(f"[3/4] Downloading {idx}/{len(urls)}: {url}")
                resp = session.get(url, stream=True, timeout=20)
                if resp.status_code != 200:
                    print(f"⚠️  Could not download {url} (HTTP {resp.status_code}); skipping.")
                    continue

                with open(filepath, "wb") as image_file:
                    for chunk in resp.iter_content(chunk_size=8192):
                        if chunk:
                            image_file.write(chunk)
                downloaded_paths.append(filepath)
            except requests.RequestException as exc:
                print(f"⚠️  Error downloading {url}: {exc}")

    print(f"[3/4] Completed image download: {len(downloaded_paths)} of {len(urls)} succeeded.")
    return downloaded_paths


def create_slideshow(image_paths: Sequence[str], output_path: str, fps: int = 1) -> bool:
    """Assemble a slideshow MP4 video from image paths using MoviePy."""
    if not image_paths:
        print("⚠️  No images provided to create_slideshow().")
        return False

    try:
        print("[4/4] Creating video…")
        clip = ImageSequenceClip(list(image_paths), fps=fps)
        clip.write_videofile(output_path, codec="libx264", audio=False)
        print(f"✅ Video saved to {output_path}")
        return True
    except Exception as exc:  # MoviePy/ffmpeg error surface is broad.
        print(f"⚠️  Error creating video: {exc}")
        return False


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Search X (Twitter) for images matching a keyword, download them, "
            "and assemble a slideshow video."
        )
    )
    parser.add_argument("keyword", help="Search term for locating images on X")
    parser.add_argument(
        "-n",
        "--limit",
        type=int,
        default=10,
        help="Maximum number of images to download (default: 10)",
    )
    parser.add_argument(
        "-o",
        "--output",
        default="montage.mp4",
        help="Output filename for the video (default: montage.mp4)",
    )
    parser.add_argument(
        "--fps",
        type=int,
        default=1,
        help="Frames per second for the video (default: 1)",
    )
    args = parser.parse_args()

    if args.limit < 1:
        parser.error("--limit must be >= 1")
    if args.fps < 1:
        parser.error("--fps must be >= 1")

    return args


def main() -> None:
    args = parse_args()
    urls = fetch_image_urls(args.keyword, args.limit)
    if not urls:
        print("❌ No images found. Exiting.")
        sys.exit(1)

    with tempfile.TemporaryDirectory() as tmpdir:
        image_paths = download_images(urls, tmpdir)
        if not image_paths:
            print("❌ No images were downloaded successfully. Exiting.")
            sys.exit(1)

        if not create_slideshow(image_paths, args.output, fps=args.fps):
            sys.exit(1)


if __name__ == "__main__":
    main()
