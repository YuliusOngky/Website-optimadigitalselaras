from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

SRC = Path(
    r"C:\Users\Yulius Ongky\.cursor\projects\f-AAA-OPTIMADITIGAL-WEBSITE\assets"
    r"\c__Users_Yulius_Ongky_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"a820d3b62641880da75f53c911c97490_images_8-13-2026_3-49-22_PM-2d134386-a0ac-483c-942c-ac6151c4f6cf.png"
)
OUT = Path(r"F:\AAA_OPTIMADITIGAL WEBSITE\public\assets\optima\clients")

NAMES = [
    "roti-gembong-gedhe",
    "mo-bonsai",
    "pco-pestindo",
    "foodigy",
    "smart-grobak",
    "nadi",
]


def content_mask(rgb, thresh=248):
    return np.any(rgb < thresh, axis=2)


def spans(bool_1d, min_gap=18, min_len=12):
    filled = np.flatnonzero(bool_1d)
    if filled.size == 0:
        return []
    cuts = np.where(np.diff(filled) > min_gap)[0]
    groups = np.split(filled, cuts + 1)
    out = []
    for g in groups:
        if g.size >= min_len:
            out.append((int(g[0]), int(g[-1]) + 1))
    return out


def bbox_from_mask(mask, pad=2):
    ys, xs = np.where(mask)
    if xs.size == 0:
        return None
    h, w = mask.shape
    x1 = max(0, int(xs.min()) - pad)
    y1 = max(0, int(ys.min()) - pad)
    x2 = min(w, int(xs.max()) + 1 + pad)
    y2 = min(h, int(ys.max()) + 1 + pad)
    return x1, y1, x2, y2


def knockout_white(rgba, thresh=246):
    rgb = rgba[..., :3]
    near_white = np.all(rgb >= thresh, axis=2)
    border = np.zeros(near_white.shape, dtype=bool)
    border[0, :] = True
    border[-1, :] = True
    border[:, 0] = True
    border[:, -1] = True
    bg = border & near_white
    structure = np.ones((3, 3), dtype=bool)
    while True:
        grown = ndimage.binary_dilation(bg, structure=structure) & near_white
        if np.array_equal(grown, bg):
            break
        bg = grown
    out = rgba.copy()
    out[bg, 3] = 0
    return out


def save_crop(im, box, dest):
    crop = im.crop(box).convert("RGBA")
    arr = np.array(crop)
    arr = knockout_white(arr)
    visible = arr[..., 3] > 8
    tb = bbox_from_mask(visible, pad=2)
    if tb:
        x1, y1, x2, y2 = tb
        arr = arr[y1:y2, x1:x2]
    Image.fromarray(arr, "RGBA").save(dest, "PNG")
    print("saved", dest.name, arr.shape[1], arr.shape[0])


def main():
    im = Image.open(SRC).convert("RGBA")
    rgb = np.array(im.convert("RGB"))
    mask = content_mask(rgb)
    print("sheet", rgb.shape[1], rgb.shape[0])

    y_spans = spans(mask.any(axis=1), min_gap=20, min_len=20)
    print("y_spans", y_spans)
    if len(y_spans) < 2:
        raise SystemExit(f"expected 2 rows, got {y_spans}")

    top_y1, top_y2 = y_spans[0]
    bot_y1, bot_y2 = y_spans[-1]
    top_x = spans(mask[top_y1:top_y2].any(axis=0), min_gap=22, min_len=20)
    bot_x = spans(mask[bot_y1:bot_y2].any(axis=0), min_gap=22, min_len=20)
    print("top_x", top_x)
    print("bot_x", bot_x)
    if len(top_x) != 4 or len(bot_x) != 2:
        raise SystemExit("could not find 4 top + 2 bottom logos")

    boxes = [(x1, top_y1, x2, top_y2) for x1, x2 in top_x]
    boxes += [(x1, bot_y1, x2, bot_y2) for x1, x2 in bot_x]

    OUT.mkdir(parents=True, exist_ok=True)
    for name, box in zip(NAMES, boxes):
        save_crop(im, box, OUT / f"{name}.png")


if __name__ == "__main__":
    main()
