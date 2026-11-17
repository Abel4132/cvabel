import { lazy, Suspense, useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageProvider'
import { profile } from '../../data/profile'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

// Zod + EmailJS solo se descargan cuando la sección de contacto se monta
const ContactForm = lazy(() => import('./ContactForm').then((m) => ({ default: m.ContactForm })))

export function Contact() {
  const { t } = useLanguage()
  const c = t.contact
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const links = [
    { href: profile.github, label: 'GitHub', handle: profile.githubHandle, Icon: GithubIcon },
    { href: profile.linkedin, label: 'LinkedIn', handle: profile.linkedinHandle, Icon: LinkedinIcon },
  ]

  return (
    <Section id="contact" eyebrow={c.eyebrow} title={c.title} intro={c.intro}>
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <Reveal className="rounded-2xl border border-border bg-surface/60 p-5 sm:p-8">
          <Suspense fallback={<div className="min-h-[26rem]" aria-hidden="true" />}>
            <ContactForm />
          </Suspense>
        </Reveal>

        <Reveal delay={0.08} className="space-y-3">
          <h3 className="font-mono text-sm text-accent">{c.direct}</h3>

          <div className="flex items-center gap-2 rounded-xl border border-border bg-surface/60 p-2 pl-4">
            <Mail className="size-5 shrink-0 text-accent" aria-hidden="true" />
            <a
              href={`mailto:${profile.email}`}
              className="min-w-0 flex-1 truncate py-2 text-sm hover:text-accent"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? c.copied : c.copy}
              className="grid size-11 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-accent"
            >
              {copied ? <Check className="size-4 text-ok" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? c.copied : ''}
            </span>
          </div>

          {links.map(({ href, label, handle, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-14 items-center gap-4 rounded-xl border border-border bg-surface/60 px-4 py-3 transition-colors duration-200 hover:border-accent/40"
            >
              <Icon className="size-5 shrink-0 text-muted transition-colors group-hover:text-accent" />
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{label}</span>
                <span className="block truncate font-mono text-xs text-muted">{handle}</span>
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </Section>
  )
}
