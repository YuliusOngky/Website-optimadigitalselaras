"""Pull www.optimadigitalselaras.com HTML and explode data: URIs into public/assets/optima/."""

from __future__ import annotations

import base64
import os
import re
import sys
import urllib.request
from pathlib import Path

LIVE_URL = "https://www.optimadigitalselaras.com"
ROOT = Path(__file__).resolve().parents[1]
OUT_HTML = ROOT / "index.html"
ASSET_DIR = ROOT / "public" / "assets" / "optima"
TEMP_HTML = Path(os.environ.get("TEMP", "/tmp")) / "optima_live.html"

DATA_URI = re.compile(
    r"data:(?P<mime>[a-zA-Z0-9.+/-]+);base64,(?P<b64>[A-Za-z0-9+/=\s]+)"
)

MIME_EXT = {
    "video/mp4": ".mp4",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}


def load_html() -> str:
    if "--local" in sys.argv and TEMP_HTML.exists():
        print(f"Using cached snapshot {TEMP_HTML}")
        return TEMP_HTML.read_text(encoding="utf-8", errors="replace")
    print(f"Fetching {LIVE_URL}")
    req = urllib.request.Request(LIVE_URL, headers={"User-Agent": "OptimaHomepageSync/1.0"})
    with urllib.request.urlopen(req, timeout=60) as res:
        raw = res.read()
    TEMP_HTML.write_bytes(raw)
    return raw.decode("utf-8", errors="replace")


def name_for(mime: str, index: int, prefix_ctx: str) -> str:
    ext = MIME_EXT.get(mime, ".bin")
    ctx = prefix_ctx.lower()
    if mime.startswith("video/"):
        return f"hero{ext}"
    if "poster=" in ctx or "<video" in ctx:
        return f"hero-poster{ext}"
    if "creditrisk" in ctx:
        return f"creditriskdynamics{ext}"
    return f"embed-{index}{ext}"


def main() -> None:
    html = load_html()
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    used_names: set[str] = set()
    index = 0

    def repl(match: re.Match[str]) -> str:
        nonlocal index
        mime = match.group("mime")
        b64 = re.sub(r"\s+", "", match.group("b64"))
        start = match.start()
        ctx = html[max(0, start - 180) : start]
        name = name_for(mime, index, ctx)
        while name in used_names:
            index += 1
            name = name_for(mime, index, ctx)
        used_names.add(name)
        data = base64.b64decode(b64)
        dest = ASSET_DIR / name
        dest.write_bytes(data)
        print(f"Wrote {dest.relative_to(ROOT)} ({len(data)} bytes, {mime})")
        index += 1
        return f"/assets/optima/{name}"

    new_html = DATA_URI.sub(repl, html)
    OUT_HTML.write_text(new_html, encoding="utf-8", newline="\n")
    print(f"Wrote {OUT_HTML.relative_to(ROOT)} ({OUT_HTML.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
