// Sección de contacto.
// El correo, LinkedIn y GitHub viven en common.ts (facts); aquí solo el texto de la sección.

/**
 * Disponibilidad mostrada en la sección. Cambia solo `state`:
 *  - 'open'    → LED verde, "abierto a propuestas"
 *  - 'limited' → LED ámbar, "agenda limitada"
 *  - 'closed'  → LED apagado, "sin disponibilidad por ahora"
 */
export const availability: 'open' | 'limited' | 'closed' = 'open';

/** Zona horaria de la hora local en vivo del header (El Salvador no tiene horario de verano). */
export const timeZone = 'America/El_Salvador';

const es = {
  contact: {
    title: '¿Tienes algo que construir?',
    based: 'Desde Santa Ana, SV · UTC-6',
    send: 'Enviar un correo',
    direct: 'Directo',
    elsewhere: 'En otros lados',
    copy: 'Copiar correo',
    copied: 'Copiado',
    copiedLive: 'Correo copiado al portapapeles.',
    linkedinHandle: 'LinkedIn · in/marlonguerradev',
    githubHandle: 'GitHub · marlon56115',
    external: 'se abre en una pestaña nueva',
    status: {
      open: 'Abierto a propuestas',
      limited: 'Agenda limitada',
      closed: 'Sin disponibilidad por ahora',
    },
    note: 'Plataforma, infraestructura, CI/CD o automatización con IA. Respondo en menos de 24 h hábiles.',
    nameLabel: 'Marlon, escrito en tejido',
  },
};

type Contact = typeof es;

const en: Contact = {
  contact: {
    title: 'Have something to build?',
    based: 'Based in Santa Ana, SV · UTC-6',
    send: 'Send an email',
    direct: 'Direct',
    elsewhere: 'Elsewhere',
    copy: 'Copy email',
    copied: 'Copied',
    copiedLive: 'Email copied to the clipboard.',
    linkedinHandle: 'LinkedIn · in/marlonguerradev',
    githubHandle: 'GitHub · marlon56115',
    external: 'opens in a new tab',
    status: {
      open: 'Open to proposals',
      limited: 'Limited availability',
      closed: 'Not available right now',
    },
    note: 'Platform, infrastructure, CI/CD or AI automation. I reply within 24 business hours.',
    nameLabel: 'Marlon, written in weave',
  },
};

export const contact = { es, en };
