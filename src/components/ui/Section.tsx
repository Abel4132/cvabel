import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  intro?: string
  children: ReactNode
}

export function Section({ id, eyebrow, title, intro, children }: SectionProps) {
  const headingId = `${id}-title`
  return (
    <section id={id} aria-labelledby={headingId} className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 max-w-2xl sm:mb-14">
          <p className="font-mono text-sm text-accent">// {eyebrow}</p>
          <h2 id={headingId} className="mt-2 text-3xl font-semibold sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-muted">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
