/* Mobile menu and copy-email button */
(function () {
  document.documentElement.classList.add('js');
  var header = document.querySelector('header.top');
  var btn = header && header.querySelector('.menu-toggle');
  if (!btn) return;
  function set(open) {
    header.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  btn.addEventListener('click', function () { set(!header.classList.contains('open')); });
  header.querySelectorAll('nav a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
})();

(function () {
  var b = document.getElementById('copy-email');
  if (!b) return;
  var t = 'razankaraouni25@gmail.com';
  function reset(ms) { setTimeout(function () { b.textContent = 'Copy email'; }, ms); }
  function done() { b.textContent = 'Email copied'; reset(2200); }
  function fallback() {
    /* Clipboard blocked: show the address inside the button, selected, so it can be copied by hand. */
    b.textContent = t;
    var r = document.createRange();
    r.selectNodeContents(b);
    var s = window.getSelection();
    s.removeAllRanges();
    s.addRange(r);
    reset(6000);
  }
  b.addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(done, fallback);
    } else { fallback(); }
  });
})();

/* View my certificates: show or hide the certificate images */
(function () {
  var btn = document.querySelector('.cert-toggle');
  var grid = document.getElementById('cert-grid');
  if (!btn || !grid) return;
  grid.hidden = true;
  btn.addEventListener('click', function () {
    var show = grid.hidden;
    grid.hidden = !show;
    btn.setAttribute('aria-expanded', show ? 'true' : 'false');
    btn.textContent = show ? 'Hide certificates' : 'View my certificates';
  });
})();
