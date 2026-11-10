// Header: sólido al dejar el tope, se esconde al bajar y vuelve al subir.
// También la barra de progreso de lectura (puntadas) y la hora en vivo de El Salvador.
import { timeZone } from '../../i18n/contact';

export function initHud(): void {
  const hud = document.querySelector<HTMLElement>('[data-hud]');
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  if (!hud) return;
  let last = window.scrollY;
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    hud.classList.toggle('is-solid', y > 24);
    if (Math.abs(y - last) > 6) {
      hud.classList.toggle('is-hidden', y > last && y > 240 && !hud.contains(document.activeElement));
      last = y;
    }
    if (bar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, y / max) : 0;
      bar.style.clipPath = `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0)`;
    }
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

export function initClock(): void {
  const el = document.querySelector<HTMLTimeElement>('[data-clock]');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false });
  const tick = () => {
    const now = new Date();
    const text = fmt.format(now);
    if (el.textContent !== text) el.textContent = text;
    el.dateTime = now.toISOString();
  };
  tick();
  // Alinear con el cambio de minuto y pausar con la pestaña oculta.
  let timer = 0;
  const schedule = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      tick();
      schedule();
    }, 60000 - (Date.now() % 60000) + 50);
  };
  schedule();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) window.clearTimeout(timer);
    else {
      tick();
      schedule();
    }
  });
}
