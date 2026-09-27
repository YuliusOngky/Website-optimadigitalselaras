# Cleanup Optima stack on GIOS AFTER 24h healthy cutover to CAP.
# Refuses to run before the earliest timestamp unless -Force is passed.
#
# Usage (on GIOS or via ssh):
#   powershell -File _migrate_gios_cleanup_optima.ps1
#   powershell -File _migrate_gios_cleanup_optima.ps1 -Force   # override time gate
#
# NEVER touches: nextcloud, gios.online tunnel rules, rosalia, webanalytic, wedding studio.

param(
  [switch]$Force,
  [datetime]$Earliest = '2026-09-28T17:42:00+07:00'
)

$ErrorActionPreference = 'Stop'
if (-not $Force -and (Get-Date) -lt $Earliest) {
  Write-Output ("Refuse cleanup until {0:o} (now {1:o}). Pass -Force to override." -f $Earliest, (Get-Date))
  exit 2
}

Write-Output '=== PRECHECK public Optima still on CAP ==='
$checks = @(
  'https://optimadigitalselaras.com/',
  'https://store-demo.optimadigitalselaras.com/shop',
  'https://gios.online/'
)
foreach ($u in $checks) {
  $code = curl.exe -sS -o NUL -w '%{http_code}' --max-time 20 --max-redirs 0 $u
  Write-Output "$u -> $code"
  if ($u -match 'gios\.online' -and $code -notin @('302','301','200')) { throw "gios.online unhealthy: $code" }
  if ($u -notmatch 'gios\.online' -and $code -ne '200') { throw "Optima unhealthy: $u -> $code" }
}

$containers = @(
  'optima-web',
  'optimastorestation-web-1',
  'optima-store',
  'optima-api',
  'optima-api-proxy',
  'optima-db',
  'gios-web-1',
  'gios-db-1',
  'los-frontend-1',
  'los-api-1',
  'cms-web-1'
)

Write-Output '=== STOP/RM Optima containers ==='
foreach ($n in $containers) {
  cmd /c "docker stop $n >nul 2>nul & docker rm $n >nul 2>nul & exit /b 0" | Out-Null
  Write-Output "removed-or-absent $n"
}

Write-Output '=== REMOVE Optima volumes (named only) ==='
$vols = @(
  'optimastorestation_oss_data',
  'optimastorestation_oss_uploads',
  'gios_pospro_db',
  'gios_pospro_storage',
  'los_los_pglite_data',
  'los_los_uploads',
  'optima_optima_pg_data'
)
foreach ($v in $vols) {
  cmd /c "docker volume rm $v >nul 2>nul & exit /b 0" | Out-Null
  Write-Output "volume-rm $v"
}

Write-Output '=== ARCHIVE site folder (not delete blind) ==='
$site = 'C:\Users\NAS GIOS\websites\optimadigitalselaras'
$archiveRoot = 'D:\optima-migrate\site-archive'
if (Test-Path $site) {
  New-Item -ItemType Directory -Force -Path $archiveRoot | Out-Null
  $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
  $dest = Join-Path $archiveRoot "optimadigitalselaras-$stamp"
  Write-Output "Moving $site -> $dest"
  Move-Item $site $dest -Force
}

Write-Output '=== DISK AFTER ==='
Get-PSDrive -PSProvider FileSystem | Where-Object { $_.Name -in @('C','D') } | ForEach-Object {
  '{0}: free={1:N1}GB' -f $_.Name, ($_.Free / 1GB)
}

Write-Output 'Cleanup complete. Nextcloud/gios.online intentionally kept.'
