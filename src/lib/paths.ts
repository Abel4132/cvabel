import { profile } from '../data/profile'

/** Respeta el `base` de Vite (raíz en <usuario>.github.io o subruta en repos de proyecto). */
export const cvHref = `${import.meta.env.BASE_URL}${profile.cvFile}`
