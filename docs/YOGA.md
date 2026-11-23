# Yoga product — bukan di repo ini

Landing `/optima-yoga/` dan aplikasi `yoga.optimadigitalselaras.com` hidup di:

**https://github.com/YuliusOngky/kelas-yoga**

- `landing/` ? nginx path `/optima-yoga/`
- Next.js app ? CAP `C:\deploy\sanctuary-yoga` (PM2 `sanctuary-yoga`)

Repo website ini hanya menautkan kartu produk ke URL tersebut.
Deploy marketing (`scripts/deploy-optima-web.ps1`) menyalin landing dari clone `kelas-yoga`
(atau `KELAS_YOGA_ROOT`).
