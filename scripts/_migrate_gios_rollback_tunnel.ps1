$ErrorActionPreference = 'Stop'
$bak = Get-ChildItem 'C:\Users\NAS GIOS\.cloudflared\config.yml.bak-before-optima-cap-*' |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1
if (-not $bak) { throw 'no backup found' }
Write-Output ("Restoring " + $bak.FullName)
Copy-Item $bak.FullName 'C:\Users\NAS GIOS\.cloudflared\config.yml' -Force
& 'C:\cloudflared\cloudflared.exe' tunnel --config 'C:\Users\NAS GIOS\.cloudflared\config.yml' ingress validate
Restart-Service Cloudflared -Force
Start-Sleep -Seconds 5
curl.exe -sS -o NUL -w "local8088=%{http_code}`n" --max-time 8 http://127.0.0.1:8088/
Write-Output '=== services in restored config ==='
Select-String -Path 'C:\Users\NAS GIOS\.cloudflared\config.yml' -Pattern 'service:' |
  ForEach-Object { $_.Line.Trim() } | Select-Object -First 20
Write-Output 'Done rollback'
