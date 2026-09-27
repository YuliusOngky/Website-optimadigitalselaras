# Schedule time-gated Optima cleanup on GIOS (runs after observation window).
$ErrorActionPreference = 'Stop'
$opsShort = 'C:\Users\NASGIO~1\websites\optima-ops'
$cmd = Join-Path $opsShort '_migrate_gios_cleanup_optima.cmd'
$ps1 = Join-Path $opsShort '_migrate_gios_cleanup_optima.ps1'
if (-not (Test-Path $ps1)) { throw "Missing $ps1" }
if (-not (Test-Path $cmd)) { throw "Missing $cmd" }

$taskName = 'OptimaGiosCleanupAtCap'
$runAt = [datetime]::Parse('2026-09-28T18:00:00')
if ($runAt -le (Get-Date)) { $runAt = (Get-Date).AddHours(1) }

Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

$action = New-ScheduledTaskAction -Execute $cmd
$trigger = New-ScheduledTaskTrigger -Once -At $runAt
$principal = New-ScheduledTaskPrincipal -UserId 'SYSTEM' -LogonType ServiceAccount -RunLevel Highest
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Principal $principal -Settings $settings -Force | Out-Null

Write-Output "Scheduled $taskName at $($runAt.ToString('o')) -> $cmd"
Get-ScheduledTask -TaskName $taskName | Get-ScheduledTaskInfo | Format-List TaskName,NextRunTime,LastTaskResult
