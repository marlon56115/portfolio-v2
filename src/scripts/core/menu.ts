// Menú a pantalla completa sobre <dialog>: showModal() atrapa el foco y Esc lo cierra.
// Avisa con eventos 'menu:open' / 'menu:close' para que el scroll suave se detenga.

export function initMenu(): void {
  const menu = document.querySelector<HTMLDialogElement>('[data-menu]');
  const opener = document.querySelector<HTMLElement>('[data-menu-open]');
  if (!menu || !opener || typeof menu.showModal !== 'function') return;

  const open = () => {
    menu.classList.remove('is-closing');
    menu.showModal();
    document.dispatchEvent(new CustomEvent('menu:open'));
  };
  const close = (then?: () => void) => {
    if (!menu.open) return;
    menu.classList.add('is-closing');
    window.setTimeout(() => {
      menu.close();
      menu.classList.remove('is-closing');
      document.dispatchEvent(new CustomEvent('menu:close'));
      opener.focus({ preventScroll: true });
      then?.();
    }, 340);
  };

  opener.addEventListener('click', open);
  menu.querySelector('[data-menu-close]')?.addEventListener('click', () => close());
  // Esc: animar la salida en vez de cerrar de golpe.
  menu.addEventListener('cancel', (e) => {
    e.preventDefault();
    close();
  });
  menu.querySelectorAll<HTMLAnchorElement>('[data-menu-link]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href') ?? '#top';
      close(() => document.dispatchEvent(new CustomEvent('nav:go', { detail: id })));
    });
  });
}

/** Recuerda el idioma elegido: el servidor Go lo usa para redirigir "/". */
export function initLang(): void {
  document.querySelectorAll<HTMLElement>('[data-set-lang]').forEach((a) => {
    a.addEventListener('click', () => {
      document.cookie = `lang=${a.dataset.setLang}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`;
    });
  });
}
