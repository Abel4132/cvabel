import { z } from 'zod'
import type { Dictionary } from '../i18n/es'

export const LIMITS = { nameMax: 80, messageMax: 2000 } as const

/** Elimina caracteres de control (conserva tab y saltos de línea) y espacios sobrantes. */
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
const clean = (v: string) => v.replace(CONTROL_CHARS, '').trim()

export function buildContactSchema(e: Dictionary['contact']['errors']) {
  return z.object({
    name: z.string().transform(clean).pipe(z.string().min(2, e.nameMin).max(LIMITS.nameMax, e.nameMax)),
    email: z.string().transform(clean).pipe(z.email(e.email).max(254, e.email)),
    message: z
      .string()
      .transform(clean)
      .pipe(z.string().min(10, e.messageMin).max(LIMITS.messageMax, e.messageMax)),
  })
}

export type ContactData = z.output<ReturnType<typeof buildContactSchema>>
export type ContactField = keyof ContactData
