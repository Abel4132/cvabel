export const es = {
  meta: {
    title: 'Abel Uc Cab · Ingeniero en Sistemas · Ciberseguridad',
    description:
      'Portafolio de Abel Uc Cab, Ingeniero en Sistemas Computacionales especializado en desarrollo seguro y ciberseguridad.',
  },
  a11y: {
    skip: 'Saltar al contenido',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    switchLang: 'Switch to English',
    close: 'Cerrar',
    primaryNav: 'Navegación principal',
  },
  nav: {
    home: 'Inicio',
    stack: 'Stack',
    projects: 'Proyectos',
    experience: 'Trayectoria',
    contact: 'Contacto',
    cv: 'CV',
  },
  hero: {
    status: 'Disponible para nuevos proyectos',
    greeting: 'Hola, soy',
    name: 'Abel Uc Cab',
    role: 'Ingeniero en Sistemas Computacionales',
    headline: 'Construyo software robusto con la seguridad integrada desde el diseño.',
    summary:
      'Desarrollo backends, APIs y plataformas web escalables, y los protejo con autenticación fuerte, control de acceso por roles, validación estricta y buenas prácticas alineadas a ISO/IEC 27001.',
    ctaPrimary: 'Descargar CV',
    ctaSecondary: 'Contactar',
    metrics: [
      { value: '3', label: 'proyectos entregados' },
      { value: '8', label: 'lenguajes de programación' },
      { value: '15+', label: 'tecnologías y herramientas' },
    ],
    terminal: {
      title: 'abel@secure-dev: ~',
      lines: [
        { kind: 'cmd', text: 'whoami' },
        { kind: 'out', text: 'abel-uc-cab · ing. sistemas computacionales' },
        { kind: 'cmd', text: 'cat focus.txt' },
        { kind: 'out', text: 'desarrollo seguro · ciberseguridad · backend & cloud' },
        { kind: 'cmd', text: './audit --project conajeba' },
        { kind: 'ok', text: '[✓] autenticación JWT + MFA/2FA' },
        { kind: 'ok', text: '[✓] RBAC con roles/guards' },
        { kind: 'ok', text: '[✓] validación de DTOs' },
        { kind: 'ok', text: '[✓] IAM de mínimo privilegio en AWS' },
        { kind: 'ok', text: '[✓] respaldos automatizados' },
        { kind: 'out', text: 'estado: controles de seguridad activos' },
      ],
    },
  },
  stack: {
    eyebrow: '01. stack',
    title: 'Seguridad y stack técnico',
    intro:
      'Herramientas y tecnologías que uso a diario, agrupadas por el contexto en el que las aplico.',
    categories: {
      security: {
        label: 'Ciberseguridad',
        description: 'Controles que implemento en las aplicaciones que construyo.',
      },
      network: {
        label: 'Redes y herramientas',
        description: 'Análisis de tráfico, reconocimiento y pruebas de seguridad.',
      },
      backend: {
        label: 'Backend y Cloud',
        description: 'APIs y servicios escalables, desplegados en la nube.',
      },
      frontend: {
        label: 'Frontend',
        description: 'Interfaces web tipadas y mantenibles.',
      },
      data: {
        label: 'Bases de datos',
        description: 'Modelado relacional y NoSQL, con respaldo y recuperación.',
      },
      tooling: {
        label: 'IA y flujo de trabajo',
        description: 'IA aplicada al desarrollo, control de versiones y automatización.',
      },
      languages: {
        label: 'Lenguajes',
        description: 'Desde bajo nivel hasta la web.',
      },
    },
    skills: {
      jwt: 'Autenticación stateless con tokens firmados y expiración.',
      rbac: 'Autorización por roles con guards en cada endpoint.',
      mfa: 'Segundo factor para cuentas con privilegios.',
      hashing: 'Contraseñas con hash y salt, nunca en texto plano.',
      dto: 'Validación y saneamiento de toda entrada del cliente.',
      iso: 'Buenas prácticas alineadas a los controles de ISO/IEC 27001.',
      backups: 'Copias de seguridad y planes de recuperación.',
      sensitive: 'Manejo seguro de datos fiscales (CFDI) y personales.',
      nmap: 'Descubrimiento de hosts y servicios expuestos.',
      wireshark: 'Captura y análisis de tráfico de red.',
      burp: 'Interceptación y pruebas de aplicaciones web.',
      kali: 'Entorno de pruebas de seguridad.',
      cisco: 'Configuración de routers y switches Cisco.',
      nest: 'APIs modulares con TypeScript, guards y pipes.',
      node: 'Servicios y procesamiento masivo de archivos.',
      laravel: 'Aplicaciones MVC en PHP.',
      aws: 'IAM, S3 y despliegue de servicios.',
      rest: 'Diseño de APIs REST documentadas y versionadas.',
      angular: 'SPAs empresariales con TypeScript.',
      react: 'Interfaces declarativas con componentes.',
      ts: 'Tipado estricto en frontend y backend.',
      postgres: 'Modelado relacional para plataformas transaccionales.',
      mysql: 'Bases de datos relacionales para aplicaciones web.',
      sqlserver: 'Entornos empresariales Microsoft.',
      firebase: 'Base de datos en tiempo real y autenticación.',
      claude: 'Asistente de IA de Anthropic para diseñar, programar, revisar código y auditar seguridad.',
      git: 'Control de versiones con ramas y commits atómicos.',
      ghcli: 'Gestión de repositorios, PRs e issues desde la terminal.',
      actions: 'CI/CD: build y despliegue automático a GitHub Pages.',
    },
  },
  projects: {
    eyebrow: '02. casos de estudio',
    title: 'Proyectos',
    intro:
      'Por acuerdos de confidencialidad, el código de estos proyectos es privado. Aquí presento el problema, la solución técnica y el impacto.',
    filters: {
      all: 'Todos',
      security: 'Seguridad',
      backend: 'Backend',
      fullstack: 'Full-Stack',
    },
    labels: {
      problem: 'Problema',
      solution: 'Solución',
      impact: 'Impacto',
      security: 'Controles de seguridad',
      architecture: 'Arquitectura',
      stack: 'Stack',
      details: 'Ver caso de estudio',
      private: 'Código privado · NDA',
      public: 'Código abierto',
      viewRepo: 'Ver repositorio',
    },
    items: {
      conajeba: {
        title: 'Plataforma digital CONAJEBA',
        client: 'Congreso Nacional de Jóvenes',
        period: 'Ene – Ago 2026',
        summary:
          'Backend para el registro y la gestión de los participantes de un congreso nacional.',
        problem:
          'El congreso necesitaba registrar a sus asistentes y asignarles hospedaje y grupos sin procesos manuales, protegiendo los datos personales de los participantes.',
        solution:
          'Diseñé y desarrollé el backend en NestJS con PostgreSQL: módulos de usuarios, cuartos, grupos y reportes, desplegados en AWS y consumidos por un frontend en React.',
        impact: [
          'Registro, hospedaje y grupos centralizados en una sola plataforma.',
          'Reportes generados desde el sistema en lugar de hojas de cálculo.',
          'Datos personales protegidos por autenticación fuerte y acceso por roles.',
        ],
        security: [
          'Autenticación JWT con MFA/2FA para administradores',
          'Roles y guards de NestJS por endpoint (RBAC)',
          'Hash de contraseñas',
          'Validación de DTOs en cada petición',
          'Políticas IAM de mínimo privilegio y S3 privado',
          'Copias de seguridad de la base de datos',
        ],
      },
      arca: {
        title: 'Arca Digital',
        client: 'AZUR Sistemas de Información',
        period: 'Ago – Dic 2024',
        summary: 'Sistema de descarga masiva de comprobantes fiscales (CFDI).',
        problem:
          'Descargar y organizar grandes volúmenes de CFDI uno por uno era lento y propenso a errores, y los comprobantes contienen información fiscal sensible.',
        solution:
          'Desarrollé un sistema con Node.js y Angular que automatiza la descarga masiva y la organización de los CFDI, con manejo controlado de la información fiscal.',
        impact: [
          'La descarga manual de comprobantes pasó a ser un proceso masivo automatizado.',
          'Información fiscal sensible tratada con un manejo seguro de principio a fin.',
        ],
        security: ['Manejo seguro de CFDI y datos fiscales'],
      },
      biblioteca: {
        title: 'Software para biblioteca',
        client: 'Instituto Tecnológico Superior Progreso',
        period: 'Feb – Jun 2024',
        summary: 'Sistema de gestión para la biblioteca institucional.',
        problem:
          'La biblioteca del instituto necesitaba digitalizar la gestión de su acervo y sus préstamos.',
        solution:
          'Desarrollé una aplicación web en Angular con Firebase como base de datos, desplegada en GoogieHost y con una arquitectura preparada para migrar a AWS.',
        impact: [
          'Gestión del acervo digitalizada y accesible desde la web.',
          'Arquitectura lista para escalar a AWS sin reescribir la aplicación.',
        ],
        security: [] as string[],
      },
      portfolio: {
        title: 'Este portafolio',
        client: 'Proyecto personal',
        period: '2026',
        summary: 'Sitio estático con controles de seguridad aplicados al frontend.',
        problem:
          'Un portafolio público expone un formulario de contacto y depende de un hosting estático que no permite configurar headers de seguridad.',
        solution:
          'React + TypeScript con una Content-Security-Policy inyectada en el build, fuentes autoalojadas, cero trackers y un formulario con validación estricta y defensas anti-bot.',
        impact: [
          'Superficie de ataque mínima: solo se permite conexión a la API de correo.',
          'Formulario protegido contra spam sin afectar la accesibilidad.',
        ],
        security: [
          'Content-Security-Policy restrictiva',
          'Validación de esquema con Zod y límites de longitud',
          'Honeypot y tiempo mínimo de llenado',
          'Límite de envíos en el cliente',
          'Sin cookies ni scripts de terceros',
        ],
      },
    },
  },
  experience: {
    eyebrow: '03. trayectoria',
    title: 'Experiencia y formación',
    roles: [
      {
        id: 'conajeba',
        period: 'Ene – Ago 2026',
        role: 'Desarrollador Back-end',
        org: 'Plataforma CONAJEBA',
        points: [
          'Desarrollé el backend de la plataforma de registro del Congreso Nacional de Jóvenes.',
          'Implementé la gestión de usuarios, cuartos, grupos y reportes.',
          'Apliqué JWT, MFA/2FA, RBAC, validación de DTOs e IAM en AWS.',
        ],
        tech: ['NestJS', 'React', 'AWS', 'PostgreSQL'],
      },
      {
        id: 'arca',
        period: 'Ago – Dic 2024',
        role: 'Desarrollador Full-Stack',
        org: 'AZUR Sistemas de Información',
        points: [
          'Desarrollé Arca Digital, un sistema de descarga masiva de CFDI.',
          'Construí la lógica de servidor en Node.js y la interfaz en Angular.',
          'Implementé un manejo seguro de la información fiscal.',
        ],
        tech: ['Node.js', 'Angular'],
      },
      {
        id: 'biblioteca',
        period: 'Feb – Jun 2024',
        role: 'Desarrollador de software',
        org: 'Instituto Tecnológico Superior Progreso',
        points: [
          'Desarrollé e implementé el software de gestión de la biblioteca.',
          'Integré Firebase como base de datos y desplegué en GoogieHost.',
          'Dejé la arquitectura preparada para una futura migración a AWS.',
        ],
        tech: ['Angular', 'Firebase'],
      },
    ],
    educationTitle: 'Formación académica',
    education: [
      {
        period: '2020 – 2024',
        title: 'Ingeniería en Sistemas Computacionales',
        org: 'Instituto Tecnológico Superior Progreso',
      },
      {
        period: '2017 – 2020',
        title: 'Bachillerato · Físico-Matemático',
        org: 'COBAY · Capacitación en informática',
      },
    ],
    softTitle: 'Habilidades',
    soft: [
      'Proactividad',
      'Trabajo en equipo',
      'Resolución de problemas',
      'Adaptabilidad al cambio',
      'Gestión del tiempo',
      'Responsabilidad',
      'Gestión de proyectos',
    ],
    langTitle: 'Idiomas',
    languages: ['Español · Nativo', 'Inglés · A2'],
  },
  contact: {
    eyebrow: '04. contacto',
    title: 'Hablemos',
    intro:
      '¿Tienes un proyecto que necesita un backend sólido o una revisión de seguridad? Escríbeme y te respondo pronto.',
    form: {
      name: 'Nombre',
      email: 'Correo electrónico',
      message: 'Mensaje',
      namePh: 'Tu nombre',
      emailPh: 'tu@correo.com',
      messagePh: 'Cuéntame sobre tu proyecto…',
      submit: 'Enviar mensaje',
      sending: 'Enviando…',
      success: '¡Mensaje enviado! Te responderé pronto.',
      errorGeneric: 'No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por correo.',
      notConfigured: 'El formulario aún no está configurado. Escríbeme directamente por correo.',
      cooldown: 'Espera {s} s antes de enviar otro mensaje.',
      tooFast: 'Envío bloqueado por precaución. Revisa tus datos e inténtalo de nuevo.',
      chars: '{n}/{max}',
      secureNote: 'Validado y protegido contra spam. No uso cookies ni rastreadores.',
    },
    errors: {
      nameMin: 'Escribe al menos 2 caracteres.',
      nameMax: 'Máximo 80 caracteres.',
      email: 'Escribe un correo válido.',
      messageMin: 'Escribe al menos 10 caracteres.',
      messageMax: 'Máximo 2000 caracteres.',
    },
    direct: 'Contacto directo',
    copy: 'Copiar correo',
    copied: 'Copiado',
  },
  footer: {
    rights: 'Diseñado y desarrollado por Abel Uc Cab.',
    built: 'React · TypeScript · Tailwind · Framer Motion',
  },
}

export type Dictionary = typeof es
