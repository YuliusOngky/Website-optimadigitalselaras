# Deployment — Optima Digital Selaras (CAP 192.168.1.50)

**Live site:** [www.optimadigitalselaras.com](https://www.optimadigitalselaras.com)

Cutover (2026-09-28): Optima HTML + Store + PosPro + LOS/CMS Optima hostnames serve from **CAP**. Cloudflare Tunnel still runs on **GIOS** (`nextcloud`) and proxies Optima hostnames to `192.168.1.50`. **Nextcloud / gios.online stays on GIOS.**

The public homepage is standalone Optima HTML (hero video + animations). In this repo that is root `index.html` plus `public/assets/optima/`.

Orisa Vite SPA lives at `orisa.html` / `src/`. Do not deploy only that SPA onto `optima-web` or you will drop the video homepage.

## What is actually running

| Layer | Detail |
|---|---|
| App host | CAP `192.168.1.50` (`x250`, user `CAP`) |
| Public DNS / TLS | Cloudflare Tunnel `nextcloud` on GIOS (`e5b04a8d-…`) → origins on CAP |
| **Marketing origin** | Docker `optima-web` (`nginx:1.27-alpine`) on CAP → host port **8088** |
| Store Station | Docker `optimastorestation-web-1` on CAP → **3100** (`store-demo`, `/optima-store`) |
| PosPro | Docker `gios-web-1` on CAP → **8193** (paths `/optima-pos/.+`) |
| LOS / CMS (Optima hosts) | PM2 `los-web` / `cms-web` on CAP → **8091** / **8092** |
| HTML on CAP | Bind mount `C:\deploy\optima-sites\optimadigitalselaras` |
| Nextcloud | Still GIOS Docker `nextcloud` → **8082** → `gios.online` |

```
Browser → Cloudflare → tunnel nextcloud (GIOS)
                      → 192.168.1.50:8088  optima-web (marketing)
                      → 192.168.1.50:3100  Store Station
                      → 192.168.1.50:8193  PosPro
                      → 192.168.1.50:8091/8092  LOS/CMS
                      → 127.0.0.1:8082 (GIOS) Nextcloud / gios.online
```

Tunnel config source of truth: [scripts/cloudflared-gios-config.cap-origins.yml](scripts/cloudflared-gios-config.cap-origins.yml) (applied on GIOS as `config.yml`). Rollback backups: `C:\Users\NAS GIOS\.cloudflared\config.yml.bak-before-optima-cap-*`.

## Update live marketing (manual, from LAN)

```powershell
# Default target is CAP (ssh alias x250)
.\scripts\deploy-optima-web.ps1
```

Override if needed:

```powershell
$env:DEPLOY_HOST = "192.168.1.50"
$env:DEPLOY_USER = "CAP"
$env:DEPLOY_REMOTE_DIR = "C:\deploy\optima-sites\optimadigitalselaras"
.\scripts\deploy-optima-web.ps1
```

Verify:

- `http://192.168.1.50:8088` — Optima HTML (`Server: nginx`)
- `https://www.optimadigitalselaras.com` — same content via Cloudflare
- `https://gios.online` — Nextcloud only (must stay on GIOS)

## GIOS disk cleanup (after 24–48h)

Do **not** delete Optima containers on GIOS until observation passes. Script (time-gated):

`scripts/_migrate_gios_cleanup_optima.ps1` — see `scripts/_migrate_observation.md`.

## GitHub Actions

`deploy.yml` packages `optima-web-8088` artifact. GitHub-hosted runners cannot reach CAP LAN; deploy remains manual via `deploy-optima-web.ps1`.
