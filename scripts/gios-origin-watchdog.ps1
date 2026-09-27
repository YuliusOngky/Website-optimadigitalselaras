# Post Optima→CAP cutover (2026-09): Optima origins live on CAP (192.168.1.50).
# This watchdog NO LONGER repairs optima-web / Store / LOS on GIOS.
# It keeps Nextcloud :8082 and Wedding Album Studio (:4020) healthy only.
# (Legacy: used to restart optima-web when :8088 swapped with Nextcloud.)
$ErrorActionPreference = "Continue"
$LogDir = "C:\Users\NAS GIOS\websites\optima-ops"
if (-not (Test-Path $LogDir)) { New-Item -ItemType Directory -Path $LogDir -Force | Out-Null }
$Log = Join-Path $LogDir "origin-watchdog.log"

function Write-Log([string]$Message) {
  $line = "{0} {1}" -f (Get-Date -Format "s"), $Message
  Add-Content -Path $Log -Value $line -ErrorAction SilentlyContinue
}

function Get-Headers([string]$Url) {
  try {
    $hdrOut = Join-Path $env:TEMP "gios-hdr.txt"
    $hdrErr = Join-Path $env:TEMP "gios-hdr.err"
    $p = Start-Process -FilePath "curl.exe" -ArgumentList @("-sI","--max-time","8",$Url) -NoNewWindow -Wait -PassThru -RedirectStandardOutput $hdrOut -RedirectStandardError $hdrErr
    $txt = Get-Content $hdrOut -Raw -ErrorAction SilentlyContinue
    return @{ Code = $p.ExitCode; Text = [string]$txt }
  } catch {
    return @{ Code = -1; Text = $_.Exception.Message }
  }
}

function Get-Body([string]$Url) {
  try {
    $bodyOut = Join-Path $env:TEMP "gios-body.txt"
    $bodyErr = Join-Path $env:TEMP "gios-body.err"
    $p = Start-Process -FilePath "curl.exe" -ArgumentList @("-s","--max-time","8",$Url) -NoNewWindow -Wait -PassThru -RedirectStandardOutput $bodyOut -RedirectStandardError $bodyErr
    $txt = Get-Content $bodyOut -Raw -ErrorAction SilentlyContinue
    return @{ Code = $p.ExitCode; Text = [string]$txt }
  } catch {
    return @{ Code = -1; Text = $_.Exception.Message }
  }
}

function Repair-NextcloudOnly {
  Write-Log "REPAIR nextcloud only (Optima no longer on GIOS)"
  docker start nextcloud | Out-Null
  Start-Sleep -Seconds 4
}

function Test-NextcloudOk([string]$Headers) {
  if ([string]::IsNullOrWhiteSpace($Headers)) { return $false }
  return ($Headers -match "Apache/" -or $Headers -match "x-powered-by:\s*PHP" -or $Headers -match "oc_sessionPassphrase")
}

function Test-StudioOk {
  $health = Get-Body "http://127.0.0.1:4020/weddingalbumstudio/api/health"
  if ($health.Code -ne 0) { return $false }
  return ($health.Text -match '"ok"\s*:\s*true' -or $health.Text -match '\{\s*"ok"\s*:\s*true')
}

function Repair-Studio {
  Write-Log "REPAIR studio :4020 (end+run WeddingAlbumStudio)"
  # End a stuck task instance, then start fresh so the Node process survives via Task Scheduler
  schtasks /End /TN "WeddingAlbumStudio" 2>$null | Out-Null
  Start-Sleep -Seconds 2
  Get-NetTCPConnection -LocalPort 4020 -ErrorAction SilentlyContinue |
    ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
  Start-Sleep -Seconds 1
  schtasks /Run /TN "WeddingAlbumStudio" 2>$null | Out-Null
  if ($LASTEXITCODE -ne 0) {
    $cmd = "C:\Users\NASGIO~1\apps\run-wedding-studio.cmd"
    if (Test-Path $cmd) {
      Write-Log "REPAIR studio fallback Start-Process run-wedding-studio.cmd"
      Start-Process -FilePath "cmd.exe" -ArgumentList @("/c", $cmd) -WindowStyle Hidden | Out-Null
    } else {
      Write-Log "REPAIR studio FAIL: start script missing"
    }
  }
  Start-Sleep -Seconds 12
}

# --- Wedding Album Studio (always check; does not require Docker) ---
$studioOk = Test-StudioOk
if (-not $studioOk) {
  Write-Log "FAIL studioOk=False"
  Repair-Studio
  $studioOk2 = Test-StudioOk
  Write-Log ("AFTER studioOk={0}" -f $studioOk2)
}

# --- Nextcloud only (Optima served from CAP via tunnel origins) ---
docker info 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Log "SKIP docker not ready"
  exit 0
}

$nc = Get-Headers "http://127.0.0.1:8082/"
$ncOk = Test-NextcloudOk $nc.Text
if ($ncOk) {
  exit 0
}

Write-Log ("FAIL ncOk=False ncExit={0}" -f $nc.Code)
Repair-NextcloudOnly
$nc2 = Get-Headers "http://127.0.0.1:8082/"
Write-Log ("AFTER ncOk={0}" -f (Test-NextcloudOk $nc2.Text))
