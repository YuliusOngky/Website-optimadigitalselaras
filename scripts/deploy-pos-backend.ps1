# Deploy AAA POS V2 backend ke NAS GIOS (192.168.1.20)
# Backend berjalan di port 4000, diekspos via Cloudflare tunnel sebagai pos-api.optimadigitalselaras.com
#
# Prasyarat di NAS:
#   - Node.js 18+ terinstall
#   - PostgreSQL berjalan dengan database aaa_pos_v2
#   - SSH key sudah di-setup ke NAS
#
# Jalankan dari repo F:\AAA_POS\AAA_POS_V2\:
#   .\scripts\deploy-pos-backend.ps1

$ErrorActionPreference = "Stop"

$BackendSrc = "F:\AAA_POS\AAA_POS_V2\backend"
$HostName = if ($env:DEPLOY_HOST) { $env:DEPLOY_HOST } else { "192.168.1.20" }
$UserName = if ($env:DEPLOY_USER) { $env:DEPLOY_USER } else { "NAS GIOS" }
$Identity = $env:DEPLOY_KEY
$UseAlias = (-not $env:DEPLOY_HOST -and -not $env:DEPLOY_USER)
$SshTarget = if ($UseAlias) { "gios" } else { $HostName }
$RemoteDir = "C:\Services\aaa-pos-v2"

$SshArgs = @("-o", "BatchMode=yes", "-o", "ConnectTimeout=15")
if ($Identity) { $SshArgs += @("-i", $Identity, "-o", "IdentitiesOnly=yes") }
if (-not $UseAlias) { $SshArgs += @("-l", $UserName) }
$ScpArgs = @("-o", "BatchMode=yes")
if ($Identity) { $ScpArgs += @("-i", $Identity, "-o", "IdentitiesOnly=yes") }
if (-not $UseAlias) { $ScpArgs += @("-o", "User=$UserName") }

Write-Host "==> Deploying AAA POS V2 backend ke ${SshTarget}:$RemoteDir"

# Buat direktori di NAS
$Prep = "cmd /c `"if not exist `"$RemoteDir`" mkdir `"$RemoteDir`" & if not exist `"$RemoteDir\src`" mkdir `"$RemoteDir\src`""
& ssh @SshArgs $SshTarget $Prep
if ($LASTEXITCODE -ne 0) { throw "SSH mkdir gagal" }

# Copy package.json
& scp @ScpArgs "$BackendSrc\package.json" "${SshTarget}:${RemoteDir}/package.json"
if ($LASTEXITCODE -ne 0) { throw "scp package.json gagal" }

# Copy folder src
$SrcItems = Get-ChildItem -Path "$BackendSrc\src" -Force | ForEach-Object { $_.FullName }
& scp @ScpArgs -r @SrcItems "${SshTarget}:${RemoteDir}/src/"
if ($LASTEXITCODE -ne 0) { throw "scp src/ gagal" }

# Copy .env.example (bukan .env asli — user harus buat .env di NAS)
if (Test-Path "$BackendSrc\.env.example") {
  & scp @ScpArgs "$BackendSrc\.env.example" "${SshTarget}:${RemoteDir}/.env.example"
}

Write-Host "==> npm install di NAS..."
& ssh @SshArgs $SshTarget "cmd /c `"cd /d $RemoteDir && npm install --omit=dev`""
if ($LASTEXITCODE -ne 0) { throw "npm install gagal" }

Write-Host ""
Write-Host "==> SELESAI. Langkah selanjutnya di NAS:"
Write-Host "    1. Buat file .env di $RemoteDir\"
Write-Host "       DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/aaa_pos_v2"
Write-Host "       JWT_SECRET=rahasia-panjang-random"
Write-Host "       PORT=4000"
Write-Host "       NODE_ENV=production"
Write-Host "    2. Jalankan backend:"
Write-Host "       node C:\Services\aaa-pos-v2\src\index.js"
Write-Host "    3. (Opsional) Install PM2 agar auto-start:"
Write-Host "       npm install -g pm2"
Write-Host "       pm2 start C:\Services\aaa-pos-v2\src\index.js --name aaa-pos-v2"
Write-Host "       pm2 save && pm2 startup"
Write-Host ""
Write-Host "==> Backend akan live di: https://pos-api.optimadigitalselaras.com/api/v1"
Write-Host "    (setelah cloudflared config di-reload dan DNS pos-api.* ditambah di Cloudflare)"
