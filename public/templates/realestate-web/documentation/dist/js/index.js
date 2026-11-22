"use strict";
(() => {
    const section = document.querySelectorAll("section.content");
    const links = document.querySelectorAll("aside a");
    const installation = document.getElementById("installation-button");
    const installationItems = document.getElementById("installation-items");
    const installationContent = document.getElementById("installation");
    // show installation items
    installation.addEventListener("click", (e) => {
        e.stopPropagation();
        if (installationItems.classList.contains("hidden")) {
            installationItems.classList.remove("hidden");
        }
        else {
            installationItems.classList.add("hidden");
        }
    });
    installationItems.addEventListener("click", (e) => {
        e.stopPropagation();
    });
    const observer = new IntersectionObserver((entires) => {
        entires.forEach((entry) => {
            const { isIntersecting } = entry;
            if (isIntersecting) {
                if (installationItems.classList.contains("hidden")) {
                    installationItems.classList.remove("hidden");
                }
            }
            else {
                if (!installationItems.classList.contains("hidden")) {
                    installationItems.classList.add("hidden");
                }
            }
        });
    });
    observer.observe(installationContent);
    window.addEventListener("scroll", (e) => {
        section.forEach((el) => {
            let top = window.scrollY;
            let offset = el.offsetTop;
            let height = el.offsetHeight;
            let id = el.getAttribute("id");
            if (top >= offset && top < offset + height) {
                links.forEach((a) => {
                    a.classList.remove("scroll-active");
                    const href = a.getAttribute("href");
                    if (href === `#${id}`) {
                        a.classList.add("scroll-active");
                    }
                });
            }
            // const article = el.querySelector("article");
            // if (article) {
            //    const h2Tags = article.querySelectorAll(
            //       "h2.sub-menu-content",
            //    ) as NodeListOf<HTMLHeadingElement>;
            //    h2Tags.forEach((h2) => {
            //       const offset2 = h2.offsetTop;
            //       const height2 = h2.offsetHeight;
            //       const id2 = h2.getAttribute("id");
            //       // Assuming "top" is the current scroll position of the page or container
            //       if (top >= offset2 && top < offset2 + height2) {
            //          links.forEach((a) => {
            //             const href2 = a.getAttribute("href");
            //             // Remove active class from all links
            //             links.forEach((link) => {
            //                link.classList.remove("scroll-active-sub");
            //             });
            //             // Add active class to the matching link
            //             if (href2 === `#${id2}`) {
            //                a.classList.add("scroll-active-sub");
            //             }
            //          });
            //       }
            //    });
            // }
        });
    });
})();
