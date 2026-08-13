"""Dummy rebrand YogaZone preview → Optima Yoga."""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(r"F:\AAA_OPTIMADITIGAL WEBSITE\public\previews\yoga-test")
LOGO_DIR = ROOT / "images"
MARK_SRC = Path(
    r"C:\Users\Yulius Ongky\.cursor\projects\f-AAA-OPTIMADITIGAL-WEBSITE\assets"
    r"\c__Users_Yulius_Ongky_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"a820d3b62641880da75f53c911c97490_images_Logo_web_optima_2-a4d489dd-b19e-4a7e-b2f7-60a8cc1c7226.png"
)

NAME = "Optima Yoga"
ADDR = "Ruko The Icon No. 12, BSD City, Tangerang Selatan 15345"
PHONE = "0857-7056-6781"
EMAIL = "hello@optimayoga.id"

REPLACEMENTS = [
    (
        "YogaZone: Yoga, Fitness & Meditation Mobile Responsive Bootstrap HTML Template",
        NAME,
    ),
    ("YogaZone", NAME),
    ("Yogazone", NAME),
    ("DexignZone", NAME),
    ("https://www.dexignzone.com/", "javascript:void(0);"),
    ("demo address #8901 Marmora Road Chi Minh City, Vietnam", ADDR),
    ("1247/Plot No. 39, 15th Phase, Colony, Kkatpally, Hyderabad", ADDR),
    ("0800-123456 (24/7 Support Line)", PHONE),
    ("+001 75 23 222 35", PHONE),
    ("+91 987-654-3210", PHONE),
    ("+91 123-456-7890", PHONE),
    ("(123) 123-4567", PHONE),
    ("000 123 2294 089", PHONE),
    ("info@example.com", EMAIL),
]


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def knockout_black(arr):
    rgb = arr[..., :3].astype(np.float32)
    maxc = rgb.max(axis=2)
    minc = rgb.min(axis=2)
    sat = (maxc - minc) / (maxc + 1e-6)
    dist_black = np.linalg.norm(rgb, axis=2)
    alpha = np.clip((dist_black - 6.0) / 26.0 * 255.0, 0, 255)
    alpha = np.where(sat > 0.12, np.maximum(alpha, 230), alpha)
    alpha = np.where(sat > 0.20, 255.0, alpha)
    a = np.maximum(alpha / 255.0, 1e-6)[..., None]
    rgb = np.clip(rgb / a, 0, 255)
    out = np.empty_like(arr)
    out[..., :3] = rgb.astype(np.uint8)
    out[..., 3] = alpha.astype(np.uint8)
    return out


def crop_content(arr, pad=4):
    visible = arr[..., 3] > 12
    ys, xs = np.where(visible)
    y1, y2 = max(0, ys.min() - pad), min(arr.shape[0], ys.max() + 1 + pad)
    x1, x2 = max(0, xs.min() - pad), min(arr.shape[1], xs.max() + 1 + pad)
    return arr[y1:y2, x1:x2]


def tint_mark(mark: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    arr = np.array(mark)
    arr[..., 0] = color[0]
    arr[..., 1] = color[1]
    arr[..., 2] = color[2]
    return Image.fromarray(arr, "RGBA")


def draw_logo(fg: tuple[int, int, int], out: Path, mark: Image.Image) -> None:
    w, h = 400, 100
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    mark_h = 72
    ratio = mark_h / mark.height
    mark_w = max(1, round(mark.width * ratio))
    mark_r = tint_mark(mark, fg).resize((mark_w, mark_h), Image.Resampling.LANCZOS)
    im.alpha_composite(mark_r, (8, (h - mark_h) // 2))
    d = ImageDraw.Draw(im)
    x = 8 + mark_w + 12
    d.text((x, 18), "OPTIMA", fill=fg + (255,), font=font(28, True))
    d.text((x, 54), "Yoga", fill=fg + (220,), font=font(18, False))
    im.save(out, "PNG")


def rebrand_html(text: str) -> str:
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)
    return text


def main() -> None:
    src = Image.open(MARK_SRC).convert("RGBA")
    mark = Image.fromarray(crop_content(knockout_black(np.array(src))), "RGBA")

    white = (255, 255, 255)
    dark = (18, 28, 38)
    teal = (18, 143, 122)
    for name in ("logo-white.png", "logo-white-min.png", "logo-white1.png"):
        draw_logo(white, LOGO_DIR / name, mark)
    for name in (
        "logo.png",
        "logo2.png",
        "logo3.png",
        "logo4.png",
        "logo6.png",
        "logo7.png",
        "logo8.png",
        "logo9.png",
    ):
        draw_logo(dark, LOGO_DIR / name, mark)
    draw_logo(teal, LOGO_DIR / "logo5.png", mark)
    print("logos written")

    changed = 0
    for path in sorted(ROOT.glob("*.html")):
        original = path.read_text(encoding="utf-8")
        updated = rebrand_html(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            changed += 1
            print(f"OK  {path.name}")
    print(f"\nupdated={changed}")


if __name__ == "__main__":
    main()
