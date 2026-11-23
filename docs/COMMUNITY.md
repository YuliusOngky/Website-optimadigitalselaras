# Community eCommerce — bukan di repo ini

Landing `/products/community-ecommerce/` dan app `ecommerce.optimadigitalselaras.com` hidup di:

**https://github.com/YuliusOngky/optima-store** (branch **`main`**)

- `landing/` → nginx `products/community-ecommerce/`
- Next.js app → CAP Docker `optima-store` (:3035)
- API → **https://github.com/YuliusOngky/optima-api** (`api.optimadigitalselaras.com` :3036)

Deploy marketing menyalin landing dari clone `optima-store` (`OPTIMA_STORE_ROOT`).
