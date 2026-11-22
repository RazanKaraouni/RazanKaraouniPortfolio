/* Security helpers, loaded first on every page. */

/* 1. Send visitors to HTTPS if the page was opened over plain HTTP.
      (GitHub Pages also does this when "Enforce HTTPS" is ticked; this is a second safety net.) */
(function () {
  var host = location.hostname;
  var local = host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host === '';
  if (location.protocol === 'http:' && !local) {
    location.replace('https://' + location.host + location.pathname + location.search + location.hash);
  }
})();

/* 2. Do not let other sites show this page inside a frame (clickjacking).
      Static hosts such as GitHub Pages cannot send X-Frame-Options, so the page checks itself. */
(function () {
  if (window.top !== window.self) {
    try { window.top.location = window.self.location.href; }
    catch (e) { document.documentElement.hidden = true; }
  }
})();
