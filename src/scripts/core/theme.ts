// Tema claro/oscuro (toggle "MODE LIGHT/DARK") y cambio con teñido (View Transitions).
import { reduced } from './env';

type Theme = 'light' | 'dark';
const root = document.documentElement;
const current = (): Theme => (root.dataset.theme === 'dark' ? 'dark' : 'light');

/** Aplica un cambio visual global; si el navegador puede, la página se tiñe de arriba hacia abajo. */
export function dyeSwap(change: () => void): void {
  const run = () => {
    change();
    document.dispatchEvent(new CustomEvent('themechange'));
  };
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (!reduced && typeof doc.startViewTransition === 'function') doc.startViewTransition(run);
  else run();
}

function paint(): void {
  const theme = current();
  document.querySelectorAll<HTMLElement>('[data-theme-label]').forEach((el) => {
    el.textContent = (theme === 'dark' ? el.dataset.dark : el.dataset.light) ?? theme;
  });
  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(theme === 'dark')));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0a0e16' : '#f4f5f7');
}

export function initTheme(): void {
  paint();
  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next: Theme = current() === 'dark' ? 'light' : 'dark';
      dyeSwap(() => {
        root.dataset.theme = next;
        paint();
      });
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* sin almacenamiento: el tema dura lo que la página */
      }
    });
  });
}
