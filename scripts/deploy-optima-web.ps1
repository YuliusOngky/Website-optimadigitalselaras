# Deploy Optima homepage to CAP Docker optima-web (nginx host :8088).
# Does NOT touch IIS wwwroot and does NOT upload the Orisa Vite SPA.
#
# From a laptop on the LAN:
#   Prefer: ssh x250   (CAP 192.168.1.50)
#   .\scripts\deploy-optima-web.ps1
#
# Live origin bind-mount on CAP:
#   C:\deploy\optima-sites\optimadigitalselaras
# Verify: http://192.168.1.50:8088  and  https://www.optimadigitalselaras.com
#
# Cloudflare Tunnel still runs on GIOS and proxies Optima hostnames to CAP.

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$HostName = if ($env:DEPLOY_HOST) { $env:DEPLOY_HOST } else { "192.168.1.50" }
$UserName = if ($env:DEPLOY_USER) { $env:DEPLOY_USER } else { "CAP" }
$RemoteDir = if ($env:DEPLOY_REMOTE_DIR) { $env:DEPLOY_REMOTE_DIR } else { "C:\deploy\optima-sites\optimadigitalselaras" }
$Identity = $env:DEPLOY_KEY
$UseAlias = (-not $env:DEPLOY_HOST -and -not $env:DEPLOY_USER)
$SshTarget = if ($UseAlias) { "x250" } else { $HostName }

$Index = Join-Path $RepoRoot "index.html"
$OptimaAssets = Join-Path $RepoRoot "public\assets\optima"
$Solutions = Join-Path $RepoRoot "public\solutions"
$Products = Join-Path $RepoRoot "public\products"
$OptimaPos = Join-Path $RepoRoot "public\optima-pos"
$OptimaPos2 = Join-Path $RepoRoot "public\optima-pos_V2"
$Templates = Join-Path $RepoRoot "public\templates"

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
# Remote OpenSSH default shell is cmd.exe — avoid '|' (gets intercepted before PowerShell).
$RemotePrep = "cmd /c `"mkdir `"$RemoteDir\assets\optima\i18n`" 2>nul & mkdir `"$RemoteDir\solutions`" 2>nul & mkdir `"$RemoteDir\products\los\assets`" 2>nul & mkdir `"$RemoteDir\optima-pos\login`" 2>nul & mkdir `"$RemoteDir\optima-pos_V2`" 2>nul & mkdir `"$RemoteDir\templates`" 2>nul & exit /b 0`""
& ssh @SshArgs $SshTarget $RemotePrep
if ($LASTEXITCODE -ne 0) { throw "SSH mkdir failed with exit $LASTEXITCODE" }

& scp @ScpArgs $Index "${SshTarget}:${RemoteUnix}/index.html"
if ($LASTEXITCODE -ne 0) { throw "scp index.html failed" }

$OptimaItems = Get-ChildItem -Path $OptimaAssets -Force | ForEach-Object { $_.FullName }
& scp @ScpArgs -r @OptimaItems "${SshTarget}:${RemoteUnix}/assets/optima/"
if ($LASTEXITCODE -ne 0) { throw "scp optima assets failed" }

if (Test-Path $Solutions) {
  $SolutionsItems = Get-ChildItem -Path $Solutions -Force | ForEach-Object { $_.FullName }
  & scp @ScpArgs -r @SolutionsItems "${SshTarget}:${RemoteUnix}/solutions/"
  if ($LASTEXITCODE -ne 0) { throw "scp solutions failed" }
}
if (Test-Path $Products) {
  $ProductsItems = Get-ChildItem -Path $Products -Force | ForEach-Object { $_.FullName }
  & scp @ScpArgs -r @ProductsItems "${SshTarget}:${RemoteUnix}/products/"
  if ($LASTEXITCODE -ne 0) { throw "scp products failed" }
}
if (Test-Path $OptimaPos) {
  $PosItems = @(Get-ChildItem -Path $OptimaPos -Force | ForEach-Object { $_.FullName })
  if ($PosItems.Count -eq 1) {
    & scp @ScpArgs $PosItems[0] "${SshTarget}:${RemoteUnix}/optima-pos/index.html"
    if ($LASTEXITCODE -ne 0) { Write-Warning "scp optima-pos index non-fatal: $LASTEXITCODE" }
  } elseif ($PosItems.Count -gt 1) {
    & scp @ScpArgs -r @PosItems "${SshTarget}:${RemoteUnix}/optima-pos/"
    if ($LASTEXITCODE -ne 0) { Write-Warning "scp optima-pos non-fatal: $LASTEXITCODE" }
  }
}
if (Test-Path $OptimaPos2) {
  $Pos2Items = Get-ChildItem -Path $OptimaPos2 -Force | ForEach-Object { $_.FullName }
  & scp @ScpArgs -r @Pos2Items "${SshTarget}:${RemoteUnix}/optima-pos_V2/"
  if ($LASTEXITCODE -ne 0) { throw "scp optima-pos_V2 failed" }
}

if (Test-Path $Templates) {
  $TemplateItems = Get-ChildItem -Path $Templates -Force | Where-Object { $_.Name -match '-web$|restaurant|autodetail' } | ForEach-Object { $_.FullName }
  if ($TemplateItems) {
    & scp @ScpArgs -r @TemplateItems "${SshTarget}:${RemoteUnix}/templates/"
    if ($LASTEXITCODE -ne 0) { throw "scp templates failed" }
  }
}

Write-Host "Done. Check http://${HostName}:8088/optima-pos/login/ and https://optimadigitalselaras.com/optima-pos/login/"
Write-Host "IIS :80 was not modified."
