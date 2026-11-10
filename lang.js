(function () {
  var supported = ["en", "ru", "es", "fr"];
  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && supported.indexOf(q) >= 0) return q;
    var n = (navigator.language || "en").slice(0, 2).toLowerCase();
    return supported.indexOf(n) >= 0 ? n : "en";
  }
  function apply(l) {
    document.documentElement.lang = l;
    document.querySelectorAll("article[lang], .links[lang]").forEach(function (el) {
      el.classList.toggle("show", el.getAttribute("lang") === l);
    });
    document.querySelectorAll("nav.langs button").forEach(function (b) {
      b.classList.toggle("on", b.dataset.l === l);
    });
    var t = document.querySelector("article[lang='" + l + "'] h1");
    if (t) document.title = t.textContent + " · Minusplus";
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("nav.langs button").forEach(function (b) {
      b.addEventListener("click", function () {
        var u = new URL(location.href); u.searchParams.set("lang", b.dataset.l);
        history.replaceState(null, "", u); apply(b.dataset.l);
      });
    });
    apply(pick());
  });
})();
