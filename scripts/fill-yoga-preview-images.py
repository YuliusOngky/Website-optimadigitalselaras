"""Replace YogaZone placeholder photos with yoga / fitness stock crops.

DexignZone ships gray WxH placeholders instead of licensed demo images.
This downloads a small Unsplash yoga set once, then cover-crops each
placeholder to its original pixel size.
"""

from __future__ import annotations

import hashlib
from pathlib import Path

from PIL import Image

ROOT = Path(r"F:\AAA_OPTIMADITIGAL WEBSITE\public\previews\yoga-test\images")
CACHE = Path(r"F:\AAA_OPTIMADITIGAL WEBSITE\scripts\.cache\yoga-stock")

STOCK = [
    "photo-1544367567-0f2fcb009e0b",
    "photo-1506126613408-eca07ce68773",
    "photo-1599901860904-17e6ed7083a0",
    "photo-1575052814086-f385e2e2ad1b",
    "photo-1518611012118-696072aa579a",
    "photo-1545205597-3d9d02c29597",
    "photo-1552196563-55cd4e45efb3",
    "photo-1474418397713-7ede21d4ff37",
    "photo-1506126279646-a697431b3028",
    "photo-1588286840104-8957b019727f",
    "photo-1545389336-cf090694435e",
    "photo-1524863479829-916d8e77f114",
    "photo-1517836357463-d25dfeac3438",
    "photo-1571019613454-1cb2f99b2d8b",
    "photo-1601925260368-ae2f1fdf48d9",
    "photo-1599447421416-3414500d18a5",
    "photo-1544367567-0f2fcb009e0b",
    "photo-1518609367900-f34c90b36b2a",
]

PORTRAITS = [
    "photo-1494790108377-be9c29b29330",
    "photo-1531123897727-8f129e1688ce",
    "photo-1544005313-94ddf0286df2",
    "photo-1500648767791-00dcc994a43e",
    "photo-1507003211169-0a1dd7228f2d",
    "photo-1438761681033-6461ffad8d80",
]

SKIP_PARTS = (
    "logo",
    "favicon",
    "icon/",
    "icon-",
    "overlay/",
    "pattern/",
    "switcher/",
    "loading",
    "cloud",
    "dotted",
    "triangle",
    "back-up",
)

UA = {"User-Agent": "Mozilla/5.0 OptimaPreview/1.0", "Accept": "image/*"}


def fetch(url: str) -> bytes:
    import urllib.request

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
    rel = path.relative_to(ROOT).as_posix().lower()
    if any(part in rel for part in SKIP_PARTS):
        return False
    if path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
        return False
    rgb = im.convert("RGB")
    w, h = rgb.size
    if w * h < 4_000:
        return False
    sample = rgb.resize((16, 16), Image.Resampling.BOX)
    pixels = list(sample.getdata())
    avg = tuple(sum(c[i] for c in pixels) / len(pixels) for i in range(3))
    var = sum(
        (c[0] - avg[0]) ** 2 + (c[1] - avg[1]) ** 2 + (c[2] - avg[2]) ** 2
        for c in pixels
    ) / len(pixels)
    gray = abs(avg[0] - avg[1]) < 14 and abs(avg[1] - avg[2]) < 14
    light_gray = 140 < avg[0] < 235
    return var < 220 and gray and light_gray


def pick_source(rel: str) -> Image.Image:
    digest = int(hashlib.md5(rel.encode()).hexdigest(), 16)
    low = rel.lower()
    if any(part in low for part in ("team", "testimonial", "author", "avatar", "client")):
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
