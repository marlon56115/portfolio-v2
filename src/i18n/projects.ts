// Proyectos propios (sección Work): una fila por proyecto.
// Privacidad: la plataforma propia se describe en general (todo como código, GitOps, respaldos,
// observabilidad, seguridad en capas), sin hardware, nombres internos, reglas de red ni cómo se expone.
// `year` es opcional: solo se pone cuando se sabe con certeza; si falta, se muestra el estado.

export interface Project {
  // Identificador interno estable (ancla #project-<slug> e imagen); no se muestra.
  slug: 'platform' | 'money' | 'tickets' | 'site';
  year?: string;
  type: string;
  name: string;
  role: string;
  summary: string;
  points: string[];
  stack: string[];
  status: string;
  alt: string; // texto alternativo de la imagen o del diagrama
}

const es = {
  projects: {
    title: 'Proyectos',
    count: 'proyectos',
    read: 'Leer el caso',
    hide: 'Cerrar el caso',
    // Diagrama de capas de la plataforma (hace de "imagen" del proyecto).
    layers: ['repositorio', 'aprovisionamiento', 'plataforma', 'aplicaciones', 'datos', 'observabilidad', 'seguridad'],
    rebuild: 'reconstruido desde git',
    // Camino de una petición (imagen del proyecto "este sitio").
    path: ['navegador', 'borde · TLS', 'clúster', 'servicio · Go'],
    pathNote: 'CSP estricta · sin terceros',
    items: [
      {
        slug: 'platform',
        type: 'Infraestructura',
        name: 'Plataforma propia',
        role: 'Infraestructura como código',
        summary: 'Infraestructura autoalojada definida en Git: se reconstruye desde cero con 1 comando.',
        points: [
          'GitOps sobre Kubernetes, con entrega continua desde GitHub Actions.',
          'Aprovisionamiento idempotente con OpenTofu y Ansible.',
          'Respaldos con restauración probada, métricas y alertas. 30+ decisiones en ADRs.',
        ],
        stack: ['Kubernetes', 'GitOps', 'OpenTofu', 'Ansible', 'GitHub Actions', 'Prometheus'],
        status: 'En producción 24/7',
        alt: 'Diagrama de siete capas de la plataforma, del repositorio a la seguridad',
      },
      {
        slug: 'money',
        type: 'Web app · IA',
        name: 'Gastos',
        role: 'Finanzas personales con IA',
        summary: 'Gastos personales: lee facturas DTE por QR y correos del banco, y clasifica compras con IA.',
        points: [
          'Doble partida sobre un libro mayor inmutable.',
          'Ingesta de correos bancarios con push y webhooks firmados; facturas leídas con Gemini.',
          'Migrada de servicios gestionados a infraestructura propia sin perder datos.',
        ],
        stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle', 'Google Gemini', 'Playwright'],
        status: 'En producción',
        alt: 'Panel ejecutivo de Gastos: liquidez, gasto del mes y patrimonio (datos de demostración)',
      },
      {
        slug: 'tickets',
        type: 'Web app',
        name: 'Control de vales',
        role: 'Ventas y entrega',
        summary: 'Control de 600 vales: asignación por rangos, ventas, pagos por lote y entrega en 1 toque.',
        points: [
          'Entrega en un toque: busca, cobra y entrega, con deshacer.',
          'Roles validados en servidor, sesiones revocables y bitácora de auditoría.',
          '~60 archivos de pruebas con Vitest y E2E con Playwright, incluido WCAG 2.1 AA.',
        ],
        stack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Vitest', 'Playwright'],
        status: 'Usada en un evento real',
        alt: 'Panel en vivo de Control de vales: cobrado, por cobrar y vales por estado (datos de demostración)',
      },
      {
        slug: 'site',
        year: '2026',
        type: 'Sitio · Go',
        name: 'Este sitio',
        role: 'Autoalojado de punta a punta',
        summary: 'Un binario de Go con el sitio embebido, desplegado con GitOps sobre infraestructura propia.',
        points: [
          'CSP estricta: 0 scripts o estilos inline, 0 terceros, fuentes autoalojadas.',
          'CI con pruebas, chequeo de tipos y escaneo de vulnerabilidades; imagen mínima con SBOM.',
          'El clúster lee el estado deseado de Git y cambia de versión sin cortes.',
        ],
        stack: ['Go', 'Astro', 'Docker', 'Helm', 'GitOps', 'CI/CD'],
        status: 'En producción',
        alt: 'Camino de una petición: navegador, borde, clúster y servicio en Go',
      },
    ] as Project[],
  },
};

type Projects = typeof es;

const en: Projects = {
  projects: {
    title: 'Work',
    count: 'projects',
    read: 'Read the case',
    hide: 'Close the case',
    layers: ['repository', 'provisioning', 'platform', 'apps', 'data', 'observability', 'security'],
    rebuild: 'rebuilt from git',
    path: ['browser', 'edge · TLS', 'cluster', 'service · Go'],
    pathNote: 'strict CSP · no third parties',
    items: [
      {
        slug: 'platform',
        type: 'Infrastructure',
        name: 'Own platform',
        role: 'Infrastructure as code',
        summary: 'Self-hosted infrastructure defined in Git: rebuilt from scratch with 1 command.',
        points: [
          'GitOps on Kubernetes, with continuous delivery from GitHub Actions.',
          'Idempotent provisioning with OpenTofu and Ansible.',
          'Backups with tested restores, metrics and alerting. 30+ decisions in ADRs.',
        ],
        stack: ['Kubernetes', 'GitOps', 'OpenTofu', 'Ansible', 'GitHub Actions', 'Prometheus'],
        status: 'In production 24/7',
        alt: 'Diagram of the platform’s seven layers, from repository to security',
      },
      {
        slug: 'money',
        type: 'Web app · AI',
        name: 'Gastos',
        role: 'AI-assisted personal finance',
        summary: 'Personal expenses: reads DTE invoices by QR and bank emails, and categorizes purchases with AI.',
        points: [
          'Double-entry accounting on an immutable ledger.',
          'Bank-email ingestion via push and signed webhooks; invoices read with Gemini.',
          'Moved off managed services onto self-hosted infrastructure without losing data.',
        ],
        stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle', 'Google Gemini', 'Playwright'],
        status: 'In production',
        alt: 'Gastos executive dashboard: liquidity, monthly spend and net worth (demo data)',
      },
      {
        slug: 'tickets',
        type: 'Web app',
        name: 'Voucher control',
        role: 'Sales and hand-out',
        summary: 'Control of 600 vouchers: range assignment, sales, batch payments and 1-tap hand-out.',
        points: [
          'One-tap hand-out: search, charge and deliver, with undo.',
          'Server-enforced roles, revocable sessions and an audit trail.',
          '~60 Vitest test files plus Playwright E2E, including WCAG 2.1 AA.',
        ],
        stack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Vitest', 'Playwright'],
        status: 'Used at a real event',
        alt: 'Voucher control live dashboard: collected, outstanding and vouchers by state (demo data)',
      },
      {
        slug: 'site',
        year: '2026',
        type: 'Site · Go',
        name: 'This site',
        role: 'Self-hosted end to end',
        summary: 'A Go binary with the site embedded, shipped with GitOps onto self-hosted infrastructure.',
        points: [
          'Strict CSP: 0 inline scripts or styles, 0 third parties, self-hosted fonts.',
          'CI with tests, type checks and a vulnerability scan; minimal image with SBOM.',
          'The cluster reads the desired state from Git and swaps versions with zero downtime.',
        ],
        stack: ['Go', 'Astro', 'Docker', 'Helm', 'GitOps', 'CI/CD'],
        status: 'In production',
        alt: 'Path of a request: browser, edge, cluster and Go service',
      },
    ],
  },
};

export const projects = { es, en };
