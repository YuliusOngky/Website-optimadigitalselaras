# Deployment — Optima Digital Selaras (GIOS 192.168.1.20)

**Live site:** [www.optimadigitalselaras.com](https://www.optimadigitalselaras.com)

Scope: this website only. Do not use other LAN clouds for this deploy.

The public homepage is standalone Optima HTML (hero video + animations). In this repo that is root `index.html` plus `public/assets/optima/` (video extracted; no 9 MB base64 dump).

Orisa Vite SPA lives at `orisa.html` / `src/`. Do not deploy only that SPA onto `optima-web` or you will drop the video homepage.

## What is actually running

| Layer | Detail |
|---|---|
| Host | Windows NAS `192.168.1.20` (`DESKTOP-5QDC7T3`, user `NAS_GIOS`) |
| Public DNS / TLS | Cloudflare (`www` + apex) |
| **Live origin** | Docker container `optima-web` (`nginx:1.27-alpine`) → host port **8088** |
| Staging on NAS | `C:\deploy\optima-live\` then `docker cp` into `optima-web:/usr/share/nginx/html/` |
| IIS `:80` | `C:\inetpub\wwwroot` — leftover Vite SPA. **Not** the Cloudflare origin |
| Node/nginx on host OS | Not installed; nginx runs only inside Docker |

```
Browser → Cloudflare → GIOS 192.168.1.20:8088 (optima-web nginx) → Optima HTML
                         192.168.1.20:80  (IIS wwwroot)           → Vite SPA (not live)
```

## This Git repo vs live

| Path | Role |
|---|---|
| `index.html` + `public/assets/optima/` | **Production homepage** (video + animations) |
| `public/solutions/` + `public/products/` | Learn more pages (Enterprise, SaaS, Web, Digital Transformation) |
| `orisa.html`, `src/` | Orisa React template — library / future SPA |
| `.github/workflows/deploy.yml` | Packages `optima-web-8088` artifact + Vite check. **No SCP to GIOS** |
| `scripts/deploy-optima-web.ps1` | LAN deploy into Docker `optima-web` `:8088` |

## Update live (manual, from LAN)

Prefer SSH **key** auth. Do not store NAS passwords in the repo or `.claude/`.

```powershell
$env:DEPLOY_HOST = "192.168.1.20"
$env:DEPLOY_USER = "NAS_GIOS"
$env:DEPLOY_KEY  = "$env:USERPROFILE\.ssh\id_ed25519"   # if you have a key
.\scripts\deploy-optima-web.ps1
```

The script copies `index.html`, `public/assets/optima`, `public/solutions`, and `public/products` to `C:\deploy\optima-live\`, then:

```
docker cp C:\deploy\optima-live\. optima-web:/usr/share/nginx/html/
docker restart optima-web
```

Verify:

- `http://192.168.1.20:8088` — Optima HTML (origin)
- `https://www.optimadigitalselaras.com` — same content via Cloudflare

Do **not** copy into `C:\inetpub\wwwroot` (IIS) unless you intentionally want to change the unused `:80` site.

## GitHub Actions

`deploy.yml` runs on `main` / `workflow_dispatch`:

1. Checkout with Git LFS (hero video)
2. Upload artifact **`optima-web-8088`** (homepage + solutions + products)
3. `npm ci && npm run build` as an Orisa library check only

GitHub-hosted `ubuntu-latest` **cannot** reach `192.168.1.20`. Automatic live deploy needs a **self-hosted runner on the GIOS NAS** later, still targeting `optima-web` `:8088`, not Linux `/var/www` and not IIS `wwwroot`.

Do not add `appleboy/scp-action` against `DEPLOY_HOST=192.168.1.20` on github.com runners.

## Security notes

- `.gitignore` covers `.claude/`, `.env.production`, template zips, and dump media.
- `.env.example` is tracked; `.env.production` is not.
- Rotate the NAS SSH password off any old plaintext copies; use a deploy key.

## Vercel (optional)

`vercel.json` can preview this static homepage. That is **not** www.optimadigitalselaras.com (GIOS + Cloudflare).
