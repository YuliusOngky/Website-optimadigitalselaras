# Optima migration inventory — 2026-09-27 (no secrets)
# GIOS 192.168.1.20 → CAP 192.168.1.50

## Disk
- GIOS C: ~7.0 GB free; D: ~455 GB free
- CAP C: ~129 GB free
- Live site folder GIOS: ~613 MB (websites/optimadigitalselaras)

## GIOS Optima stack (ports)
- optima-web nginx:8088 → bind websites/optimadigitalselaras
- optimastorestation-web-1:3000 (volumes oss_data, oss_uploads)
- optima-store:3035 (image optima-store:latest)
- gios-web-1 PosPro:8093 + gios-db-1 MariaDB (volumes gios_pospro_*)
- los-frontend:8091 + los-api:4000 (pglite volumes)
- cms-web-1: EXITED (public cms.* currently 502)
- pos-api:3010: FREE on GIOS (public pos-api.* 502)

## CAP conflicts / free
- FREE: 8088, 3010, 3100
- BUSY: 3000=CAP app, 8090=crd-cap-gateway, 8091=los-web, 8092=cms-web, 8093=crd-www, 18080=HRIS caddy
- Tunnel CAP: 23807109-5340-46c7-8cdf-4d9ac029ecf7 (CRD hostnames only)
- Tunnel GIOS nextcloud: e5b04a8d-… (Optima + gios.online)

## Target ports on CAP
- Marketing optima-web: 8088
- Store Station: 3100 (remap; 3000 taken)
- optima-store aux: 3035
- PosPro web: 8193 (remap; 8093 taken by CRD www)
- PosPro DB: internal docker network only
- LOS Optima hostname → existing CAP los-web :8091
- CMS Optima hostname → existing CAP cms-web :8092

## Cutover strategy (no CF API token on laptop)
1. Serve all Optima origins on CAP LAN ports
2. Point GIOS tunnel Optima ingress to http://192.168.1.50:<port> (keeps DNS; frees GIOS Docker later)
3. Keep gios.online → 127.0.0.1:8082 on GIOS
4. After 24–48h healthy: remove Optima containers/volumes/site on GIOS
