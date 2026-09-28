# Deploy notes — smoke-test fixes (branch `fix/smoke-test-2026-09-28`)

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
