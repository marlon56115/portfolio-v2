// Experiencia: tabla No. / Empresa / Rol / Periodo / Estado.
// Las duraciones no se escriben a mano: se calculan desde `from`/`to` con src/lib/time.ts.
// La fila de formación se añade en Experience.astro desde `education`.

export interface Job {
  id: string; // identificador corto y estable (ancla #job-<id> y enlaces desde el stack)
  company: string;
  role: string;
  mode: string;
  from: string; // YYYY-MM
  to: string | null; // null = actual
  summary: string;
  points: string[];
  stack: string[];
}

const es = {
  experience: {
    title: 'Experiencia',
    entries: 'entradas',
    cols: { no: 'N.º', company: 'Empresa', role: 'Rol', period: 'Periodo', status: 'Estado' },
    present: 'hoy',
    status: { duty: 'En servicio', logged: 'Registrado', graduated: 'Graduado' },
    expand: 'Ver detalles de',
    stack: 'Stack',
    education: {
      company: 'Universidad de El Salvador',
      role: 'Ingeniería de Sistemas Informáticos',
      from: '2018',
      to: '2023',
      summary: 'Graduado con honores, 1.º de la promoción.',
      points: ['Antes: Bachillerato Técnico en Infraestructura Tecnológica (CE INSA, 2017), también con honores.'],
    },
  },
  jobs: [
    {
      id: 'telus',
      company: 'TELUS Digital',
      role: 'Lead Applications Developer Analyst IIC',
      mode: 'Híbrido',
      from: '2025-10',
      to: null,
      summary: 'Liderazgo técnico, desarrollo y operación en plataformas de telecomunicaciones a gran escala.',
      points: [
        'Opero sobre GCP, Kubernetes y Linux con pipelines de CI/CD.',
        'Construyo agentes de IA y flujos automatizados que acortan la resolución de incidencias.',
        'Optimizo aplicaciones en Node.js y Java e integro NetCracker con servicios en la nube.',
      ],
      stack: ['Node.js', 'Java', 'GCP', 'Kubernetes', 'CI/CD', 'Agentes de IA'],
    },
    {
      id: 'gaspre',
      company: 'Gaspre',
      role: 'Backend Developer · Mid-Senior',
      mode: 'Remoto',
      from: '2025-04',
      to: '2025-10',
      summary: 'Backend de una plataforma de precios de combustible para todo México.',
      points: [
        'Responsable de la disponibilidad y el rendimiento del backend.',
        'Funcionalidades nuevas con Node.js, Java, MongoDB y MariaDB sobre AWS.',
      ],
      stack: ['Node.js', 'Java', 'MongoDB', 'MariaDB', 'AWS'],
    },
    {
      id: 'datum',
      company: 'Datum Redsoft',
      role: 'Systems Engineer · Development Specialist',
      mode: 'Presencial',
      from: '2024-11',
      to: '2025-05',
      summary: 'Aplicaciones para el Ministerio de Hacienda de El Salvador.',
      points: [
        'Entornos con Docker, Podman y Kubernetes; despliegues en JBoss, Tomcat y WildFly.',
        'Mejoré el pipeline de CI/CD de Java y optimicé microservicios Spring Boot sobre Oracle.',
      ],
      stack: ['Spring Boot', 'Oracle', 'PL/SQL', 'Vue.js', 'Kubernetes', 'WildFly'],
    },
    {
      id: 'mis',
      company: 'Make It Simple LLC',
      role: 'Software Engineer',
      mode: 'Remoto',
      from: '2022-04',
      to: '2024-11',
      summary: 'Sistemas financieros y SaaS para clientes en EE. UU.',
      points: [
        'Entornos con Docker Compose: la puesta en marcha bajó más de 80 %.',
        'Migré servicios PHP legados a Spring Boot en contenedores.',
      ],
      stack: ['PHP', 'Spring Boot', 'MySQL', 'MongoDB', 'Docker', 'AWS'],
    },
  ] as Job[],
};

type Experience = typeof es;

const en: Experience = {
  experience: {
    title: 'Experience',
    entries: 'entries',
    cols: { no: 'No.', company: 'Company', role: 'Role', period: 'Period', status: 'Status' },
    present: 'present',
    status: { duty: 'On duty', logged: 'Logged', graduated: 'Graduated' },
    expand: 'Show details for',
    stack: 'Stack',
    education: {
      company: 'Universidad de El Salvador',
      role: 'B.Sc. Computer Systems Engineering',
      from: '2018',
      to: '2023',
      summary: 'Graduated with honors, top of class.',
      points: ['Before that: Technical High School in IT Infrastructure (CE INSA, 2017), also with honors.'],
    },
  },
  jobs: [
    {
      id: 'telus',
      company: 'TELUS Digital',
      role: 'Lead Applications Developer Analyst IIC',
      mode: 'Hybrid',
      from: '2025-10',
      to: null,
      summary: 'Technical leadership, development and operations on large-scale telecom platforms.',
      points: [
        'Operate on GCP, Kubernetes and Linux with CI/CD pipelines.',
        'Build AI agents and automated workflows that shorten incident resolution.',
        'Optimize Node.js and Java applications and integrate NetCracker with cloud services.',
      ],
      stack: ['Node.js', 'Java', 'GCP', 'Kubernetes', 'CI/CD', 'AI agents'],
    },
    {
      id: 'gaspre',
      company: 'Gaspre',
      role: 'Backend Developer · Mid-Senior',
      mode: 'Remote',
      from: '2025-04',
      to: '2025-10',
      summary: 'Backend for a fuel-pricing platform covering all of Mexico.',
      points: [
        'Owned backend uptime and performance.',
        'Shipped features with Node.js, Java, MongoDB and MariaDB on AWS.',
      ],
      stack: ['Node.js', 'Java', 'MongoDB', 'MariaDB', 'AWS'],
    },
    {
      id: 'datum',
      company: 'Datum Redsoft',
      role: 'Systems Engineer · Development Specialist',
      mode: 'On-site',
      from: '2024-11',
      to: '2025-05',
      summary: 'Applications for El Salvador’s Ministry of Finance.',
      points: [
        'Environments on Docker, Podman and Kubernetes; deployments on JBoss, Tomcat and WildFly.',
        'Improved the Java CI/CD pipeline and optimized Spring Boot microservices on Oracle.',
      ],
      stack: ['Spring Boot', 'Oracle', 'PL/SQL', 'Vue.js', 'Kubernetes', 'WildFly'],
    },
    {
      id: 'mis',
      company: 'Make It Simple LLC',
      role: 'Software Engineer',
      mode: 'Remote',
      from: '2022-04',
      to: '2024-11',
      summary: 'Financial systems and SaaS for US clients.',
      points: [
        'Docker Compose dev environments: onboarding time down by more than 80%.',
        'Moved legacy PHP services to containerized Spring Boot.',
      ],
      stack: ['PHP', 'Spring Boot', 'MySQL', 'MongoDB', 'Docker', 'AWS'],
    },
  ],
};

export const experience = { es, en };
