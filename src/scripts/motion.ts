// Movimiento con GSAP + ScrollTrigger + Lenis. Este módulo solo se carga sin prefers-reduced-motion.
// - Lenis: scroll suave, sincronizado con el ticker de GSAP.
// - Reveals: desplazamiento corto + fade al entrar; títulos que suben tras una máscara.
// - Hero: el nombre se separa y el retrato se deshila con el scroll; las letras se inclinan con el mouse.
// - Sobre mí: el mapa se traza y el párrafo se revela palabra por palabra.
// - Teñido entre secciones (fx/dye.ts) y efectos de puntero (fx/pointer.ts).
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { finePointer } from './core/env';
import { initDye } from './fx/dye';
import { initPointer } from './fx/pointer';
import { setUnweave } from './fx/portrait';

const OUT = 'expo.out'; // ≈ cubic-bezier(.16, 1, .3, 1)

function smoothScroll(): Lenis {
  const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  const go = (id: string) => {
    const target = id === '#top' ? 0 : document.querySelector<HTMLElement>(id);
    if (target !== null) lenis.scrollTo(target, { duration: 1.3 });
  };
  document.addEventListener('click', (e) => {
    const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a || a.hasAttribute('data-menu-link')) return;
    e.preventDefault();
    go(a.getAttribute('href') ?? '#top');
  });
  document.addEventListener('nav:go', (e) => go((e as CustomEvent<string>).detail));
  document.addEventListener('menu:open', () => lenis.stop());
  document.addEventListener('menu:close', () => lenis.start());
  return lenis;
}

function reveals(): void {
  // Títulos: suben desde abajo de su máscara.
  gsap.utils.toArray<HTMLElement>('.mask > span').forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: 108 },
      { yPercent: 0, duration: 1.1, ease: OUT, scrollTrigger: { trigger: el.parentElement, start: 'top 92%', once: true } },
    );
  });

  // Bloques: desplazamiento corto + fade, escalonados cuando entran juntos.
  const blocks = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  gsap.set(blocks, { autoAlpha: 0, y: 22 });
  ScrollTrigger.batch(blocks, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: OUT, stagger: 0.07, overwrite: true }),
  });

  // Chips del toolkit: cada fila teje sus chips uno tras otro.
  gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll('[data-reveal-item]');
    gsap.set(items, { autoAlpha: 0, y: 14 });
    ScrollTrigger.create({
      trigger: group,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(items, { autoAlpha: 1, y: 0, duration: 0.6, ease: OUT, stagger: 0.035, clearProps: 'transform' }),
    });
  });

  // Filtro de logros: las filas visibles vuelven a entrar.
  document.addEventListener('filter:change', (e) => {
    const rows = (e as CustomEvent<HTMLElement[]>).detail;
    gsap.fromTo(rows, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: OUT, stagger: 0.04, overwrite: true });
  });
}

function hero(): void {
  const section = document.querySelector<HTMLElement>('[data-hero]');
  if (!section) return;
  const left = section.querySelector('.hero__half--l');
  const right = section.querySelector('.hero__half--r');
  const desktop = window.matchMedia('(min-width: 900px)').matches;

  // Scroll: las dos mitades del nombre se separan, el texto se apaga y el retrato se deshila.
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.5,
      onUpdate: (self) => setUnweave(Math.max(0, self.progress * 1.5 - 0.08)),
    },
  });
  if (desktop) {
    tl.to(left, { xPercent: -14, ease: 'none' }, 0).to(right, { xPercent: 14, ease: 'none' }, 0);
    tl.to('.hero__half--l .ch', { x: (i: number, _el: Element, all: Element[]) => -(all.length - 1 - i) * 7, ease: 'none' }, 0);
    tl.to('.hero__half--r .ch', { x: (i: number) => i * 7, ease: 'none' }, 0);
  } else {
    tl.to(left, { xPercent: -8, ease: 'none' }, 0).to(right, { xPercent: 8, ease: 'none' }, 0);
  }
  tl.to('.hero__copy, .hero__since, .hero__scroll', { autoAlpha: 0, ease: 'none', duration: 0.35 }, 0);

  // Mouse: cada letra se inclina hacia el puntero, con más recorrido cuanto más lejos está.
  if (!finePointer) return;
  const letters = gsap.utils.toArray<HTMLElement>('.hero__name .ch');
  gsap.set(letters, { transformPerspective: 700, transformOrigin: '50% 100%' });
  const tiltY = letters.map((el) => gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3.out' }));
  const tiltX = letters.map((el) => gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3.out' }));
  const lift = letters.map((el) => gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' }));
  let centers: number[] = [];
  const measure = () => {
    centers = letters.map((el) => {
      const b = el.getBoundingClientRect();
      return b.left + b.width / 2;
    });
  };
  section.addEventListener('pointerenter', measure);
  section.addEventListener('pointermove', (e) => {
    if (!centers.length) measure();
    const ny = e.clientY / window.innerHeight - 0.5;
    letters.forEach((_, i) => {
      const d = (e.clientX - centers[i]) / window.innerWidth; // -1..1
      const near = Math.max(0, 1 - Math.abs(d) * 3.2);
      tiltY[i](d * 34);
      tiltX[i](-ny * 12 * (0.4 + near));
      lift[i](-near * 10);
    });
  });
  section.addEventListener('pointerleave', () => {
    letters.forEach((_, i) => {
      tiltY[i](0);
      tiltX[i](0);
      lift[i](0);
    });
  });
}

function about(): void {
  const section = document.querySelector<HTMLElement>('[data-about]');
  if (!section) return;
  const words = gsap.utils.toArray<HTMLElement>('.about .w');
  gsap.set(words, { opacity: 0.13 });
  gsap.set('.about__outline', { strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set('.about__fill', { opacity: 0 });
  gsap.set('.about__icon, .about__pin, .about__where', { opacity: 0 });

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: section, start: 'top 75%', end: 'bottom bottom', scrub: 0.6 },
  });
  tl.to('.about__outline', { strokeDashoffset: 0, duration: 0.3 }, 0)
    .to('.about__fill', { opacity: 1, duration: 0.2 }, 0.2)
    .to('.about__pin, .about__where', { opacity: 1, duration: 0.06 }, 0.3)
    .fromTo('.about__icon', { y: 10 }, { opacity: 1, y: 0, duration: 0.08, stagger: 0.05 }, 0.32)
    .to(words, { opacity: 1, duration: 0.04, stagger: 0.6 / words.length }, 0.22)
    .to({}, { duration: 0.08 }); // respiro al final antes de soltar el pin
}

function dye(): void {
  initDye().forEach((d) => {
    ScrollTrigger.create({
      trigger: d.el,
      start: 'top bottom',
      end: 'bottom 48%',
      onUpdate: (self) => d.set(self.progress),
      onRefresh: (self) => d.set(self.progress),
    });
  });
}

function touchColor(): void {
  // En táctil no hay hover: la imagen pasa a color mientras cruza el centro de la pantalla.
  if (finePointer) return;
  gsap.utils.toArray<HTMLElement>('.proj__media').forEach((el) => {
    ScrollTrigger.create({ trigger: el, start: 'top 62%', end: 'bottom 38%', toggleClass: 'is-color' });
  });
}

export function initMotion(): void {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  smoothScroll();
  reveals();
  hero();
  about();
  dye();
  touchColor();
  if (finePointer) initPointer();

  // Fuentes, plegables y filtros cambian alturas: recalcular los disparadores.
  document.addEventListener('layout:change', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
