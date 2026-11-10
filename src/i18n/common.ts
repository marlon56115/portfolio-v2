// Texto compartido por todo el sitio: datos de contacto, meta, navegación, controles y pie.
// Regla de privacidad: nada de "homelab", nombres de host, "mi casa", hardware ni versiones.

export type Lang = 'es' | 'en';
export const langs: Lang[] = ['es', 'en'];

/** Mes en que empezó la carrera profesional (YYYY-MM). Base de los años de experiencia dinámicos. */
export const careerStart = '2022-04';

const facts = {
  name: 'Marlon Guerra',
  fullName: 'Marlon Wilfredo Guerra Ramírez',
  initials: 'MG',
  first: 'Marlon',
  last: 'Guerra',
  city: 'Santa Ana',
  coords: '13°59′N 89°33′W',
  email: 'marlon56115@gmail.com',
  linkedin: 'https://www.linkedin.com/in/marlonguerradev',
  github: 'https://github.com/marlon56115',
  location: 'Santa Ana, El Salvador',
};

const es = {
  ...facts,
  htmlLang: 'es',
  meta: {
    title: 'Marlon Guerra · Lead DevOps Engineer',
    description:
      'Ingeniero DevOps en El Salvador: CI/CD, contenedores, Kubernetes, infraestructura como código y observabilidad. También desarrollo backend y automatizo operación con agentes de IA.',
  },
  // Orden = orden de las secciones en la página.
  // Orden = orden de las secciones en la página (ids en Home.astro).
  nav: { top: 'inicio', toolkit: 'stack', work: 'proyectos', experience: 'experiencia', recognition: 'logros', contact: 'contacto' },
  ui: {
    mode: 'Modo',
    themeLight: 'claro',
    themeDark: 'oscuro',
    themeToggle: 'Cambiar entre modo claro y oscuro',
    language: 'Idioma',
    menu: 'Menú',
    close: 'Cerrar',
    siteMenu: 'Menú del sitio',
    primaryNav: 'Navegación principal',
    skip: 'Saltar al contenido',
    home: 'inicio',
    connect: 'Contacto',
    localTime: 'Hora en El Salvador',
    scroll: 'Scroll',
    backToTop: 'Volver arriba',
    details: 'Detalles',
    vat: 'Tina n.º 2 · añil violeta',
    vatOff: 'Tina n.º 1 · añil',
  },
  footer: {
    built: 'Hecho con Astro y GSAP',
    line: 'Autoalojado. Sin trackers ni cookies de terceros.',
    version: 'v',
  },
  notFound: {
    title: 'Hilo suelto',
    body: 'Esta página no existe o se movió.',
    home: 'Volver al inicio',
  },
};

type Common = typeof es;

const en: Common = {
  ...facts,
  htmlLang: 'en',
  meta: {
    title: 'Marlon Guerra · Lead DevOps Engineer',
    description:
      'DevOps engineer based in El Salvador: CI/CD, containers, Kubernetes, infrastructure as code and observability. I also build backends and automate operations with AI agents.',
  },
  nav: { top: 'index', toolkit: 'toolkit', work: 'work', experience: 'experience', recognition: 'recognition', contact: 'contact' },
  ui: {
    mode: 'Mode',
    themeLight: 'light',
    themeDark: 'dark',
    themeToggle: 'Switch between light and dark mode',
    language: 'Language',
    menu: 'Menu',
    close: 'Close',
    siteMenu: 'Site menu',
    primaryNav: 'Main navigation',
    skip: 'Skip to content',
    home: 'home',
    connect: 'Connect',
    localTime: 'Time in El Salvador',
    scroll: 'Scroll',
    backToTop: 'Back to top',
    details: 'Details',
    vat: 'Vat no. 2 · violet indigo',
    vatOff: 'Vat no. 1 · indigo',
  },
  footer: {
    built: 'Built with Astro & GSAP',
    line: 'Self-hosted. No trackers, no third-party cookies.',
    version: 'v',
  },
  notFound: {
    title: 'Loose thread',
    body: 'This page doesn’t exist or has moved.',
    home: 'Back to home',
  },
};

export const common = { es, en };
