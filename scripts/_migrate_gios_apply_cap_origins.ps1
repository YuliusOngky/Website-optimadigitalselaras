$ErrorActionPreference = 'Stop'
$Src = 'C:\Users\NASGIO~1\websites\optima-ops\cloudflared-gios-config.cap-origins.yml'
$Dst = 'C:\Users\NAS GIOS\.cloudflared\config.yml'
$Bak = "C:\Users\NAS GIOS\.cloudflared\config.yml.bak-before-optima-cap-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

if (-not (Test-Path $Src)) { throw "Missing $Src" }
if (-not (Test-Path $Dst)) { throw "Missing $Dst" }

Copy-Item $Dst $Bak -Force
Copy-Item $Src $Dst -Force
Write-Output "Backed up to $Bak"
Write-Output 'Restarting cloudflared service/process...'

# Prefer Windows service if present
$svc = Get-Service -Name 'Cloudflared','cloudflared' -ErrorAction SilentlyContinue | Select-Object -First 1
if ($svc) {
  Restart-Service $svc.Name -Force
  Write-Output "Restarted service $($svc.Name)"
} else {
  # Kill and relaunch common start script
  Get-Process cloudflared -ErrorAction SilentlyContinue | Stop-Process -Force
  Start-Sleep -Seconds 2
  $bat = 'C:\Users\NAS GIOS\.cloudflared\start-cloudflared.bat'
  $bat2 = 'C:\Users\NASGIO~1\websites\optima-ops\start-cloudflared.bat'
  if (Test-Path $bat) {
    Start-Process -FilePath $bat -WindowStyle Hidden
  } elseif (Test-Path $bat2) {
    Start-Process -FilePath $bat2 -WindowStyle Hidden
  } else {
    $cred = 'C:\Users\NAS GIOS\.cloudflared\e5b04a8d-1944-41a2-8798-faa5bf00f374.json'
    $cfg = $Dst
    $exe = (Get-Command cloudflared -ErrorAction SilentlyContinue).Source
    if (-not $exe) { $exe = 'C:\Program Files (x86)\cloudflared\cloudflared.exe' }
    if (-not (Test-Path $exe)) { $exe = 'C:\cloudflared\cloudflared.exe' }
    Start-Process -FilePath $exe -ArgumentList @('--config', $cfg, 'tunnel', 'run') -WindowStyle Hidden
  }
  Write-Output 'Relaunched cloudflared process'
}

Start-Sleep -Seconds 5
Get-Process cloudflared -ErrorAction SilentlyContinue | Format-Table Id,Path -AutoSize
Write-Output 'Done cutover config apply'
