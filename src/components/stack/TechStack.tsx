import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageProvider'
import { skillCategories, type CategoryId } from '../../data/skills'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'

export function TechStack() {
  const { t } = useLanguage()
  const s = t.stack
  const [activeId, setActiveId] = useState<CategoryId>('security')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const active = skillCategories.find((c) => c.id === activeId)!
  const ActiveIcon = active.icon

  // Navegación por teclado del patrón WAI-ARIA Tabs
  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: skillCategories.length - 1,
    }
    if (!(e.key in keys)) return
    e.preventDefault()
    const next = (keys[e.key] + skillCategories.length) % skillCategories.length
    setActiveId(skillCategories[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <Section id="stack" eyebrow={s.eyebrow} title={s.title} intro={s.intro}>
      <Reveal className="grid gap-6 lg:grid-cols-[17rem_1fr]">
        <div
          role="tablist"
          aria-label={s.title}
          aria-orientation="vertical"
          className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1"
        >
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon
            const selected = cat.id === activeId
            return (
              <button
                key={cat.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={selected}
                aria-controls={`panel-${cat.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(cat.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative isolate flex min-h-12 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                  selected
                    ? 'border-accent/40 text-fg'
                    : 'border-border bg-surface/40 text-muted hover:border-border-strong hover:text-fg'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="stack-tab"
                    className="absolute inset-0 -z-10 rounded-xl bg-accent/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <Icon className={`size-5 shrink-0 ${selected ? 'text-accent' : ''}`} aria-hidden="true" />
                <span>{s.categories[cat.id].label}</span>
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          tabIndex={0}
          className="min-h-[22rem] rounded-2xl border border-border bg-surface/60 p-5 sm:p-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <ActiveIcon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{s.categories[active.id].label}</h3>
                  <p className="mt-1 text-sm text-muted">{s.categories[active.id].description}</p>
                </div>
              </div>

              <motion.ul
                className="mt-8 grid gap-3 sm:grid-cols-2"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.04 } } }}
              >
                {active.skills.map((skill) => (
                  <motion.li
                    key={skill.name}
                    variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                    className="group rounded-xl border border-border bg-bg/60 p-4 transition-[border-color,box-shadow] duration-200 hover:border-accent/50 hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-accent)_20%,transparent),0_8px_30px_-12px_var(--color-accent)]"
                  >
                    <p className="font-mono text-sm font-medium text-fg transition-colors group-hover:text-accent">
                      {skill.name}
                    </p>
                    {skill.key && <p className="mt-1 text-sm text-muted">{s.skills[skill.key]}</p>}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  )
}
