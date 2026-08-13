from pathlib import Path

import numpy as np
from PIL import Image

SRC = Path(
    r"C:\Users\Yulius Ongky\.cursor\projects\f-AAA-OPTIMADITIGAL-WEBSITE\assets"
    r"\c__Users_Yulius_Ongky_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"a820d3b62641880da75f53c911c97490_images_8-13-2026_4-13-48_PM-e9414885-48d0-4f66-a75e-c0fb18be4e0e.png"
)
OUT = Path(r"F:\AAA_OPTIMADITIGAL WEBSITE\public\assets\optima\logo.png")


def knockout(arr):
    rgb = arr[..., :3].astype(np.float32)
    maxc = rgb.max(axis=2)
    minc = rgb.min(axis=2)
    sat = (maxc - minc) / (maxc + 1e-6)
    dist_white = np.linalg.norm(255.0 - rgb, axis=2)

    alpha = np.clip((dist_white - 16.0) / 48.0 * 255.0, 0, 255)
    alpha = np.where(sat > 0.10, np.maximum(alpha, 200), alpha)
    alpha = np.where(sat > 0.22, 255.0, alpha)
    alpha = alpha.astype(np.uint8)

    out = arr.copy()
    out[..., 3] = alpha
    return out


def main():
    im = Image.open(SRC).convert("RGBA")
    arr = np.array(im)[:, 3:, :]  # drop leftover navy screenshot bar
    arr = knockout(arr)

    visible = arr[..., 3] > 10
    ys, xs = np.where(visible)
    pad = 2
    y1, y2 = max(0, ys.min() - pad), min(arr.shape[0], ys.max() + 1 + pad)
    x1, x2 = max(0, xs.min() - pad), min(arr.shape[1], xs.max() + 1 + pad)
    crop = arr[y1:y2, x1:x2]

    OUT.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(crop, "RGBA").save(OUT, "PNG")
    print("saved", OUT, crop.shape[1], crop.shape[0], "opaque", int((crop[..., 3] > 10).mean() * 100), "%")


if __name__ == "__main__":
    main()
