import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageProvider'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'

export function Timeline() {
  const { t } = useLanguage()
  const x = t.experience
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <Section id="experience" eyebrow={x.eyebrow} title={x.title}>
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <ol ref={listRef} className="relative space-y-10 pl-10 sm:pl-12">
          {/* Riel y progreso del scroll */}
          <span className="absolute top-2 bottom-2 left-[15px] w-px bg-border sm:left-[19px]" aria-hidden="true" />
          <motion.span
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[15px] w-px origin-top bg-gradient-to-b from-accent via-accent to-ok sm:left-[19px]"
            aria-hidden="true"
          />

          {x.roles.map((role, i) => (
            <li key={role.id} className="relative">
              <span
                className="absolute top-1 -left-10 grid size-8 place-items-center rounded-full border border-accent/40 bg-bg text-accent sm:-left-12 sm:size-10"
                aria-hidden="true"
              >
                <Briefcase className="size-4" />
              </span>
              <Reveal delay={i * 0.05} y={24}>
                <article className="rounded-2xl border border-border bg-surface/60 p-5 transition-colors duration-300 hover:border-accent/30 sm:p-6">
                  <p className="font-mono text-xs text-accent">{role.period}</p>
                  <h3 className="mt-2 text-lg font-semibold sm:text-xl">{role.role}</h3>
                  <p className="text-sm text-muted">{role.org}</p>
                  <ul className="mt-4 space-y-2">
                    {role.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm text-fg/90">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                    {role.tech.map((tech) => (
                      <li key={tech}>
                        <Badge tone="accent">{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <aside className="space-y-8">
          <Reveal>
            <h3 className="flex items-center gap-2 font-mono text-sm text-accent">
              <GraduationCap className="size-4" aria-hidden="true" />
              {x.educationTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              {x.education.map((ed) => (
                <li key={ed.title} className="rounded-xl border border-border bg-surface/60 p-4">
                  <p className="font-mono text-xs text-muted">{ed.period}</p>
                  <p className="mt-1 font-semibold">{ed.title}</p>
                  <p className="text-sm text-muted">{ed.org}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="font-mono text-sm text-accent">{x.softTitle}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {x.soft.map((s) => (
                <li key={s} className="rounded-full border border-border px-3 py-1 text-sm text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="font-mono text-sm text-accent">{x.langTitle}</h3>
            <ul className="mt-4 space-y-1 text-sm">
              {x.languages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </Reveal>
        </aside>
      </div>
    </Section>
  )
}
