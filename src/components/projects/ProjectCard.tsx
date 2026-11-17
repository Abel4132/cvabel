import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Lock, ShieldCheck } from 'lucide-react'
import { GithubIcon } from '../ui/BrandIcons'
import { useLanguage } from '../../i18n/LanguageProvider'
import type { ProjectMeta } from '../../data/projects'
import { Badge } from '../ui/Badge'

interface Props {
  project: ProjectMeta
  onOpen: (project: ProjectMeta, trigger: HTMLButtonElement) => void
}

export const ProjectCard = forwardRef<HTMLLIElement, Props>(function ProjectCard({ project, onOpen }, ref) {
  const { t } = useLanguage()
  const item = t.projects.items[project.id]
  const labels = t.projects.labels

  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-2xl border border-border bg-surface/60 p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_50px_-24px_var(--color-accent)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs text-muted">{item.period}</span>
        {project.repo ? (
          <Badge tone="ok">
            <GithubIcon className="size-3" />
            {labels.public}
          </Badge>
        ) : (
          <Badge>
            <Lock className="size-3" aria-hidden="true" />
            {labels.private}
          </Badge>
        )}
      </div>

      <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
      <p className="mt-1 text-sm text-accent">{item.client}</p>
      <p className="mt-3 text-sm text-muted">{item.summary}</p>

      {item.security.length > 0 && (
        <p className="mt-4 flex items-center gap-2 text-sm text-ok">
          <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
          {item.security.length} {labels.security.toLowerCase()}
        </p>
      )}

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={labels.stack}>
        {project.stack.map((tech) => (
          <li key={tech}>
            <Badge tone="accent">{tech}</Badge>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={(e) => onOpen(project, e.currentTarget)}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-fg transition-colors hover:text-accent after:absolute after:inset-0 after:rounded-2xl after:content-['']"
        >
          {labels.details}
          <ArrowUpRight
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
          <span className="sr-only">: {item.title}</span>
        </button>
      </div>
    </motion.li>
  )
})
