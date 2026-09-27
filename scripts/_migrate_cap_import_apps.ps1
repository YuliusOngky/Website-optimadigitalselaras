$ErrorActionPreference = 'Continue'
$InDir = 'C:\deploy\optima-migrate'
if (-not (Test-Path "$InDir\optimastorestation-web.tar")) { throw "Missing images in $InDir" }

# Skip slow docker load if images already present
$needLoad = -not (docker images -q optimastorestation-web)
if ($needLoad) {
  Write-Output 'Loading images (may take several minutes)...'
  docker load -i "$InDir\optimastorestation-web.tar"
  docker load -i "$InDir\optima-store.tar"
  docker load -i "$InDir\gios-web.tar"
  docker load -i "$InDir\mariadb-11.8.tar"
} else {
  Write-Output 'Images already present — skip load'
}

Write-Output 'Ensuring volumes...'
docker volume create optimastorestation_oss_data | Out-Null
docker volume create optimastorestation_oss_uploads | Out-Null
docker volume create gios_pospro_db | Out-Null
docker volume create gios_pospro_storage | Out-Null

$Helper = 'postgres:16-alpine'
Write-Output 'Restoring volumes...'
docker run --rm -v optimastorestation_oss_data:/data -v "${InDir}:/backup" $Helper sh -c "cd /data && tar xzf /backup/oss_data.tar.gz"
docker run --rm -v optimastorestation_oss_uploads:/data -v "${InDir}:/backup" $Helper sh -c "cd /data && tar xzf /backup/oss_uploads.tar.gz"
docker run --rm -v gios_pospro_db:/data -v "${InDir}:/backup" $Helper sh -c "cd /data && tar xzf /backup/pospro_db.tar.gz"
docker run --rm -v gios_pospro_storage:/data -v "${InDir}:/backup" $Helper sh -c "cd /data && tar xzf /backup/pospro_storage.tar.gz"

cmd /c "docker network create optima-pospro >nul 2>nul & exit /b 0" | Out-Null

foreach ($n in @('optimastorestation-web-1','optima-store','gios-db-1','gios-web-1')) {
  cmd /c "docker stop $n >nul 2>nul & docker rm $n >nul 2>nul & exit /b 0" | Out-Null
}

# Secrets must be provided via env (set by caller); do not hardcode in repo
if (-not $env:POSPRO_DB_PASSWORD) { throw 'POSPRO_DB_PASSWORD missing' }
if (-not $env:POSPRO_ROOT_PASSWORD) { throw 'POSPRO_ROOT_PASSWORD missing' }

Write-Output 'Starting Store :3100...'
$storeArgs = @(
  'run','-d','--name','optimastorestation-web-1','--restart','unless-stopped',
  '-p','3100:3000',
  '-e','PORT=3000','-e','HOSTNAME=0.0.0.0',
  '-e','DATABASE_URL=file:./data/store.db',
  '-v','optimastorestation_oss_data:/app/data',
  '-v','optimastorestation_oss_uploads:/app/public/uploads'
)
if ($env:STORE_ADMIN_PASSWORD) {
  $storeArgs += @('-e',"ADMIN_PASSWORD=$env:STORE_ADMIN_PASSWORD")
}
$storeArgs += 'optimastorestation-web'
& docker @storeArgs

Write-Output 'Starting optima-store :3035...'
docker run -d --name optima-store --restart unless-stopped `
  -p 3035:3000 -e PORT=3000 -e HOSTNAME=0.0.0.0 `
  optima-store:latest

Write-Output 'Starting PosPro DB...'
docker run -d --name gios-db-1 --restart unless-stopped `
  --network optima-pospro `
  -e MYSQL_DATABASE=pospro `
  -e MYSQL_USER=pospro `
  -e "MYSQL_PASSWORD=$env:POSPRO_DB_PASSWORD" `
  -e "MYSQL_ROOT_PASSWORD=$env:POSPRO_ROOT_PASSWORD" `
  -v gios_pospro_db:/var/lib/mysql `
  mariadb:11.8

Start-Sleep -Seconds 12

Write-Output 'Starting PosPro web :8193...'
docker run -d --name gios-web-1 --restart unless-stopped `
  --network optima-pospro `
  -p 8193:80 `
  -e APP_URL='https://optimadigitalselaras.com/optima-pos' `
  -e ASSET_URL='https://optimadigitalselaras.com/optima-pos' `
  -e DB_CONNECTION=mysql `
  -e DB_HOST=gios-db-1 `
  -e DB_PORT=3306 `
  -e DB_DATABASE=pospro `
  -e DB_USERNAME=pospro `
  -e "DB_PASSWORD=$env:POSPRO_DB_PASSWORD" `
  -e "MYSQL_PASSWORD=$env:POSPRO_DB_PASSWORD" `
  -e "MYSQL_ROOT_PASSWORD=$env:POSPRO_ROOT_PASSWORD" `
  -e MYSQL_DATABASE=pospro `
  -e MYSQL_USER=pospro `
  -v gios_pospro_storage:/var/www/html/storage/app `
  gios-web

Start-Sleep -Seconds 4
Write-Output '=== SMOKE ==='
curl.exe -sS -o NUL -w "store3100=%{http_code}`n" --max-time 20 http://127.0.0.1:3100/
curl.exe -sS -o NUL -w "store3035=%{http_code}`n" --max-time 20 http://127.0.0.1:3035/
curl.exe -sS -o NUL -w "pos8193=%{http_code}`n" --max-time 20 http://127.0.0.1:8193/
curl.exe -sS -o NUL -w "los8091=%{http_code}`n" --max-time 15 http://127.0.0.1:8091/
curl.exe -sS -o NUL -w "cms8092=%{http_code}`n" --max-time 15 http://127.0.0.1:8092/
docker ps --format '{{.Names}}|{{.Status}}|{{.Ports}}'
