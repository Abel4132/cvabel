import { useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageProvider'
import { ButtonLink } from '../ui/Button'
import { cvHref } from '../../lib/paths'
import { TerminalWindow } from './TerminalWindow'

const ease = [0.16, 1, 0.3, 1] as const
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

/** Halo cian que sigue al cursor (solo con puntero fino y sin reduced-motion). */
function CursorGlow() {
  const reduce = useReducedMotion()
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 120, damping: 20 })
  const sy = useSpring(y, { stiffness: 120, damping: 20 })
  const background = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 70%)`

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY + window.scrollY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, x, y])

  if (reduce) return null
  return <motion.div className="pointer-events-none absolute inset-0" style={{ background }} aria-hidden="true" />
}

export function Hero() {
  const { t } = useLanguage()
  const h = t.hero

  return (
    <section id="home" aria-labelledby="home-title" className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 -z-10 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <CursorGlow />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <motion.div variants={{ show: { transition: { staggerChildren: 0.08 } } }} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-ok/30 bg-ok/10 px-3 py-1 font-mono text-xs text-ok"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
            {h.status}
          </motion.p>

          <motion.h1 id="home-title" variants={item} className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
            <span className="block text-lg font-medium text-muted sm:text-xl">{h.greeting}</span>
            <span className="text-gradient">{h.name}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-3 font-mono text-sm text-accent sm:text-base">
            {h.role}
          </motion.p>

          <motion.p variants={item} className="mt-6 text-xl font-medium leading-snug sm:text-2xl">
            {h.headline}
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-xl text-muted">
            {h.summary}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={cvHref} download>
              <Download className="size-4" aria-hidden="true" />
              {h.ctaPrimary}
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost" className="group">
              {h.ctaSecondary}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
          </motion.div>

          <motion.dl variants={item} className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {h.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-muted sm:text-sm">{m.label}</dt>
                <dd className="font-mono text-2xl font-semibold text-fg sm:text-3xl">{m.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
        >
          <TerminalWindow title={h.terminal.title} lines={h.terminal.lines} />
        </motion.div>
      </div>
    </section>
  )
}
