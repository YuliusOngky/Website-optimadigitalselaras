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
$Hero = Join-Path $OptimaAssets "hero.mp4"
if (-not (Test-Path $Hero)) { throw "Missing hero.mp4. Run npm run sync:live or git lfs pull." }

$SshTarget = "${UserName}@${HostName}"
$KeyArgs = @()
if ($Identity) { $KeyArgs = @("-i", $Identity) }

Write-Host "Staging Optima homepage -> ${SshTarget}:$RemoteDir (optima-web :8088)"

$RemoteUnix = ($RemoteDir -replace '\\', '/')
$RemotePrep = "powershell -NoProfile -Command `"New-Item -ItemType Directory -Force -Path '$RemoteDir\assets\optima','$RemoteDir\solutions','$RemoteDir\products' | Out-Null`""
& ssh @KeyArgs -o BatchMode=yes -o ConnectTimeout=12 $SshTarget $RemotePrep
if ($LASTEXITCODE -ne 0) { throw "SSH mkdir failed with exit $LASTEXITCODE" }

& scp @KeyArgs -o BatchMode=yes $Index "${SshTarget}:${RemoteUnix}/index.html"
if ($LASTEXITCODE -ne 0) { throw "scp index.html failed" }

& scp @KeyArgs -o BatchMode=yes -r "$OptimaAssets\*" "${SshTarget}:${RemoteUnix}/assets/optima/"
if ($LASTEXITCODE -ne 0) { throw "scp optima assets failed" }

if (Test-Path $Solutions) {
  & scp @KeyArgs -o BatchMode=yes -r "$Solutions\*" "${SshTarget}:${RemoteUnix}/solutions/"
  if ($LASTEXITCODE -ne 0) { throw "scp solutions failed" }
}
if (Test-Path $Products) {
  & scp @KeyArgs -o BatchMode=yes -r "$Products\*" "${SshTarget}:${RemoteUnix}/products/"
  if ($LASTEXITCODE -ne 0) { throw "scp products failed" }
}

$RemoteDeploy = "powershell -NoProfile -Command `"docker cp '$RemoteDir\.' optima-web:/usr/share/nginx/html/; docker restart optima-web`""
& ssh @KeyArgs -o BatchMode=yes -o ConnectTimeout=12 $SshTarget $RemoteDeploy
if ($LASTEXITCODE -ne 0) { throw "docker cp/restart failed with exit $LASTEXITCODE" }

Write-Host "Done. Check http://${HostName}:8088 and https://www.optimadigitalselaras.com"
Write-Host "IIS :80 was not modified."
