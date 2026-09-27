# Observation window started after Optima cutover to CAP (GIOS tunnel origins -> 192.168.1.50)
# Cutover applied: 2026-09-28 ~00:41 WIB
# Earliest GIOS cleanup: 2026-09-28 17:42 WIB (+24h) — prefer +48h if possible
#
# Public checks (all expected OK):
# - https://optimadigitalselaras.com/ 200 (CAP nginx :8088)
# - https://optimadigitalselaras.com/products/hris/ 200
# - https://store-demo.optimadigitalselaras.com/shop 200 (CAP :3100)
# - https://los.optimadigitalselaras.com/ 200 (CAP PM2 los-web)
# - https://cms.optimadigitalselaras.com/ 200 (CAP PM2 cms-web)
# - https://gios.online/ 302 (still GIOS Nextcloud)
#
# Cleanup command (after window):
#   scp scripts/_migrate_gios_cleanup_optima.ps1 gios:...
#   ssh gios powershell -File ...\_migrate_gios_cleanup_optima.ps1
#
# Rollback tunnel if needed:
#   restore C:\Users\NAS GIOS\.cloudflared\config.yml.bak-before-optima-cap-*
