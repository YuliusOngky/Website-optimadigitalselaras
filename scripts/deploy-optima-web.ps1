# Deploy Optima homepage to GIOS Docker optima-web (nginx host :8088).
# Does NOT touch IIS wwwroot and does NOT upload the Orisa Vite SPA.
#
# From a laptop on the LAN (SSH key already on the NAS):
#   Prefer: ssh gios   (see ~/.ssh/config — user is "NAS GIOS" with a space)
#   $env:DEPLOY_HOST = "192.168.1.20"
#   $env:DEPLOY_USER = "NAS GIOS"
#   $env:DEPLOY_KEY  = "$env:USERPROFILE\.ssh\id_ed25519"   # optional
#   .\scripts\deploy-optima-web.ps1
#
# Live origin is the bind-mounted nginx html dir (read-only in the container):
#   C:\Users\NAS GIOS\websites\optimadigitalselaras
# Verify: http://192.168.1.20:8088  and  https://www.optimadigitalselaras.com

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$HostName = if ($env:DEPLOY_HOST) { $env:DEPLOY_HOST } else { "192.168.1.20" }
# Windows account on NAS is "NAS GIOS" (with space) — see ~/.ssh/config Host gios
$UserName = if ($env:DEPLOY_USER) { $env:DEPLOY_USER } else { "NAS GIOS" }
$RemoteDir = if ($env:DEPLOY_REMOTE_DIR) { $env:DEPLOY_REMOTE_DIR } else { "C:\Users\NAS GIOS\websites\optimadigitalselaras" }
$Identity = $env:DEPLOY_KEY
$UseAlias = (-not $env:DEPLOY_HOST -and -not $env:DEPLOY_USER)
$SshTarget = if ($UseAlias) { "gios" } else { $HostName }

$Index = Join-Path $RepoRoot "index.html"
$OptimaAssets = Join-Path $RepoRoot "public\assets\optima"
$Solutions = Join-Path $RepoRoot "public\solutions"
$Products = Join-Path $RepoRoot "public\products"

if (-not (Test-Path $Index)) { throw "Missing $Index" }
$Hero = Join-Path $OptimaAssets "hero.mp4"
if (-not (Test-Path $Hero)) { throw "Missing hero.mp4. Run npm run sync:live or git lfs pull." }

$SshArgs = @("-o", "BatchMode=yes", "-o", "ConnectTimeout=15")
if ($Identity) { $SshArgs += @("-i", $Identity, "-o", "IdentitiesOnly=yes") }
if (-not $UseAlias) { $SshArgs += @("-l", $UserName) }
$ScpArgs = @("-o", "BatchMode=yes")
if ($Identity) { $ScpArgs += @("-i", $Identity, "-o", "IdentitiesOnly=yes") }
if (-not $UseAlias) { $ScpArgs += @("-o", "User=$UserName") }

Write-Host "Staging Optima homepage -> ${SshTarget}:$RemoteDir (optima-web :8088)"

$RemoteUnix = ($RemoteDir -replace '\\', '/')
$RemotePrep = "cmd /c `"if not exist `"$RemoteDir\products\los\assets`" mkdir `"$RemoteDir\products\los\assets`" & if not exist `"$RemoteDir\assets\optima`" mkdir `"$RemoteDir\assets\optima`" & if not exist `"$RemoteDir\solutions`" mkdir `"$RemoteDir\solutions`""
& ssh @SshArgs $SshTarget $RemotePrep
if ($LASTEXITCODE -ne 0) { throw "SSH mkdir failed with exit $LASTEXITCODE" }

& scp @ScpArgs $Index "${SshTarget}:${RemoteUnix}/index.html"
if ($LASTEXITCODE -ne 0) { throw "scp index.html failed" }

& scp @ScpArgs -r "$OptimaAssets\*" "${SshTarget}:${RemoteUnix}/assets/optima/"
if ($LASTEXITCODE -ne 0) { throw "scp optima assets failed" }

if (Test-Path $Solutions) {
  & scp @ScpArgs -r "$Solutions\*" "${SshTarget}:${RemoteUnix}/solutions/"
  if ($LASTEXITCODE -ne 0) { throw "scp solutions failed" }
}
if (Test-Path $Products) {
  & scp @ScpArgs -r "$Products\*" "${SshTarget}:${RemoteUnix}/products/"
  if ($LASTEXITCODE -ne 0) { throw "scp products failed" }
}

Write-Host "Done. Check http://${HostName}:8088/products/los and https://optimadigitalselaras.com/products/los"
Write-Host "IIS :80 was not modified."
