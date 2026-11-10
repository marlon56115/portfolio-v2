// Easter egg: el código Konami (o teclear "anil") cambia de tina: todo el sitio se tiñe de otro añil.
import { dyeSwap } from '../core/theme';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const WORD = ['a', 'n', 'i', 'l'];

export function initKonami(): void {
  const root = document.documentElement;
  const toast = document.querySelector<HTMLElement>('[data-toast]');
  let k = 0;
  let w = 0;
  let timer = 0;

  const toggle = () => {
    const on = root.dataset.vat !== '2';
    dyeSwap(() => {
      if (on) root.dataset.vat = '2';
      else delete root.dataset.vat;
    });
    try {
      if (on) localStorage.setItem('vat', '2');
      else localStorage.removeItem('vat');
    } catch {
      /* sin almacenamiento */
    }
    if (toast) {
      toast.textContent = (on ? toast.dataset.vatOn : toast.dataset.vatOff) ?? '';
      toast.classList.add('is-on');
      window.clearTimeout(timer);
      timer = window.setTimeout(() => toast.classList.remove('is-on'), 2600);
    }
  };

  window.addEventListener('keydown', (e) => {
    const t = e.target as HTMLElement | null;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    k = key === KONAMI[k] ? k + 1 : key === KONAMI[0] ? 1 : 0;
    w = key === WORD[w] || (WORD[w] === 'n' && key === 'ñ') ? w + 1 : key === WORD[0] ? 1 : 0;
    if (k === KONAMI.length || w === WORD.length) {
      k = 0;
      w = 0;
      toggle();
    }
  });
}
