## Display size visibility

```html
<!-- FIXME: must must be remove in production -->
<div class="fixed left-0 top-[80px]">
   <div class="text-lg text-red-500 sm:hidden">xs</div>
   <div class="hidden text-lg text-red-500 sm:block md:hidden">sm</div>
   <div class="hidden text-lg text-red-500 md:block lg:hidden">md</div>
   <div class="hidden text-lg text-red-500 lg:block xl:hidden">lg</div>
   <div class="hidden text-lg text-red-500 xl:block 2xl:hidden">xl</div>
   <div class="hidden text-lg text-red-500 2xl:block">2xl</div>
</div>
```

## Find by city card

```html
<div
   data-item="${city.dataSet}"
   data-aos="zoom-in"
   class="h2-property-type-card"
>
   <div class="h2-property-type-img">
      <img src="${city.image}" alt="${city.title}" />
   </div>
   <div class="h2-property-type-body">
      <div class="h2-property-type-header">
         <div class="pth-l">
            <a href="${city.uri}">${city.title}</a>
            <p>${city.address}</p>
         </div>
         <p class="pth-r">${city.price}</p>
      </div>

      <hr class="my-[14px] h-px" />

      <div class="h2-property-type-footer">
         <p>${city.time}</p>
         <div>
            <i class="fa-solid fa-star text-base text-[#FAC751]"></i>
            <span>${city.rating}</span>
         </div>
      </div>
   </div>
</div>
```
