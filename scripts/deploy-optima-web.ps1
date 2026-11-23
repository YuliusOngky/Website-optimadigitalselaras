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
function Find-ProductLandingRoot([string]$RepoName) {
  if ($env:PRODUCT_LANDING_ROOT) {
    $forced = Join-Path $env:PRODUCT_LANDING_ROOT $RepoName
    if (Test-Path (Join-Path $forced "landing\index.html")) { return $forced }
  }
  $candidates = @(
    (Join-Path (Split-Path $RepoRoot -Parent) $RepoName),
    (Join-Path $env:USERPROFILE $RepoName),
    (Join-Path $env:USERPROFILE "live-snapshot\$RepoName")
  )
  return ($candidates | Where-Object { Test-Path (Join-Path $_ "landing\index.html") } | Select-Object -First 1)
}

# Product landings sourced from dedicated repos (not duplicated here).
$KelasYogaRoot = if ($env:KELAS_YOGA_ROOT) { $env:KELAS_YOGA_ROOT } else { Find-ProductLandingRoot "kelas-yoga" }
$OptimaYoga = if ($KelasYogaRoot) { Join-Path $KelasYogaRoot "landing" } else { $null }
$MusicConnectRoot = if ($env:MUSICCONNECT_ROOT) { $env:MUSICCONNECT_ROOT } else { Find-ProductLandingRoot "musicconnectMVP" }
$MusicConnectLanding = if ($MusicConnectRoot) { Join-Path $MusicConnectRoot "landing" } else { $null }
$StoreStationRoot = if ($env:OPTIMASTORE_ROOT) { $env:OPTIMASTORE_ROOT } else { Find-ProductLandingRoot "OptimaStoreStation" }
$StoreStationLanding = if ($StoreStationRoot) { Join-Path $StoreStationRoot "landing" } else { $null }
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
$RemotePrep = "cmd /c `"mkdir `"$RemoteDir\assets\optima\i18n`" 2>nul & mkdir `"$RemoteDir\solutions`" 2>nul & mkdir `"$RemoteDir\products\los\assets`" 2>nul & mkdir `"$RemoteDir\optima-pos\login`" 2>nul & mkdir `"$RemoteDir\optima-pos_V2`" 2>nul & mkdir `"$RemoteDir\optima-yoga`" 2>nul & mkdir `"$RemoteDir\templates`" 2>nul & exit /b 0`""
& ssh @SshArgs $SshTarget $RemotePrep
if ($LASTEXITCODE -ne 0) { throw "SSH mkdir failed with exit $LASTEXITCODE" }

& scp @ScpArgs $Index "${SshTarget}:${RemoteUnix}/index.html"
if ($LASTEXITCODE -ne 0) { throw "scp index.html failed" }

foreach ($seoName in @("404.html", "robots.txt", "sitemap.xml")) {
  $seoPath = Join-Path $RepoRoot $seoName
  if (Test-Path $seoPath) {
    & scp @ScpArgs $seoPath "${SshTarget}:${RemoteUnix}/$seoName"
    if ($LASTEXITCODE -ne 0) { throw "scp $seoName failed" }
  }
}

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
if ($OptimaYoga -and (Test-Path $OptimaYoga)) {
  Write-Host "Yoga landing from kelas-yoga: $OptimaYoga"
  $YogaItems = Get-ChildItem -Path $OptimaYoga -Force | ForEach-Object { $_.FullName }
  & scp @ScpArgs -r @YogaItems "${SshTarget}:${RemoteUnix}/optima-yoga/"
  if ($LASTEXITCODE -ne 0) { throw "scp optima-yoga failed" }
} else {
  Write-Warning "kelas-yoga/landing not found. Set KELAS_YOGA_ROOT or clone YuliusOngky/kelas-yoga beside this repo. Skipping /optima-yoga deploy."
}
if ($MusicConnectLanding -and (Test-Path $MusicConnectLanding)) {
  Write-Host "MusicConnect landing from musicconnectMVP: $MusicConnectLanding"
  & ssh @SshArgs $SshTarget "cmd /c `"mkdir `"$RemoteDir\products\musiconnect`" 2>nul & exit /b 0`""
  $McItems = Get-ChildItem -Path $MusicConnectLanding -Force | ForEach-Object { $_.FullName }
  & scp @ScpArgs -r @McItems "${SshTarget}:${RemoteUnix}/products/musiconnect/"
  if ($LASTEXITCODE -ne 0) { throw "scp musiconnect landing failed" }
} else {
  Write-Warning "musicconnectMVP/landing not found. Set MUSICCONNECT_ROOT or clone YuliusOngky/musicconnectMVP. Skipping /products/musiconnect deploy."
}
if ($StoreStationLanding -and (Test-Path $StoreStationLanding)) {
  Write-Host "OptimaStore landing from OptimaStoreStation: $StoreStationLanding"
  & ssh @SshArgs $SshTarget "cmd /c `"mkdir `"$RemoteDir\products\optima-store`" 2>nul & exit /b 0`""
  $OssItems = Get-ChildItem -Path $StoreStationLanding -Force | ForEach-Object { $_.FullName }
  & scp @ScpArgs -r @OssItems "${SshTarget}:${RemoteUnix}/products/optima-store/"
  if ($LASTEXITCODE -ne 0) { throw "scp optima-store landing failed" }
} else {
  Write-Warning "OptimaStoreStation/landing not found. Set OPTIMASTORE_ROOT or clone YuliusOngky/OptimaStoreStation. Skipping /products/optima-store deploy."
}

if (Test-Path $Templates) {
  # Include *-web packs plus steak-menu (tracked from CAP live).
  $TemplateItems = Get-ChildItem -Path $Templates -Force | Where-Object { $_.Name -match '-web$|restaurant|autodetail|^steak-menu$' } | ForEach-Object { $_.FullName }
  if ($TemplateItems) {
    & scp @ScpArgs -r @TemplateItems "${SshTarget}:${RemoteUnix}/templates/"
    if ($LASTEXITCODE -ne 0) { throw "scp templates failed" }
  }
}

Write-Host "Done. Check http://${HostName}:8088/ and https://optimadigitalselaras.com/"
Write-Host "Bind mount served by optima-web :8088. IIS :80 was not modified."
