/**
 * On desktop, rewrite wa.me / api.whatsapp.com links to WhatsApp Web
 * so Windows does not try the whatsapp:// protocol (needs Desktop app).
 * Mobile keeps wa.me so the native app still opens.
 */
(function () {
  var ua = navigator.userAgent || "";
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  if (isMobile) return;

  function toWebWhatsApp(href) {
    try {
      var u = new URL(href, window.location.origin);
      var host = u.hostname.replace(/^www\./, "");
      var phone = "";
      var text = u.searchParams.get("text") || "";

      if (host === "wa.me") {
        phone = u.pathname.replace(/^\//, "").split("/")[0];
      } else if (host === "api.whatsapp.com" && u.pathname.indexOf("/send") === 0) {
        phone = u.searchParams.get("phone") || "";
      } else {
        return null;
      }

      phone = String(phone).replace(/\D/g, "");
      if (!phone) return null;

      var next = "https://web.whatsapp.com/send?phone=" + phone;
      if (text) next += "&text=" + encodeURIComponent(text);
      return next;
    } catch (e) {
      return null;
    }
  }

  function rewrite(root) {
    var scope = root || document;
    var links = scope.querySelectorAll(
      'a[href*="wa.me/"], a[href*="api.whatsapp.com/send"]'
    );
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var next = toWebWhatsApp(a.getAttribute("href"));
      if (next) a.setAttribute("href", next);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      rewrite(document);
    });
  } else {
    rewrite(document);
  }
})();
