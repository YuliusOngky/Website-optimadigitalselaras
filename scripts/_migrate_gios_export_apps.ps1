$ErrorActionPreference = 'Stop'
$OutDir = 'D:\optima-migrate'
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

Write-Output 'Saving Store image...'
docker save optimastorestation-web -o "$OutDir\optimastorestation-web.tar"
Write-Output 'Saving optima-store image...'
docker save optima-store:latest -o "$OutDir\optima-store.tar"
Write-Output 'Saving PosPro images...'
docker save gios-web -o "$OutDir\gios-web.tar"
docker save mariadb:11.8 -o "$OutDir\mariadb-11.8.tar"

$Helper = 'postgres:16-alpine'
Write-Output "Exporting Store volumes via $Helper..."
docker run --rm -v optimastorestation_oss_data:/data -v "${OutDir}:/backup" $Helper sh -c "cd /data && tar czf /backup/oss_data.tar.gz ."
docker run --rm -v optimastorestation_oss_uploads:/data -v "${OutDir}:/backup" $Helper sh -c "cd /data && tar czf /backup/oss_uploads.tar.gz ."

Write-Output 'Exporting PosPro volumes...'
docker run --rm -v gios_pospro_db:/data -v "${OutDir}:/backup" $Helper sh -c "cd /data && tar czf /backup/pospro_db.tar.gz ."
docker run --rm -v gios_pospro_storage:/data -v "${OutDir}:/backup" $Helper sh -c "cd /data && tar czf /backup/pospro_storage.tar.gz ."
# anonymous volume for gios-web html if needed - skip full html volume (in image)

Write-Output '=== SIZES ==='
Get-ChildItem $OutDir | Format-Table Name, @{N='MB';E={[math]::Round($_.Length/1MB,1)}}
