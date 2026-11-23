# Deploy notes — smoke-test fixes (branch `fix/smoke-test-2026-09-28`)

## Trailing-slash Location leak (2026-11-23)

**Symptom:** `GET /products/hris` (no slash) returned
`Location: http://origin-web.optimadigitalselaras.com/products/hris/`.

**Cause:** Cloudflare Tunnel presents `Host: origin-web...` to nginx; nginx
`absolute_redirect` built an absolute Location from that Host + http.

**Fix (live on CAP):** in `C:\deploy\optima-sites\nginx-default.conf`:
```
absolute_redirect off;
port_in_redirect off;
```
Then `docker compose restart optima-web` (reload alone was not enough on Docker Desktop bind mount).

Repo mirror: `deploy/cap/nginx-default.conf` + snippet note in
`deploy/cap/nginx-hardening.snippet.conf`.

**Verify:**
```
curl -sSI https://optimadigitalselaras.com/products/hris
:: expect Location: /products/hris/  (relative, no origin-web)
```

## Item 3 — Hide nginx version on apex 404

**Root cause:** `optima-web` (nginx:1.27-alpine on CAP :8088) returns the stock nginx 404 body containing `nginx/1.27.5` because `server_tokens` is still on (default) and there is no branded `error_page`.

**Repo changes:**
- `public/404.html` — branded 404 page (no server version string)
- `deploy/cap/nginx-hardening.snippet.conf` — `server_tokens off;` + `error_page 404 /404.html`

**Manual on CAP (after approval — not done in this PR):**

```bat
copy C:\deploy\optima-sites\nginx-default.conf C:\deploy\optima-sites\nginx-default.conf.bak-20260928
:: merge snippet directives into nginx-default.conf (do not wipe existing location blocks)
copy /Y <path-to-built-site>\404.html C:\deploy\optima-sites\optimadigitalselaras\404.html
cd C:\deploy\optima-sites
docker compose exec optima-web nginx -t
docker compose exec optima-web nginx -s reload
```

**Verify:**

```bat
curl -s https://optimadigitalselaras.com/ini-pasti-tidak-ada-xyz123 | findstr /i nginx
:: expect: no "nginx/1.27" in body
```
