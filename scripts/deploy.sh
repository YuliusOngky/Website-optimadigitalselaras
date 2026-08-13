#!/bin/bash
# Optima live origin is Docker optima-web on GIOS 192.168.1.20:8088.
# This bash wrapper does not upload Vite/Orisa dist/.
# On Windows LAN, use: powershell -File scripts/deploy-optima-web.ps1

set -euo pipefail

echo "Live target: Docker optima-web (nginx) at 192.168.1.20:8088"
echo "Homepage files: index.html + public/assets/optima + public/solutions + public/products"
echo
echo "Do not scp Vite dist/ or IIS wwwroot — that is not the Cloudflare origin."
echo
if command -v powershell >/dev/null 2>&1; then
  echo "Running scripts/deploy-optima-web.ps1 ..."
  powershell -NoProfile -ExecutionPolicy Bypass -File "$(dirname "$0")/deploy-optima-web.ps1"
else
  echo "Use PowerShell on the LAN laptop:"
  echo "  \$env:DEPLOY_HOST='192.168.1.20'"
  echo "  \$env:DEPLOY_USER='NAS GIOS'"
  echo "  powershell -File scripts/deploy-optima-web.ps1"
  exit 1
fi
