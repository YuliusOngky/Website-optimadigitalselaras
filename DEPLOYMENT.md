# Deployment — Optima Digital Selaras (GIOS 192.168.1.20)

**Live site:** [www.optimadigitalselaras.com](https://www.optimadigitalselaras.com)

The public homepage is **not** the Vite/Orisa SPA in `src/`. Live is a standalone Optima HTML page served from Docker on the GIOS NAS, in front of Cloudflare.

Do not SCP `npm run build` / `dist/` onto the live origin. That would replace Optima with the Orisa template.

## What is actually running

| Layer | Detail |
|---|---|
| Host | Windows NAS `192.168.1.20` (`DESKTOP-5QDC7T3`, user `NAS GIOS`) |
| Public DNS / TLS | Cloudflare (`www` + apex) |
| **Live origin** | Docker container `optima-web` (`nginx:1.27-alpine`) → host port **8088** |
| Live staging file | `C:\deploy\new_index.html` (~9.4 MB HTML, same size as live) |
| IIS `:80` | `C:\inetpub\wwwroot` — leftover Vite SPA (~2 KB `index.html`). **Not** the Cloudflare origin |
| Vite staging | `C:\deploy\dist` (SPA). `C:\deploy\dist-prod` is empty |

```
Browser → Cloudflare → GIOS 192.168.1.20:8088 (optima-web nginx) → Optima HTML
                         192.168.1.20:80  (IIS wwwroot)           → Vite SPA (not live)
```

## Update live (manual, from LAN)

1. Edit/export the Optima HTML (match [www.optimadigitalselaras.com](https://www.optimadigitalselaras.com), not Orisa).
2. Copy it to the NAS, for example:
   - `C:\deploy\new_index.html`
   - then into the `optima-web` nginx html mount (inspect with `docker inspect optima-web`).
3. Restart only if needed: `docker restart optima-web`
4. Verify:
   - `http://192.168.1.20:8088` — Optima HTML
   - `https://www.optimadigitalselaras.com` — same content (Cloudflare)

SSH from this PC uses PuTTY `plink`/`pscp` to `NAS GIOS@192.168.1.20`. Prefer an SSH **key**; do not store passwords in the repo or `.claude/`.

## This Git repo vs live

| Path | Role |
|---|---|
| `src/`, `index.html`, Vite | Orisa React template — library / future SPA, **not** production homepage |
| `solutions/` | Extra HTML pages (e.g. enterprise software). Live `/solutions/enterprise-software/` is still 404 |
| `.github/workflows/deploy.yml` | Build check only. Does **not** auto-deploy to GIOS (LAN IP is unreachable from GitHub-hosted runners) |

## GitHub Actions

`deploy.yml` no longer deploys on push. It only runs `npm ci` + `npm run build` on **workflow_dispatch**, so a failed SCP cannot overwrite live Optima.

A future automatic deploy needs a **self-hosted runner on the GIOS NAS**, targeting `optima-web` `:8088`, not Linux `/var/www` and not IIS `wwwroot`.

Required later (not set today): self-hosted runner + SSH key on the NAS. Do not put `DEPLOY_HOST=192.168.1.20` on github.com ubuntu runners.

## Vercel (optional)

`vercel.json` can host the Vite SPA. That is a **separate** preview, not www.optimadigitalselaras.com.
