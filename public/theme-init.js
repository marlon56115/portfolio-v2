// Se ejecuta en <head> antes de pintar: marca que hay JS, aplica el tema y la tina guardados,
// decide si hay movimiento (prefers-reduced-motion) y si toca la intro (solo la primera visita).
(function () {
  var d = document.documentElement;
  d.classList.add('js');
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) d.classList.add('motion');
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') d.setAttribute('data-theme', t);
    if (localStorage.getItem('vat') === '2') d.setAttribute('data-vat', '2');
    if (!reduced && !localStorage.getItem('intro')) {
      d.classList.add('intro-on');
      localStorage.setItem('intro', '1');
    }
  } catch (e) {}
})();
