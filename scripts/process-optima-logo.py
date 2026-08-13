"""Knock out black matte from the clear Optima mark and write site + preview logos."""

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

SRC = Path(
    r"C:\Users\Yulius Ongky\.cursor\projects\f-AAA-OPTIMADITIGAL-WEBSITE\assets"
    r"\c__Users_Yulius_Ongky_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"a820d3b62641880da75f53c911c97490_images_Logo_web_optima_2-a4d489dd-b19e-4a7e-b2f7-60a8cc1c7226.png"
)
OUT_SITE = Path(r"F:\AAA_OPTIMADITIGAL WEBSITE\public\assets\optima\logo.png")
OUT_PREVIEW = Path(r"F:\AAA_OPTIMADITIGAL WEBSITE\public\previews\envato-test\assets\img\logo")


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


def font(size, bold=False):
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


def preview_lockup(mark: Image.Image, text_color: tuple[int, int, int], out: Path) -> None:
    mark_h = 44
    ratio = mark_h / mark.height
    mark_w = max(1, round(mark.width * ratio))
    mark_r = mark.resize((mark_w, mark_h), Image.Resampling.LANCZOS)

    w, h = 300, 48
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    im.alpha_composite(mark_r, (4, (h - mark_h) // 2))
    d = ImageDraw.Draw(im)
    x = 4 + mark_w + 10
    d.text((x, 3), "OPTIMA", fill=text_color + (255,), font=font(17, True))
    d.text((x, 25), "Architecture Inferno", fill=text_color + (210,), font=font(11, False))
    im.save(out, "PNG")


def main() -> None:
    im = Image.open(SRC).convert("RGBA")
    arr = crop_content(knockout_black(np.array(im)))
    mark = Image.fromarray(arr, "RGBA")

    OUT_SITE.parent.mkdir(parents=True, exist_ok=True)
    mark.save(OUT_SITE, "PNG")
    print("site", OUT_SITE, mark.size, "opaque", int((arr[..., 3] > 10).mean() * 100), "%")

    OUT_PREVIEW.mkdir(parents=True, exist_ok=True)
    preview_lockup(mark, (18, 18, 18), OUT_PREVIEW / "logo-black.png")
    preview_lockup(mark, (255, 255, 255), OUT_PREVIEW / "logo-white.png")
    preview_lockup(mark, (30, 70, 140), OUT_PREVIEW / "logo-blue.png")
    preview_lockup(mark, (90, 90, 90), OUT_PREVIEW / "logo-grey.png")
    mark.resize((40, 40), Image.Resampling.LANCZOS).save(OUT_PREVIEW / "favicon.png", "PNG")
    print("preview logos written")


if __name__ == "__main__":
    main()
