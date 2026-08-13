"""Dummy rebrand Interno preview → Optima Architecture Inferno."""

from __future__ import annotations

import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(r"F:\AAA_OPTIMADITIGAL WEBSITE\public\previews\envato-test")
LOGO_DIR = ROOT / "assets" / "img" / "logo"

NAME = "Optima Architecture Inferno"
ADDR = "Ruko The Icon No. 12, BSD City, Tangerang Selatan 15345"
ADDR_SHORT = "Ruko The Icon No. 12, BSD City"
ADDR_HTML = "Ruko The Icon No. 12<br>BSD City, Tangerang Selatan 15345"
MAPS = "https://www.google.com/maps/search/?api=1&query=BSD+City+Tangerang+Selatan"
MAP_EMBED = "https://maps.google.com/maps?q=BSD%20City%20Tangerang%20Selatan&output=embed"
PHONE = "0857-7056-6781"
WA = "https://wa.me/6285770566781"
TEL = "tel:+6285770566781"


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


def draw_logo(fg: tuple[int, int, int], out: Path) -> None:
    w, h = 280, 48
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    f1 = font(18, bold=True)
    f2 = font(11, bold=False)
    d.text((8, 4), "OPTIMA", fill=fg + (255,), font=f1)
    d.text((8, 26), "Architecture Inferno", fill=fg + (220,), font=f2)
    im.save(out, "PNG")


def rebrand_html(text: str) -> str:
    text = text.replace(
        "Interno – Architecture & Interior HTML Template",
        NAME,
    )
    text = re.sub(
        r'<a href="https://www\.google\.com/maps/@23\.8223586,90\.3661283,15z" target="_blank">Melbone st,\s*Australia, Ny 12099</a>',
        f'<a href="{MAPS}" target="_blank">{ADDR}</a>',
        text,
    )
    text = re.sub(
        r'<a href="tel:\+48555223224">\+48 555 223 224</a>',
        f'<a href="{WA}">{PHONE}</a>',
        text,
    )
    text = re.sub(
        r'<a target="_blank"\s*href="https://www\.google\.com/maps/place/Cumberland[^>]+>6391\s*Elgin St\. Celina, 10299</a>',
        f'<a target="_blank" href="{MAPS}">{ADDR_SHORT}</a>',
        text,
    )
    text = re.sub(
        r'<a class="d-inline-block" href="tel:6295550129">\(629\) 555-0129</a>',
        f'<a class="d-inline-block" href="{WA}">{PHONE}</a>',
        text,
    )
    text = re.sub(
        r'<a\s+href="https://www\.google\.com/maps/place/United\+States[^"]+">1901\s*Thornridge Cir\. <br> Shiloh 81063</a>',
        f'<a href="{MAPS}">{ADDR_HTML}</a>',
        text,
    )
    text = re.sub(
        r'<a href="tel:201555-0124">\s*\(201\) 555-0124</a>',
        f'<a href="{WA}">{PHONE}</a>',
        text,
    )
    text = text.replace(
        '<a href="tel:0000000000000">0000-0000-00-000</a>',
        f'<a href="{WA}">{PHONE}</a>',
    )
    text = re.sub(
        r'src="https://www\.google\.com/maps/embed\?pb=[^"]+"',
        f'src="{MAP_EMBED}"',
        text,
    )
    text = re.sub(
        r"© Theme_pure\s+2023 \| All Rights Reserved",
        f"© {NAME}",
        text,
    )
    text = re.sub(
        r'(<img src="assets/img/logo/logo-(?:black|white|blue|grey)\.png" alt=")("[^>]*>)',
        rf"\1{NAME}\2",
        text,
    )
    return text


def main() -> None:
    draw_logo((18, 18, 18), LOGO_DIR / "logo-black.png")
    draw_logo((255, 255, 255), LOGO_DIR / "logo-white.png")
    draw_logo((30, 70, 140), LOGO_DIR / "logo-blue.png")
    draw_logo((90, 90, 90), LOGO_DIR / "logo-grey.png")

    changed = 0
    for path in sorted(ROOT.glob("*.html")):
        original = path.read_text(encoding="utf-8")
        updated = rebrand_html(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            changed += 1
            print(f"OK  {path.name}")
        else:
            print(f"--  {path.name}")
    print(f"\nupdated={changed}")


if __name__ == "__main__":
    main()
