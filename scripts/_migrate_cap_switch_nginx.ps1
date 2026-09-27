$ErrorActionPreference = 'Stop'
# Recreate optima-web with nginx (image already loaded)
cmd /c "docker stop optima-web >nul 2>nul & docker rm optima-web >nul 2>nul & exit /b 0" | Out-Null
docker run -d --name optima-web --restart unless-stopped `
  -p 8088:80 `
  -v "C:\deploy\optima-sites\optimadigitalselaras:/usr/share/nginx/html:ro" `
  nginx:1.27-alpine
Start-Sleep 2
docker inspect optima-web --format '{{.Config.Image}}'
curl.exe -sS -o NUL -w "cap-nginx=%{http_code}`n" --max-time 10 http://127.0.0.1:8088/
curl.exe -sS -o NUL -w "cap-hris=%{http_code}`n" --max-time 10 http://127.0.0.1:8088/products/hris/
