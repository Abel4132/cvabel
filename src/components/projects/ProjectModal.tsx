import { useEffect, useRef } from 'react'
import { CircleCheck, ExternalLink, Lock, ShieldCheck, X } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageProvider'
import type { ProjectMeta } from '../../data/projects'
import { Badge } from '../ui/Badge'
import { ArchitectureDiagram } from './ArchitectureDiagram'

interface Props {
  project: ProjectMeta | null
  onClose: () => void
}

/**
 * Usa <dialog> nativo: atrapa el foco, cierra con Escape y
 * devuelve el foco al disparador sin JavaScript adicional.
 */
export function ProjectModal({ project, onClose }: Props) {
  const { t } = useLanguage()
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else if (!project && dialog.open) {
      dialog.close()
    }
  }, [project])

  const handleClose = () => {
    document.body.style.overflow = ''
    onClose()
  }

  const item = project ? t.projects.items[project.id] : null
  const labels = t.projects.labels

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close() // clic en el backdrop
      }}
      aria-labelledby="project-modal-title"
      className="project-dialog m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl border border-border-strong bg-surface p-0 text-fg backdrop:bg-bg/80 backdrop:backdrop-blur-sm"
    >
      {project && item && (
        <article className="p-6 sm:p-8">
          <header className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-muted">
                {item.period} · {item.client}
              </p>
              <h3 id="project-modal-title" className="mt-2 text-2xl font-semibold sm:text-3xl">
                {item.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label={t.a11y.close}
              className="grid size-11 shrink-0 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </header>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <section>
              <h4 className="font-mono text-xs uppercase tracking-wider text-danger">{labels.problem}</h4>
              <p className="mt-2 text-sm text-muted">{item.problem}</p>
            </section>
            <section>
              <h4 className="font-mono text-xs uppercase tracking-wider text-accent">{labels.solution}</h4>
              <p className="mt-2 text-sm text-muted">{item.solution}</p>
            </section>
          </div>

          <section className="mt-6">
            <h4 className="font-mono text-xs uppercase tracking-wider text-ok">{labels.impact}</h4>
            <ul className="mt-3 space-y-2">
              {item.impact.map((point) => (
                <li key={point} className="flex gap-2 text-sm">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-ok" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </section>

          {item.security.length > 0 && (
            <section className="mt-6 rounded-xl border border-ok/20 bg-ok/5 p-4">
              <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ok">
                <ShieldCheck className="size-4" aria-hidden="true" />
                {labels.security}
              </h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {item.security.map((control) => (
                  <li key={control} className="flex gap-2 text-sm text-fg">
                    <span className="font-mono text-ok" aria-hidden="true">
                      ✓
                    </span>
                    {control}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-6">
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted">{labels.architecture}</h4>
            <div className="mt-3">
              <ArchitectureDiagram layers={project.architecture} label={labels.architecture} />
            </div>
          </section>

          <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <ul className="flex flex-wrap gap-1.5" aria-label={labels.stack}>
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Badge tone="accent">{tech}</Badge>
                </li>
              ))}
            </ul>
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent hover:underline"
              >
                {labels.viewRepo}
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm text-muted">
                <Lock className="size-4" aria-hidden="true" />
                {labels.private}
              </span>
            )}
          </footer>
        </article>
      )}
    </dialog>
  )
}
