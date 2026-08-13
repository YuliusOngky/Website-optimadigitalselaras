#!/bin/bash
# Intentionally does NOT upload Vite dist/ to live Optima.
# Live origin on GIOS 192.168.1.20 is Docker optima-web (nginx :8088),
# not IIS wwwroot and not /var/www.

set -euo pipefail

echo "This script will not deploy to www.optimadigitalselaras.com."
echo
echo "Live stack:"
echo "  Host:   192.168.1.20 (NAS GIOS, Windows)"
echo "  Origin: docker optima-web  nginx:1.27-alpine  host :8088"
echo "  Staging file often used: C:\\deploy\\new_index.html"
echo "  IIS :80 wwwroot is a leftover Vite SPA and is NOT the Cloudflare origin."
echo
echo "Repo homepage is index.html + public/assets/optima/hero.mp4 (matches live)."
echo "Do not scp only the Orisa SPA onto optima-web — that drops the video homepage."
echo "Update live by copying index.html + public/assets/optima/ into the optima-web nginx root, then:"
echo "  docker restart optima-web"
echo "Verify: http://192.168.1.20:8088  and  https://www.optimadigitalselaras.com"
exit 1
