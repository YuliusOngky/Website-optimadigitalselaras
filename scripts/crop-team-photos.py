from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

SRC = Path(
    r"C:\Users\Yulius Ongky\.cursor\projects\f-AAA-OPTIMADITIGAL-WEBSITE\assets"
    r"\c__Users_Yulius_Ongky_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"a820d3b62641880da75f53c911c97490_images_8-13-2026_4-04-08_PM-356a08ea-32a6-439f-bb58-46296e664793.png"
)
OUT = Path(r"F:\AAA_OPTIMADITIGAL WEBSITE\public\assets\optima\team")

ROW_NAMES = [
    "gus-riyanto",
    "joni-setiawan",
    "zaenudin-andika",
    "adista-sukma",
    "andina-niramaya",
    "angelina-agata",
]


def find_bottom_circles(arr):
    y0 = int(arr.shape[0] * 0.45)
    region = arr[y0:]
    r, g, b = region[..., 0], region[..., 1], region[..., 2]
    purple = (b > 80) & (b >= r - 25) & (b >= g - 30) & (r < 220) & (g < 210)
    mask = ndimage.binary_dilation(purple, np.ones((7, 7)))
    labeled, n = ndimage.label(mask)
    boxes = []
    for i in range(1, n + 1):
        ys, xs = np.where(labeled == i)
        if xs.size < 350:
            continue
        x1, x2 = int(xs.min()), int(xs.max()) + 1
        y1, y2 = int(ys.min() + y0), int(ys.max() + y0) + 1
        w, h = x2 - x1, y2 - y1
        if w < 40 or h < 40:
            continue
        ratio = w / h
        if ratio < 0.7 or ratio > 1.35:
            continue
        boxes.append((x1, y1, x2, y2))
    boxes.sort(key=lambda b: b[0])
    return boxes


def save_circle(im, box, dest, pad=4):
    x1, y1, x2, y2 = box
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
    rad = max(x2 - x1, y2 - y1) / 2 + pad
    left, top = max(0, int(round(cx - rad))), max(0, int(round(cy - rad)))
    right, bottom = min(im.width, int(round(cx + rad))), min(im.height, int(round(cy + rad)))
    crop = im.crop((left, top, right, bottom)).convert("RGBA")
    mask = Image.new("L", crop.size, 0)
    ImageDraw.Draw(mask).ellipse((1, 1, crop.size[0] - 2, crop.size[1] - 2), fill=255)
    out = Image.new("RGBA", crop.size, (0, 0, 0, 0))
    out.paste(crop, mask=mask)
    out.putalpha(mask)
    out.save(dest, "PNG")
    print("saved", dest.name, out.size)


def main():
    im = Image.open(SRC).convert("RGB")
    arr = np.array(im)
    OUT.mkdir(parents=True, exist_ok=True)

    # Featured: purple blob in top-center, expand to square so face+shirt stay in
    roi = arr[20:210, 390:650]
    r, g, b = roi[..., 0], roi[..., 1], roi[..., 2]
    purple = (b > 70) & (b > g) & (r < 200) & (g < 190)
    labeled, n = ndimage.label(ndimage.binary_closing(purple, np.ones((5, 5))))
    best = None
    for i in range(1, n + 1):
        ys, xs = np.where(labeled == i)
        if xs.size < 2000:
            continue
        box = (int(xs.min()) + 390, int(ys.min()) + 20, int(xs.max()) + 391, int(ys.max()) + 21, xs.size)
        if best is None or box[4] > best[4]:
            best = box
    if best is None:
        raise SystemExit("featured portrait not found")
    fx1, fy1, fx2, fy2, _ = best
    cx, cy = (fx1 + fx2) / 2, (fy1 + fy2) / 2 + 6
    side = max(fx2 - fx1, fy2 - fy1, 118)
    featured = (int(cx - side / 2), int(cy - side / 2), int(cx + side / 2), int(cy + side / 2))
    print("featured", featured)

    row = find_bottom_circles(arr)
    print("row", row)
    if len(row) < 6:
        raise SystemExit(f"bottom row incomplete: {len(row)}")

    desk = im.crop((0, 0, im.width, max(70, featured[1] - 6)))
    desk = desk.resize((1600, 360), Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(0.6))
    desk.save(OUT / "team-desk.jpg", "JPEG", quality=88)
    print("saved team-desk.jpg", desk.size)

    save_circle(im, featured, OUT / "frandito-setyady.png", pad=6)
    for name, box in zip(ROW_NAMES, row[:6]):
        save_circle(im, box, OUT / f"{name}.png")

    debug = OUT / "_debug-top.png"
    if debug.exists():
        debug.unlink()


if __name__ == "__main__":
    main()
