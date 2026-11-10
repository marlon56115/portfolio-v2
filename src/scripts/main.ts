// Arranque de la página. Lo esencial (tema, menú, plegables, tejido) va en este bundle;
// GSAP + Lenis y los efectos de puntero se cargan aparte y solo si hay movimiento.
import { hydrateSince } from '../lib/time';
import { reduced } from './core/env';
import { initHud, initClock } from './core/hud';
import { initLang, initMenu } from './core/menu';
import { initTheme } from './core/theme';
import { initCopy, initFilters, initFolds } from './core/ui';
import { initKonami } from './fx/konami';
import { initPixelName } from './fx/pixelname';
import { initPortrait } from './fx/portrait';
import { initText } from './fx/text';
import { initWeave } from './fx/weave';

initTheme();
initMenu();
initLang();
initHud();
initClock();
initFolds();
initFilters();
initCopy();
hydrateSince();
initWeave();
initPortrait();
initPixelName();
initText();
initKonami();

if (reduced) {
  // Sin scroll suave: los enlaces del menú saltan directo.
  document.addEventListener('nav:go', (e) => {
    const id = (e as CustomEvent<string>).detail;
    document.querySelector(id)?.scrollIntoView();
  });
} else {
  import('./motion').then((m) => m.initMotion());
}
