"use strict";
(function () {
    var h2CitiesData = [
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
    var h1Cta = document.getElementById("h1-cta");
    var h1Award = document.getElementById("h1-award");
    var h1Property = document.getElementById("h1-property");
    var h1Clients = document.getElementById("h1-clients");
    // homepage 4
    var h4Counter = document.getElementById("h4-counter");
    var h4TeamMembers = document.getElementById("h4-team-members");
    var h4Clients = document.getElementById("h4-client-reviews");
    var h4Projects = document.getElementById("h4-projects-com");
    var h4WinAward = document.getElementById("h4-win-awards");
    // Counter 5
    var h5Counter = document.getElementById("h5-counter");
    var h5Awards = document.getElementById("h5-award-wins");
    var h5Properties = document.getElementById("h5-properties");
    var h5Customer = document.getElementById("h5-customers");
    // Counter 2
    var h2Award = document.getElementById("h2-award");
    var h2Property = document.getElementById("h2-property");
    var h2Customer = document.getElementById("h2-customer");
    // Agent page 2
    var agentButtons = document.querySelectorAll(".h2-agent-hoverable-btn");
    var socialMediaButtons = document.querySelectorAll(".h2-agent-social-icons");
    var galleryImages = document.querySelectorAll(".h3-gallery-card");
    var homepage1Search = document.querySelectorAll(".h1-search");
    var homepage1SearchType = document.getElementById("h1-search-type");
    var mapViewTypeToggle = document.querySelectorAll(".map-view-type-toggle");
    var mapViewType = document.getElementById("map-view-type");
    var homepage1SearchSm = document.querySelectorAll(".h1-search-sm");
    var h2CitiesBtn = document.querySelectorAll(".h2-cities-btn");
    var h2PropertiesByCities = document.getElementById("h2-properties-by-cities");
    var close = "<svg class=\"svg-inline--fa fa-xmark text-lg text-[#777E90]\" aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"xmark\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\" data-fa-i2svg=\"\"><path fill=\"currentColor\" d=\"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z\"></path></svg>";
    var open = '<svg class="svg-inline--fa fa-plus text-lg text-[#777E90]" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"></path></svg>';
    // Counter 1
    var h1Observer = new IntersectionObserver(function (entries) {
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var entry = entries_1[_i];
            var intersecting = entry.isIntersecting;
            if (intersecting) {
                setTimeout(function () {
                    if (h1Award && h1Property && h1Clients) {
                        h1Award.innerHTML = "10";
                        h1Property.innerHTML = "18";
                        h1Clients.innerHTML = "23";
                    }
                }, 1000);
            }
        }
    }, { threshold: 1 });
    if (h1Cta) {
        h1Observer.observe(h1Cta);
    }
    // Counter 2
    setTimeout(function () {
        if (h2Award && h2Property && h2Customer) {
            h2Award.innerHTML = "30";
            h2Property.innerHTML = "8";
            h2Customer.innerHTML = "1";
        }
    }, 1000);
    // Counter 4
    var h2Observer = new IntersectionObserver(function (entries) {
        for (var _i = 0, entries_2 = entries; _i < entries_2.length; _i++) {
            var entry = entries_2[_i];
            var intersection = entry.isIntersecting;
            if (intersection) {
                setTimeout(function () {
                    if (h4TeamMembers && h4Clients && h4Projects && h4WinAward) {
                        h4TeamMembers.innerHTML = "400";
                        h4Clients.innerHTML = "800";
                        h4Projects.innerHTML = "100";
                        h4WinAward.innerHTML = "40";
                    }
                }, 1000);
            }
        }
    }, {
        threshold: 1,
    });
    if (h4Counter) {
        h2Observer.observe(h4Counter);
    }
    // Counter 5
    var h5Observer = new IntersectionObserver(function (entries) {
        for (var _i = 0, entries_3 = entries; _i < entries_3.length; _i++) {
            var entry = entries_3[_i];
            var intersection = entry.isIntersecting;
            if (intersection && h5Properties && h5Customer) {
                setTimeout(function () {
                    if (h5Awards) {
                        h5Awards.innerHTML = "50";
                        h5Properties.innerHTML = "18";
                        h5Customer.innerHTML = "23";
                    }
                }, 1000);
            }
        }
    }, {
        threshold: 1,
    });
    if (h5Counter) {
        h5Observer.observe(h5Counter);
    }
    // Agent page 2
    document.addEventListener("DOMContentLoaded", function () {
        agentButtons.forEach(function (button, buttonIndex) {
            button.addEventListener("click", function () {
                var iconContainer = button.querySelector("svg");
                if (iconContainer.outerHTML === open) {
                    iconContainer.outerHTML = close;
                }
                else {
                    iconContainer.outerHTML = open;
                }
                socialMediaButtons.forEach(function (div, iconIndex) {
                    if (buttonIndex === iconIndex) {
                        div.classList.toggle("hidden");
                    }
                });
            });
        });
    });
    // Homepage 1 search sm
    homepage1SearchSm.forEach(function (button) {
        button.addEventListener("click", function () {
            homepage1SearchSm.forEach(function (b) {
                b.classList.remove("active");
            });
            button.classList.add("active");
        });
    });
    // Homepage 1 search
    homepage1Search.forEach(function (search) {
        search.addEventListener("click", function () {
            homepage1Search.forEach(function (s) {
                s.classList.remove("active");
            });
            var value = search.getAttribute("data-type");
            search.classList.add("active");
            homepage1SearchType.value = value !== null && value !== void 0 ? value : "";
        });
    });
    // Homepage 1 search
    mapViewTypeToggle.forEach(function (button) {
        button.addEventListener("click", function () {
            mapViewTypeToggle.forEach(function (b) {
                b.classList.remove("active2");
            });
            var value = button.getAttribute("data-type");
            button.classList.add("active2");
            mapViewType.value = value !== null && value !== void 0 ? value : "";
        });
    });
    h2CitiesBtn.forEach(function (button) {
        button.addEventListener("click", function () {
            var dataItem = button.getAttribute("data-item");
            var sortedData;
            if (dataItem === "all") {
                sortedData = h2CitiesData;
            }
            else {
                sortedData = h2CitiesData.filter(function (city) { return city.dataSet === dataItem; });
            }
            var children = sortedData.map(function (city) { return "\n            <div data-item=\"".concat(city.dataSet, "\" data-aos=\"zoom-in\" class=\"h2-property-type-card\">\n                  <div class=\"h2-property-type-img\">\n                     <img\n                        src=\"").concat(city.image, "\"\n                        alt=\"").concat(city.title, "\"\n                     />\n                  </div>\n                  <div class=\"h2-property-type-body\">\n                     <div class=\"h2-property-type-header\">\n                        <div class=\"pth-l\">\n                           <a href=\"").concat(city.uri, "\">").concat(city.title, "</a>\n                           <p>").concat(city.address, "</p>\n                        </div>\n                        <p class=\"pth-r\">").concat(city.price, "</p>\n                     </div>\n\n                     <hr class=\"my-[14px] h-px\" />\n\n                     <div class=\"h2-property-type-footer\">\n                        <p>").concat(city.time, "</p>\n                        <div>\n                           <i\n                              class=\"fa-solid fa-star text-base text-[#FAC751]\"\n                           ></i>\n                           <span>").concat(city.rating, "</span>\n                        </div>\n                     </div>\n                  </div>\n               </div>\n         "); });
            h2PropertiesByCities.innerHTML = children.join("");
            h2CitiesBtn.forEach(function (b) {
                b.classList.remove("btn-primary");
                button.classList.add("btn-outline");
            });
            button.classList.add("btn-primary");
        });
    });
    var children = h2CitiesData.map(function (city) { return "\n         <div data-item=\"".concat(city.dataSet, "\" data-aos=\"zoom-in\" class=\"h2-property-type-card\">\n               <div class=\"h2-property-type-img\">\n                  <img\n                     src=\"").concat(city.image, "\"\n                     alt=\"").concat(city.title, "\"\n                  />\n               </div>\n               <div class=\"h2-property-type-body\">\n                  <div class=\"h2-property-type-header\">\n                     <div class=\"pth-l\">\n                        <a href=\"").concat(city.uri, "\">").concat(city.title, "</a>\n                        <p>").concat(city.address, "</p>\n                     </div>\n                     <p class=\"pth-r\">").concat(city.price, "</p>\n                  </div>\n\n                  <hr class=\"my-[14px] h-px\" />\n\n                  <div class=\"h2-property-type-footer\">\n                     <p>").concat(city.time, "</p>\n                     <div>\n                        <i\n                           class=\"fa-solid fa-star text-base text-[#FAC751]\"\n                        ></i>\n                        <span>").concat(city.rating, "</span>\n                     </div>\n                  </div>\n               </div>\n            </div>\n      "); });
    h2PropertiesByCities === null || h2PropertiesByCities === void 0 ? void 0 : h2PropertiesByCities.insertAdjacentHTML("beforeend", children.join(""));
})();
