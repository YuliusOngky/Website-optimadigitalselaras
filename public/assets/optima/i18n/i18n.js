/**
 * Optima bilingual runtime
 * - Default: Indonesian (id)
 * - Persists choice in localStorage
 * - Uses data-i18n / data-i18n-attr / data-i18n-title / data-i18n-aria-label / data-i18n-placeholder
 */
(function (global) {
  var STORAGE_KEY = "optima_lang";
  var DEFAULT_LANG = "id";
  var SUPPORTED = { id: true, en: true };

  function getDict(lang) {
    var all = global.OPTIMA_I18N_DICT || {};
    return all[lang] || all.id || {};
  }

  function readStoredLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED[stored]) return stored;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function writeStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function setTextPreservingChildren(el, text) {
    // Prefer updating a dedicated text node / span while keeping icons & arrows
    var marked = el.querySelector("[data-i18n-text]");
    if (marked) {
      marked.textContent = text;
      return;
    }

    var childElements = [];
    for (var i = 0; i < el.childNodes.length; i++) {
      var node = el.childNodes[i];
      if (node.nodeType === 1) childElements.push(node);
    }

    // Simple text-only element
    if (childElements.length === 0) {
      el.textContent = text;
      return;
    }

    // Replace first significant text node; keep element children (svg, arrows)
    var replaced = false;
    for (var j = 0; j < el.childNodes.length; j++) {
      var n = el.childNodes[j];
      if (n.nodeType === 3 && n.textContent.replace(/\s+/g, "").length) {
        n.textContent = (n.textContent.match(/^\s*/) || [""])[0] + text + (n.textContent.match(/\s*$/) || [""])[0];
        replaced = true;
        break;
      }
    }
    if (!replaced) {
      var span = document.createElement("span");
      span.setAttribute("data-i18n-text", "");
      span.textContent = text;
      el.insertBefore(span, el.firstChild);
    }
  }

  function applyToElement(el, dict) {
    var key = el.getAttribute("data-i18n");
    if (key && dict[key] != null) {
      // Magnetic headlines are letter-split; replace plain text, then listeners re-split.
      if (el.classList.contains("mag-text") || el.hasAttribute("data-i18n-mag")) {
        el.textContent = dict[key];
      } else {
        setTextPreservingChildren(el, dict[key]);
      }
    }

    var attrMap = el.getAttribute("data-i18n-attr");
    if (attrMap) {
      // format: title:meta.homeTitle;aria-label:nav.openMenu
      attrMap.split(";").forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length < 2) return;
        var attr = parts[0].trim();
        var aKey = parts.slice(1).join(":").trim();
        if (attr && dict[aKey] != null) el.setAttribute(attr, dict[aKey]);
      });
    }

    var titleKey = el.getAttribute("data-i18n-title");
    if (titleKey && dict[titleKey] != null) el.setAttribute("title", dict[titleKey]);

    var ariaKey = el.getAttribute("data-i18n-aria-label");
    if (ariaKey && dict[ariaKey] != null) el.setAttribute("aria-label", dict[ariaKey]);

    var phKey = el.getAttribute("data-i18n-placeholder");
    if (phKey && dict[phKey] != null) el.setAttribute("placeholder", dict[phKey]);
  }

  function applyDocumentMeta(dict) {
    var titleEl = document.querySelector("title[data-i18n]");
    if (titleEl) {
      var tKey = titleEl.getAttribute("data-i18n");
      if (tKey && dict[tKey] != null) document.title = dict[tKey];
    }
  }

  function syncToggle(lang) {
    document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang-set") === lang;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function applyLanguage(lang, options) {
    if (!SUPPORTED[lang]) lang = DEFAULT_LANG;
    var dict = getDict(lang);
    var opts = options || {};

    document.documentElement.setAttribute("lang", lang === "id" ? "id" : "en");
    document.documentElement.setAttribute("data-lang", lang);

    applyDocumentMeta(dict);

    document.querySelectorAll("[data-i18n], [data-i18n-attr], [data-i18n-title], [data-i18n-aria-label], [data-i18n-placeholder]").forEach(function (el) {
      applyToElement(el, dict);
    });

    syncToggle(lang);

    if (!opts.skipStore) writeStoredLang(lang);

    try {
      global.dispatchEvent(new CustomEvent("optima:langchange", { detail: { lang: lang } }));
    } catch (e) {
      // IE-safe fallback not required for this site
    }

    return lang;
  }

  function bindToggles() {
    document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      if (btn.__optimaLangBound) return;
      btn.__optimaLangBound = true;
      btn.addEventListener("click", function () {
        var next = btn.getAttribute("data-lang-set");
        if (next) applyLanguage(next);
      });
    });
  }

  function ensureToggleMarkup() {
    // If a page already has .lang-toggle, skip injection
    if (document.querySelector(".lang-toggle")) return;

    var navWrap = document.querySelector("#nav .wrap");
    if (!navWrap) return;

    var host = navWrap.querySelector(".nav-cta");
    if (!host) {
      host = document.createElement("div");
      host.className = "nav-cta";
      navWrap.appendChild(host);
    }

    var toggle = document.createElement("div");
    toggle.className = "lang-toggle";
    toggle.setAttribute("role", "group");
    toggle.setAttribute("aria-label", "Language");
    toggle.innerHTML =
      '<button type="button" data-lang-set="id" aria-pressed="false">ID</button>' +
      '<button type="button" data-lang-set="en" aria-pressed="false">EN</button>';
    host.appendChild(toggle);
  }

  function init() {
    ensureToggleMarkup();
    bindToggles();
    var lang = readStoredLang();
    applyLanguage(lang, { skipStore: false });

    // Also place a toggle in mobile menu if present
    var mobile = document.getElementById("mobileMenu");
    if (mobile && !mobile.querySelector(".lang-toggle")) {
      var row = document.createElement("div");
      row.className = "lang-toggle";
      row.style.marginTop = "18px";
      row.setAttribute("role", "group");
      row.setAttribute("aria-label", "Language");
      row.innerHTML =
        '<button type="button" data-lang-set="id" aria-pressed="false">ID</button>' +
        '<button type="button" data-lang-set="en" aria-pressed="false">EN</button>';
      mobile.appendChild(row);
      bindToggles();
      syncToggle(lang);
    }
  }

  global.OptimaI18n = {
    DEFAULT_LANG: DEFAULT_LANG,
    getLang: readStoredLang,
    setLang: applyLanguage,
    apply: applyLanguage,
    t: function (key, lang) {
      var dict = getDict(lang || readStoredLang());
      return dict[key] != null ? dict[key] : key;
    },
    init: init
  };

  // At end-of-body inclusion, init immediately so copy is ready before mag-text / other UI scripts.
  if (document.body) {
    init();
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(typeof window !== "undefined" ? window : this);
