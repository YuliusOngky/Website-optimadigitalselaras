(function () {
   const h2CitiesData = [
      {
         id: 1,
         title: "Luxury Family Home",
         price: "$5,200",
         address: "32 Greene Ave",
         time: "Mon, Dec 10 - Tue, Dec 13",
         uri: "property.html",
         image: "assets/images/image-78.png",
         rating: "3.5",
         dataSet: "house",
      },
      {
         id: 2,
         title: "Gorgeous Villa Bay",
         price: "$2,300",
         address: "32 Greene Ave",
         time: "Mon, Dec 10 - Tue, Dec 13",
         uri: "property.html",
         image: "assets/images/image-79.png",
         rating: "4.2",
         dataSet: "village",
      },
      {
         id: 3,
         title: "Spacious Home",
         price: "$6,700",
         address: "32 Greene Ave",
         time: "Mon, Dec 10 - Tue, Dec 13",
         uri: "property.html",
         image: "assets/images/image-80.png",
         rating: "5.0",
         dataSet: "office",
      },
      {
         id: 4,
         title: "House Hollywood",
         price: "$1,500",
         address: "32 Greene Ave",
         time: "Mon, Dec 10 - Tue, Dec 13",
         uri: "property.html",
         image: "assets/images/image-81.png",
         rating: "4.0",
         dataSet: "apartment",
      },
      {
         id: 5,
         title: "Selway Apartments",
         price: "$3,900",
         address: "32 Greene Ave",
         time: "Mon, Dec 10 - Tue, Dec 13",
         uri: "property.html",
         image: "assets/images/image-82.png",
         rating: "4.7",
         dataSet: "house",
      },
      {
         id: 6,
         title: "Comfortable Green",
         price: "$3,900",
         address: "32 Greene Ave",
         time: "Mon, Dec 10 - Tue, Dec 13",
         uri: "property.html",
         image: "assets/images/image-83.png",
         rating: "2.9",
         dataSet: "house",
      },
      {
         id: 7,
         title: "Luxury Family Home",
         price: "$8,900",
         address: "32 Greene Ave",
         time: "Mon, Dec 10 - Tue, Dec 13",
         uri: "property.html",
         image: "assets/images/image-84.png",
         rating: "4.4",
         dataSet: "house",
      },
      {
         id: 8,
         title: "Luxury Office Decorated",
         price: "$10,000",
         address: "32 Greene Ave",
         time: "Mon, Dec 10 - Tue, Dec 13",
         uri: "property.html",
         image: "assets/images/image-85.png",
         rating: "4.6",
         dataSet: "office",
      },
   ];

   const h1Cta = document.getElementById("h1-cta") as HTMLDivElement | null;
   const h1Award = document.getElementById(
      "h1-award",
   ) as HTMLSpanElement | null;
   const h1Property = document.getElementById(
      "h1-property",
   ) as HTMLSpanElement | null;
   const h1Clients = document.getElementById(
      "h1-clients",
   ) as HTMLSpanElement | null;
   // homepage 4
   const h4Counter = document.getElementById(
      "h4-counter",
   ) as HTMLDivElement | null;
   const h4TeamMembers = document.getElementById(
      "h4-team-members",
   ) as HTMLSpanElement | null;
   const h4Clients = document.getElementById(
      "h4-client-reviews",
   ) as HTMLSpanElement | null;
   const h4Projects = document.getElementById(
      "h4-projects-com",
   ) as HTMLSpanElement | null;
   const h4WinAward = document.getElementById(
      "h4-win-awards",
   ) as HTMLDivElement | null;
   // Counter 5
   const h5Counter = document.getElementById(
      "h5-counter",
   ) as HTMLDivElement | null;
   const h5Awards = document.getElementById(
      "h5-award-wins",
   ) as HTMLSpanElement | null;
   const h5Properties = document.getElementById(
      "h5-properties",
   ) as HTMLSpanElement | null;
   const h5Customer = document.getElementById(
      "h5-customers",
   ) as HTMLSpanElement | null;
   // Counter 2
   const h2Award = document.getElementById(
      "h2-award",
   ) as HTMLSpanElement | null;
   const h2Property = document.getElementById(
      "h2-property",
   ) as HTMLSpanElement | null;
   const h2Customer = document.getElementById(
      "h2-customer",
   ) as HTMLSpanElement | null;
   // Agent page 2
   const agentButtons = document.querySelectorAll(
      ".h2-agent-hoverable-btn",
   ) as NodeListOf<HTMLButtonElement>;
   const socialMediaButtons = document.querySelectorAll(
      ".h2-agent-social-icons",
   ) as NodeListOf<HTMLDivElement>;
   const galleryImages = document.querySelectorAll(
      ".h3-gallery-card",
   ) as NodeListOf<HTMLImageElement>;
   const homepage1Search = document.querySelectorAll(
      ".h1-search",
   ) as NodeListOf<HTMLDivElement>;
   const homepage1SearchType = document.getElementById(
      "h1-search-type",
   ) as HTMLInputElement;
   const mapViewTypeToggle = document.querySelectorAll(
      ".map-view-type-toggle",
   ) as NodeListOf<HTMLButtonElement>;
   const mapViewType = document.getElementById(
      "map-view-type",
   ) as HTMLInputElement;
   const homepage1SearchSm = document.querySelectorAll(
      ".h1-search-sm",
   ) as NodeListOf<HTMLButtonElement>;
   const h2CitiesBtn = document.querySelectorAll(
      ".h2-cities-btn",
   ) as NodeListOf<HTMLButtonElement>;
   const h2PropertiesByCities = document.getElementById(
      "h2-properties-by-cities",
   ) as HTMLDivElement;

   const close = `<svg class="svg-inline--fa fa-xmark text-lg text-[#777E90]" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg>`;
   const open =
      '<svg class="svg-inline--fa fa-plus text-lg text-[#777E90]" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"></path></svg>';

   // Counter 1
   const h1Observer = new IntersectionObserver(
      (entries) => {
         for (const entry of entries) {
            const intersecting = entry.isIntersecting;
            if (intersecting) {
               setTimeout(() => {
                  if (h1Award && h1Property && h1Clients) {
                     h1Award.innerHTML = "10";
                     h1Property.innerHTML = "18";
                     h1Clients.innerHTML = "23";
                  }
               }, 1000);
            }
         }
      },
      { threshold: 1 },
   );

   if (h1Cta) {
      h1Observer.observe(h1Cta);
   }

   // Counter 2
   setTimeout(() => {
      if (h2Award && h2Property && h2Customer) {
         h2Award.innerHTML = "30";
         h2Property.innerHTML = "8";
         h2Customer.innerHTML = "1";
      }
   }, 1000);

   // Counter 4
   const h2Observer = new IntersectionObserver(
      (entries) => {
         for (const entry of entries) {
            const intersection = entry.isIntersecting;
            if (intersection) {
               setTimeout(() => {
                  if (h4TeamMembers && h4Clients && h4Projects && h4WinAward) {
                     h4TeamMembers.innerHTML = "400";
                     h4Clients.innerHTML = "800";
                     h4Projects.innerHTML = "100";
                     h4WinAward.innerHTML = "40";
                  }
               }, 1000);
            }
         }
      },
      {
         threshold: 1,
      },
   );

   if (h4Counter) {
      h2Observer.observe(h4Counter);
   }

   // Counter 5
   const h5Observer = new IntersectionObserver(
      (entries) => {
         for (const entry of entries) {
            const intersection = entry.isIntersecting;
            if (intersection && h5Properties && h5Customer) {
               setTimeout(() => {
                  if (h5Awards) {
                     h5Awards.innerHTML = "50";
                     h5Properties.innerHTML = "18";
                     h5Customer.innerHTML = "23";
                  }
               }, 1000);
            }
         }
      },
      {
         threshold: 1,
      },
   );

   if (h5Counter) {
      h5Observer.observe(h5Counter);
   }

   // Agent page 2
   document.addEventListener("DOMContentLoaded", () => {
      agentButtons.forEach((button, buttonIndex) => {
         button.addEventListener("click", () => {
            const iconContainer = button.querySelector("svg")!;

            if (iconContainer.outerHTML === open) {
               iconContainer.outerHTML = close;
            } else {
               iconContainer.outerHTML = open;
            }

            socialMediaButtons.forEach((div, iconIndex) => {
               if (buttonIndex === iconIndex) {
                  div.classList.toggle("hidden");
               }
            });
         });
      });
   });

   // Homepage 1 search sm
   homepage1SearchSm.forEach((button) => {
      button.addEventListener("click", () => {
         homepage1SearchSm.forEach((b) => {
            b.classList.remove("active");
         });
         button.classList.add("active");
      });
   });

   // Homepage 1 search
   homepage1Search.forEach((search) => {
      search.addEventListener("click", () => {
         homepage1Search.forEach((s) => {
            s.classList.remove("active");
         });

         const value = search.getAttribute("data-type");

         search.classList.add("active");
         homepage1SearchType.value = value ?? "";
      });
   });

   // Homepage 1 search
   mapViewTypeToggle.forEach((button) => {
      button.addEventListener("click", () => {
         mapViewTypeToggle.forEach((b) => {
            b.classList.remove("active2");
         });

         const value = button.getAttribute("data-type");

         button.classList.add("active2");
         mapViewType.value = value ?? "";
      });
   });

   h2CitiesBtn.forEach((button) => {
      button.addEventListener("click", () => {
         const dataItem = button.getAttribute("data-item");

         let sortedData: typeof h2CitiesData;

         if (dataItem === "all") {
            sortedData = h2CitiesData;
         } else {
            sortedData = h2CitiesData.filter(
               (city) => city.dataSet === dataItem,
            );
         }

         const children = sortedData.map(
            (city) => `
            <div data-item="${city.dataSet}" data-aos="zoom-in" class="h2-property-type-card">
                  <div class="h2-property-type-img">
                     <img
                        src="${city.image}"
                        alt="${city.title}"
                     />
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
                           <i
                              class="fa-solid fa-star text-base text-[#FAC751]"
                           ></i>
                           <span>${city.rating}</span>
                        </div>
                     </div>
                  </div>
               </div>
         `,
         );

         h2PropertiesByCities.innerHTML = children.join("");

         h2CitiesBtn.forEach((b) => {
            b.classList.remove("btn-primary");
            button.classList.add("btn-outline");
         });

         button.classList.add("btn-primary");
      });
   });

   const children = h2CitiesData.map(
      (city) => `
         <div data-item="${city.dataSet}" data-aos="zoom-in" class="h2-property-type-card">
               <div class="h2-property-type-img">
                  <img
                     src="${city.image}"
                     alt="${city.title}"
                  />
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
                        <i
                           class="fa-solid fa-star text-base text-[#FAC751]"
                        ></i>
                        <span>${city.rating}</span>
                     </div>
                  </div>
               </div>
            </div>
      `,
   );

   h2PropertiesByCities?.insertAdjacentHTML("beforeend", children.join(""));
})();
