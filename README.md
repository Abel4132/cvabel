# Portafolio · Abel Uc Cab

Portafolio bilingüe (ES/EN) de un Ingeniero en Sistemas Computacionales con enfoque en desarrollo seguro y ciberseguridad.

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Zod · EmailJS

## Desarrollo

```bash
npm install
cp .env.example .env.local   # llena las llaves de EmailJS
npm run dev
npm run build && npm run preview
```

## Estructura

```
src/
├─ i18n/         es.ts (fuente de verdad del contenido) · en.ts · LanguageProvider
├─ data/         profile, skills, projects (datos no textuales)
├─ hooks/        useActiveSection (scroll-spy) · useTerminal (animación del Hero)
├─ lib/          contactSchema (Zod) · emailService (EmailJS + cooldown) · paths
└─ components/   layout · ui · hero · stack · projects · experience · contact
```

Para editar textos, modifica `src/i18n/es.ts` y `src/i18n/en.ts`; TypeScript avisa si a una traducción le falta una clave.

## Seguridad aplicada

- **CSP** inyectada como `<meta>` solo en el build (`vite.config.ts`): `script-src 'self'`, `connect-src` limitado a `api.emailjs.com` y `object-src 'none'`.
- **Fuentes autoalojadas** (sin Google Fonts), sin cookies, analíticas ni scripts de terceros.
- **Formulario:** validación con Zod (longitudes máximas, formato de email, limpieza de caracteres de control), honeypot, tiempo mínimo de llenado, cooldown de 60 s y `limitRate` del SDK.
- Enlaces externos con `rel="noopener noreferrer"`.

### Configuración de EmailJS (obligatoria para que el formulario envíe)

1. Crea el servicio y la plantilla en <https://dashboard.emailjs.com>. Variables de la plantilla: `{{from_name}}`, `{{reply_to}}` y `{{message}}`.
2. **Account → Security:** activa *Allowed origins* solo con tu dominio de GitHub Pages.
3. Configura un límite de envíos (rate limit) y, opcionalmente, reCAPTCHA.
4. En GitHub: **Settings → Secrets and variables → Actions**, crea `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` y `VITE_EMAILJS_PUBLIC_KEY`.

> La public key de EmailJS se incluye en el bundle por diseño. La protección real está en el allowlist de dominios y el rate limit del dashboard.

## Despliegue en GitHub Pages

El workflow `.github/workflows/deploy.yml` construye y publica en cada push a `main`.

1. **Settings → Pages → Source:** *GitHub Actions*.
2. URL raíz (`<cuenta>.github.io`): no hace falta nada, `base` es `/` por defecto.
3. URL de repo de proyecto (`<cuenta>.github.io/Portafolio/`): crea la variable de Actions `VITE_BASE_PATH=/Portafolio/`.
