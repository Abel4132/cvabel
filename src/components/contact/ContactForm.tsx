import { useMemo, useRef, useState, type FormEvent } from 'react'
import { CircleCheck, LoaderCircle, Send, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageProvider'
import { buildContactSchema, LIMITS, type ContactField } from '../../lib/contactSchema'
import { isEmailConfigured, MIN_FILL_MS, remainingCooldown, sendContact } from '../../lib/emailService'
import { Button } from '../ui/Button'
import { InputField, TextareaField } from './FormField'

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

const EMPTY = { name: '', email: '', message: '' }

export function ContactForm() {
  const { t } = useLanguage()
  const f = t.contact.form
  const schema = useMemo(() => buildContactSchema(t.contact.errors), [t])

  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const mountedAt = useRef(Date.now())
  const honeypot = useRef<HTMLInputElement>(null)

  const validate = (next = values) => {
    const result = schema.safeParse(next)
    const errs: Partial<Record<ContactField, string>> = {}
    if (result.success) return { data: result.data, errs }
    for (const issue of result.error.issues) {
      const key = issue.path[0] as ContactField
      errs[key] ??= issue.message
    }
    return { data: null, errs }
  }

  const update = (field: ContactField, value: string) => {
    const next = { ...values, [field]: value }
    setValues(next)
    // Validación en línea solo después de que el campo pierde el foco una vez
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validate(next).errs[field] }))
    if (status.kind !== 'idle' && status.kind !== 'sending') setStatus({ kind: 'idle' })
  }

  const blur = (field: ContactField) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validate().errs[field] }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status.kind === 'sending') return

    const { data, errs } = validate()
    setErrors(errs)
    setTouched({ name: true, email: true, message: true })
    if (!data) {
      const first = (['name', 'email', 'message'] as const).find((k) => errs[k])
      if (first) document.getElementById(first)?.focus()
      return
    }

    // Defensas anti-bot: honeypot lleno o envío inhumanamente rápido
    if (honeypot.current?.value || Date.now() - mountedAt.current < MIN_FILL_MS) {
      setStatus({ kind: 'error', message: f.tooFast })
      return
    }

    const wait = remainingCooldown()
    if (wait > 0) {
      setStatus({ kind: 'error', message: f.cooldown.replace('{s}', String(Math.ceil(wait / 1000))) })
      return
    }

    if (!isEmailConfigured) {
      setStatus({ kind: 'error', message: f.notConfigured })
      return
    }

    setStatus({ kind: 'sending' })
    try {
      await sendContact(data)
      setStatus({ kind: 'success' })
      setValues(EMPTY)
      setTouched({})
    } catch {
      setStatus({ kind: 'error', message: f.errorGeneric })
    }
  }

  const sending = status.kind === 'sending'

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-busy={sending}>
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          id="name"
          label={f.name}
          placeholder={f.namePh}
          autoComplete="name"
          maxLength={LIMITS.nameMax}
          required
          value={values.name}
          error={errors.name}
          onChange={(e) => update('name', e.target.value)}
          onBlur={() => blur('name')}
        />
        <InputField
          id="email"
          type="email"
          inputMode="email"
          label={f.email}
          placeholder={f.emailPh}
          autoComplete="email"
          maxLength={254}
          required
          value={values.email}
          error={errors.email}
          onChange={(e) => update('email', e.target.value)}
          onBlur={() => blur('email')}
        />
      </div>

      <TextareaField
        id="message"
        label={f.message}
        placeholder={f.messagePh}
        maxLength={LIMITS.messageMax}
        required
        rows={6}
        value={values.message}
        error={errors.message}
        hint={f.chars.replace('{n}', String(values.message.length)).replace('{max}', String(LIMITS.messageMax))}
        onChange={(e) => update('message', e.target.value)}
        onBlur={() => blur('message')}
      />

      {/* Honeypot: invisible para personas y lectores de pantalla; los bots lo llenan */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input ref={honeypot} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-muted">
          <ShieldCheck className="size-4 shrink-0 text-ok" aria-hidden="true" />
          {f.secureNote}
        </p>
        <Button type="submit" disabled={sending} className="sm:min-w-44">
          {sending ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {sending ? f.sending : f.submit}
        </Button>
      </div>

      <div aria-live="polite" role="status" className="min-h-6">
        {status.kind === 'success' && (
          <p className="flex items-center gap-2 rounded-lg border border-ok/30 bg-ok/10 px-4 py-3 text-sm text-ok">
            <CircleCheck className="size-4 shrink-0" aria-hidden="true" />
            {f.success}
          </p>
        )}
        {status.kind === 'error' && (
          <p className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
            {status.message}
          </p>
        )}
      </div>
    </form>
  )
}
