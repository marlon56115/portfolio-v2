// Hero y "sobre mí".
// Los años NO se escriben: salen de `careerStart` (common.ts) con src/lib/time.ts.
// En `intro` y `about`, lo que va entre [corchetes] se resalta en añil; {years} se reemplaza por los años.

const es = {
  hero: {
    chip: 'Lead DevOps Engineer @ TELUS Digital',
    line: 'Ingeniero de Sistemas Informáticos · UES 2023',
    intro: 'Marlon Guerra — automatizo el camino del commit a producción con [Kubernetes], [CI/CD] y [agentes de IA] desde Santa Ana.',
    since: 'En producción desde',
    photoAlt: 'Retrato de Marlon Guerra sonriendo, con saco oscuro y camisa a cuadros',
  },
  about: {
    title: 'Sobre mí',
    text: 'Hola, soy Marlon Guerra, Ingeniero de Sistemas Informáticos, graduado con honores de la Universidad de El Salvador. Llevo {years} años llevando software a producción: CI/CD, Kubernetes, infraestructura como código y observabilidad, y también el código que despliego. Hoy lidero desarrollo en plataformas de telecomunicaciones en TELUS Digital y automatizo soporte con agentes de IA.',
  },
};

type Hero = typeof es;

const en: Hero = {
  hero: {
    chip: 'Lead DevOps Engineer @ TELUS Digital',
    line: 'Computer Systems Engineer · UES 2023',
    intro: 'Marlon Guerra — automating the path from commit to production with [Kubernetes], [CI/CD] and [AI agents] from Santa Ana.',
    since: 'Shipping code since',
    photoAlt: 'Portrait of Marlon Guerra smiling, wearing a dark blazer and a checked shirt',
  },
  about: {
    title: 'About',
    text: 'Hi, I’m Marlon Guerra, a Computer Systems Engineer who graduated with honors from Universidad de El Salvador. I have spent {years} years taking software to production: CI/CD, Kubernetes, infrastructure as code and observability, plus the code I ship. Today I lead development on telecom platforms at TELUS Digital and automate support with AI agents.',
  },
};

export const hero = { es, en };
