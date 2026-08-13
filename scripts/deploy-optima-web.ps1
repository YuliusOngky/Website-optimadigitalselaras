# Deploy Optima homepage to GIOS Docker optima-web (nginx host :8088).
# Does NOT touch IIS wwwroot and does NOT upload the Orisa Vite SPA.
#
# From a laptop on the LAN (SSH key already on the NAS):
#   $env:DEPLOY_HOST = "192.168.1.20"
#   $env:DEPLOY_USER = "NAS GIOS"
#   $env:DEPLOY_KEY  = "$env:USERPROFILE\.ssh\id_ed25519"   # optional
#   .\scripts\deploy-optima-web.ps1
#
# On the NAS the files land in C:\deploy\optima-live\ then:
#   docker cp C:\deploy\optima-live\. optima-web:/usr/share/nginx/html/
#   docker restart optima-web
# Verify: http://192.168.1.20:8088  and  https://www.optimadigitalselaras.com

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$HostName = if ($env:DEPLOY_HOST) { $env:DEPLOY_HOST } else { "192.168.1.20" }
$UserName = if ($env:DEPLOY_USER) { $env:DEPLOY_USER } else { "NAS GIOS" }
$RemoteDir = if ($env:DEPLOY_REMOTE_DIR) { $env:DEPLOY_REMOTE_DIR } else { "C:\deploy\optima-live" }
$Identity = $env:DEPLOY_KEY

$Index = Join-Path $RepoRoot "index.html"
$OptimaAssets = Join-Path $RepoRoot "public\assets\optima"
$Solutions = Join-Path $RepoRoot "public\solutions"
$Products = Join-Path $RepoRoot "public\products"

if (-not (Test-Path $Index)) { throw "Missing $Index" }
if (-not (Test-Path (Join-Path $OptimaAssets "hero.mp4"))) { throw "Missing hero.mp4 — run npm run sync:live or git lfs pull" }

$SshTarget = "${UserName}@${HostName}"
$KeyArgs = @()
if ($Identity) { $KeyArgs = @("-i", $Identity) }

Write-Host "Staging Optima homepage -> ${SshTarget}:$RemoteDir (optima-web :8088)"

$RemoteUnix = ($RemoteDir -replace '\\', '/')
$MkdirCmd = "if not exist `"$RemoteDir\assets\optima`" mkdir `"$RemoteDir\assets\optima`" & if not exist `"$RemoteDir\solutions`" mkdir `"$RemoteDir\solutions`" & if not exist `"$RemoteDir\products`" mkdir `"$RemoteDir\products`""
& ssh @KeyArgs -o BatchMode=yes -o ConnectTimeout=12 $SshTarget $MkdirCmd

& scp @KeyArgs -o BatchMode=yes $Index "${SshTarget}:${RemoteUnix}/index.html"
& scp @KeyArgs -o BatchMode=yes -r "$OptimaAssets\*" "${SshTarget}:${RemoteUnix}/assets/optima/"
if (Test-Path $Solutions) {
  & scp @KeyArgs -o BatchMode=yes -r "$Solutions\*" "${SshTarget}:${RemoteUnix}/solutions/"
}
if (Test-Path $Products) {
  & scp @KeyArgs -o BatchMode=yes -r "$Products\*" "${SshTarget}:${RemoteUnix}/products/"
}

$RemoteCmd = @"
docker cp `"$RemoteDir\.`" optima-web:/usr/share/nginx/html/
docker restart optima-web
"@
& ssh @KeyArgs -o BatchMode=yes -o ConnectTimeout=12 $SshTarget $RemoteCmd

Write-Host "Done. Check http://${HostName}:8088 and https://www.optimadigitalselaras.com"
Write-Host "IIS :80 was not modified."
