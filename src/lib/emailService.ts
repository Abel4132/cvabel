import emailjs from '@emailjs/browser'
import type { ContactData } from './contactSchema'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

export const COOLDOWN_MS = 60_000
/** Un humano tarda más que esto en llenar el formulario. */
export const MIN_FILL_MS = 3_000
const LAST_SENT_KEY = 'contact:lastSent'

export const isEmailConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

export function remainingCooldown(): number {
  try {
    const last = Number(localStorage.getItem(LAST_SENT_KEY) ?? 0)
    return Math.max(0, COOLDOWN_MS - (Date.now() - last))
  } catch {
    return 0
  }
}

function markSent() {
  try {
    localStorage.setItem(LAST_SENT_KEY, String(Date.now()))
  } catch {
    /* almacenamiento bloqueado: el límite del SDK sigue activo */
  }
}

export async function sendContact(data: ContactData) {
  if (!isEmailConfigured) throw new Error('not-configured')
  await emailjs.send(
    SERVICE_ID!,
    TEMPLATE_ID!,
    { from_name: data.name, reply_to: data.email, message: data.message },
    {
      publicKey: PUBLIC_KEY!,
      // Throttle del SDK, adicional al límite configurado en el dashboard de EmailJS
      limitRate: { id: 'portfolio-contact', throttle: COOLDOWN_MS },
    },
  )
  markSent()
}
