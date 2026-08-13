"""Replace Interno placeholder photos with interior stock crops.

ThemePure does not ship licensed demo images. Placeholders are tiny gray
WxH JPEGs. This script downloads a small Unsplash interior set once, then
cover-crops each placeholder to its original pixel size.
"""

from __future__ import annotations

import hashlib
import io
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(r"F:\AAA_OPTIMADITIGAL WEBSITE\public\previews\envato-test\assets\img")
CACHE = Path(r"F:\AAA_OPTIMADITIGAL WEBSITE\scripts\.cache\interno-stock")

# Interior / architecture Unsplash photos (free license).
STOCK = [
    "photo-1600210492486-724fe5c67fb0",
    "photo-1600607687939-ce8a6c25118c",
    "photo-1618221195710-dd6b41faaea6",
    "photo-1600585154340-be6161a56a0c",
    "photo-1600566753190-17f0baa2a6c3",
    "photo-1600047509807-ba8f99d2cdbc",
    "photo-1600585154526-990dced4db0d",
    "photo-1616486338812-3dadae4b4ace",
    "photo-1556912173-46c336c7fd55",
    "photo-1600210492493-94d14ac85226",
    "photo-1560448204-e02f11c3d0e2",
    "photo-1505693416388-ac5ce068fe85",
    "photo-1600121848594-d8644e57abab",
    "photo-1586023492125-27b2c045efd7",
    "photo-1618221772121-82d9b6bc67f4",
    "photo-1600566753086-00f18fb6b3ea",
    "photo-1598928506311-c55ded91a20c",
    "photo-1615874959474-d453514d1a5e",
]

PORTRAITS = [
    "photo-1507003211169-0a1dd7228f2d",
    "photo-1494790108377-be9c29b29330",
    "photo-1500648767791-00dcc994a43e",
    "photo-1544005313-94ddf0286df2",
    "photo-1531123897727-8f129e1688ce",
]

UA = {"User-Agent": "Mozilla/5.0 OptimaPreview/1.0", "Accept": "image/*"}


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=45) as resp:
        return resp.read()


def load_stock(photo_id: str) -> Image.Image:
    CACHE.mkdir(parents=True, exist_ok=True)
    dest = CACHE / f"{photo_id}.jpg"
    if not dest.exists() or dest.stat().st_size < 20_000:
        url = f"https://images.unsplash.com/{photo_id}?auto=format&fit=crop&w=1600&q=80"
        try:
            dest.write_bytes(fetch(url))
        except Exception:
            url = f"https://picsum.photos/seed/{photo_id}/1600/1200.jpg"
            dest.write_bytes(fetch(url))
    return Image.open(dest).convert("RGB")


def cover(im: Image.Image, w: int, h: int) -> Image.Image:
    sw, sh = im.size
    scale = max(w / sw, h / sh)
    nw, nh = max(1, round(sw * scale)), max(1, round(sh * scale))
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left = max(0, (nw - w) // 2)
    top = max(0, (nh - h) // 2)
    return im.crop((left, top, left + w, top + h))


def is_placeholder(path: Path, im: Image.Image) -> bool:
    if path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
        return False
    rel = path.relative_to(ROOT).as_posix()
    if rel.startswith("logo/"):
        return False
    if im.mode in {"RGBA", "LA"}:
        return False
    size = path.stat().st_size
    if path.suffix.lower() in {".jpg", ".jpeg", ".webp"}:
        return size < 50_000 or im.mode == "P"
    # RGB/P PNG avatars & fake brand marks
    return size < 8_000 and im.mode in {"RGB", "P", "L"}


def pick_source(rel: str) -> Image.Image:
    digest = int(hashlib.md5(rel.encode()).hexdigest(), 16)
    if any(part in rel for part in ("author", "avata", "team/", "client")):
        return load_stock(PORTRAITS[digest % len(PORTRAITS)])
    return load_stock(STOCK[digest % len(STOCK)])


def main() -> None:
    if not ROOT.exists():
        raise SystemExit(f"missing {ROOT}")
    replaced = skipped = failed = 0
    for path in sorted(ROOT.rglob("*")):
        if not path.is_file():
            continue
        try:
            im = Image.open(path)
            im.load()
        except Exception:
            skipped += 1
            continue
        if not is_placeholder(path, im):
            skipped += 1
            continue
        rel = path.relative_to(ROOT).as_posix()
        w, h = im.size
        try:
            crop = cover(pick_source(rel), w, h)
            suffix = path.suffix.lower()
            if suffix == ".png":
                crop.save(path, format="PNG", optimize=True)
            else:
                crop.save(path, format="JPEG", quality=86, optimize=True)
            replaced += 1
            print(f"OK  {w}x{h:4d}  {rel}")
        except Exception as exc:
            failed += 1
            print(f"FAIL {rel}: {exc}")
    print(f"\nreplaced={replaced} skipped={skipped} failed={failed}")


if __name__ == "__main__":
    main()
