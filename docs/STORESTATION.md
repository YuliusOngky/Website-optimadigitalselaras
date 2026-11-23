# OptimaStore Station — bukan di repo ini

Landing `/products/optima-store/` dan app `/optima-store` hidup di:

**https://github.com/YuliusOngky/OptimaStoreStation**

- `landing/` ? nginx `products/optima-store/` (redirect ke marketing `/optima-store`)
- Next.js marketing + demo app ? CAP Docker `optimastorestation-web-1` (:3100), path `/optima-store`

Deploy marketing menyalin landing dari clone `OptimaStoreStation` (`OPTIMASTORE_ROOT`).
