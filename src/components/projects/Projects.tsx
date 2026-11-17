import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageProvider'
import { projects, type ProjectCategory, type ProjectMeta } from '../../data/projects'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'

type Filter = 'all' | ProjectCategory
const FILTERS: Filter[] = ['all', 'security', 'backend', 'fullstack']

export function Projects() {
  const { t } = useLanguage()
  const p = t.projects
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<ProjectMeta | null>(null)
  const trigger = useRef<HTMLButtonElement | null>(null)

  const visible = filter === 'all' ? projects : projects.filter((pr) => pr.categories.includes(filter))
  const count = (f: Filter) => (f === 'all' ? projects.length : projects.filter((pr) => pr.categories.includes(f)).length)

  return (
    <Section id="projects" eyebrow={p.eyebrow} title={p.title} intro={p.intro}>
      <Reveal>
        <div role="group" aria-label={p.title} className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = f === filter
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                className={`relative isolate inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 ${
                  active ? 'border-accent/50 text-fg' : 'border-border text-muted hover:border-border-strong hover:text-fg'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-accent/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                {p.filters[f]}
                <span className="font-mono text-xs text-muted">{count(f)}</span>
              </button>
            )
          })}
        </div>
      </Reveal>

      <motion.ul layout className="grid gap-5 sm:grid-cols-2" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={(pr, btn) => {
                trigger.current = btn
                setSelected(pr)
              }}
            />
          ))}
        </AnimatePresence>
      </motion.ul>

      <ProjectModal
        project={selected}
        onClose={() => {
          setSelected(null)
          trigger.current?.focus()
        }}
      />
    </Section>
  )
}
