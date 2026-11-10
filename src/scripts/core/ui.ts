// Interacciones pequeñas sin dependencias: plegables, filtros de logros y copiar el correo.

export function initFolds(): void {
  document.querySelectorAll<HTMLElement>('[data-fold]').forEach((fold) => {
    const btn = fold.querySelector<HTMLButtonElement>('[data-fold-btn]');
    if (!btn) return;
    const text = btn.querySelector<HTMLElement>('[data-fold-text]');
    btn.addEventListener('click', () => {
      const open = fold.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
      if (text) text.textContent = (open ? btn.dataset.open : btn.dataset.closed) ?? text.textContent;
      // La altura de la página cambia: quien dependa de ella (ScrollTrigger) debe recalcular.
      window.setTimeout(() => document.dispatchEvent(new CustomEvent('layout:change')), 520);
    });
  });
}

export function initFilters(): void {
  const group = document.querySelector<HTMLElement>('[data-filters]');
  if (!group) return;
  const tabs = [...group.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const rows = [...document.querySelectorAll<HTMLElement>('.rec__row')];
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const kind = tab.dataset.filter;
      tabs.forEach((t) => t.setAttribute('aria-pressed', String(t === tab)));
      rows.forEach((row) => {
        row.hidden = kind !== 'all' && row.dataset.kind !== kind;
      });
      document.dispatchEvent(new CustomEvent('filter:change', { detail: rows.filter((r) => !r.hidden) }));
      document.dispatchEvent(new CustomEvent('layout:change'));
    });
  });
}

export function initCopy(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    const label = btn.textContent ?? '';
    const live = btn.parentElement?.querySelector<HTMLElement>('[data-copy-live]');
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy ?? '');
        btn.textContent = btn.dataset.copied ?? label;
        if (live) live.textContent = live.dataset.msg ?? '';
        window.setTimeout(() => {
          btn.textContent = label;
          if (live) live.textContent = '';
        }, 1800);
      } catch {
        /* sin permiso de portapapeles: el enlace mailto de arriba sigue ahí */
      }
    });
  });
}
