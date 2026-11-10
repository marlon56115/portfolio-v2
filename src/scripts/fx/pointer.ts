// Efectos de puntero fino (no se cargan en táctil): cursor propio, botones magnéticos y tilt 3D
// con brillo en las imágenes de proyecto.
import gsap from 'gsap';

function cursor(): void {
  const dot = document.createElement('div');
  dot.className = 'cur';
  const ring = document.createElement('div');
  ring.className = 'cur-ring';
  const shape = document.createElement('i');
  const label = document.createElement('b');
  label.textContent = document.documentElement.lang === 'es' ? 'VER' : 'VIEW';
  shape.append(label);
  ring.append(shape);
  [dot, ring].forEach((el) => el.setAttribute('aria-hidden', 'true'));

  const dx = gsap.quickSetter(dot, 'x', 'px');
  const dy = gsap.quickSetter(dot, 'y', 'px');
  const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });
  let mounted = false;

  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      if (!mounted) {
        mounted = true;
        // Dentro del <dialog> del menú (top layer) el cursor no se vería: se muda con él.
        document.body.append(ring, dot);
        gsap.set(ring, { x: e.clientX, y: e.clientY });
        document.documentElement.classList.add('has-cursor');
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    },
    { passive: true },
  );

  document.addEventListener('pointerover', (e) => {
    const t = e.target as Element | null;
    if (!t?.closest) return;
    const view = !!t.closest('[data-cursor="view"]');
    const link = !view && !!t.closest('a, button, [data-fold-btn]');
    const inv = !!t.closest('.tone-flood, .tone-night') && !t.closest('.btn-solid, .chip__logo');
    ring.classList.toggle('is-view', view);
    dot.classList.toggle('is-view', view);
    ring.classList.toggle('is-link', link);
    ring.classList.toggle('is-inv', inv);
    dot.classList.toggle('is-inv', inv);
  });
  document.documentElement.addEventListener('pointerleave', () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 }));
  document.documentElement.addEventListener('pointerenter', () => gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 }));

  // El menú es un <dialog> modal (top layer): mientras está abierto, el cursor vive dentro.
  const menu = document.querySelector('[data-menu]');
  document.addEventListener('menu:open', () => mounted && menu?.append(ring, dot));
  document.addEventListener('menu:close', () => mounted && document.body.append(ring, dot));
}

function magnets(): void {
  document.querySelectorAll<HTMLElement>('[data-magnet]').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const b = el.getBoundingClientRect();
      x((e.clientX - (b.left + b.width / 2)) * 0.3);
      y((e.clientY - (b.top + b.height / 2)) * 0.3);
    });
    el.addEventListener('pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)' });
    });
  });
}

function tilt(): void {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((wrap) => {
    const card = wrap.querySelector<HTMLElement>('.shot');
    if (!card) return;
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    wrap.addEventListener('pointermove', (e) => {
      const b = wrap.getBoundingClientRect();
      const nx = (e.clientX - b.left) / b.width;
      const ny = (e.clientY - b.top) / b.height;
      ry((nx - 0.5) * 7);
      rx((0.5 - ny) * 5);
      wrap.style.setProperty('--gx', `${(nx * 100).toFixed(1)}%`);
      wrap.style.setProperty('--gy', `${(ny * 100).toFixed(1)}%`);
      wrap.classList.add('is-tilting');
    });
    wrap.addEventListener('pointerleave', () => {
      rx(0);
      ry(0);
      wrap.classList.remove('is-tilting');
    });
  });
}

export function initPointer(): void {
  cursor();
  magnets();
  tilt();
}
