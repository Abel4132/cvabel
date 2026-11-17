import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Languages, Menu, X } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageProvider'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cvHref } from '../../lib/paths'

export const SECTION_IDS = ['home', 'stack', 'projects', 'experience', 'contact'] as const

export function Navbar() {
  const { t, lang, toggle } = useLanguage()
  const active = useActiveSection(SECTION_IDS)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cierra el menú móvil con Escape y devuelve el foco al botón
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const links = SECTION_IDS.filter((id) => id !== 'home').map((id) => ({ id, label: t.nav[id] }))

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? 'border-b border-border bg-bg/80 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label={t.a11y.primaryNav}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a href="#home" className="group flex items-center gap-2 font-mono text-sm font-semibold">
          <span className="text-accent">~/</span>
          <span className="transition-colors group-hover:text-accent">abel.uc</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                  active === id ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {label}
                {active === id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-3 -bottom-px h-px bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={t.a11y.switchLang}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-lg border border-border px-3 font-mono text-xs uppercase text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Languages className="size-4" aria-hidden="true" />
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a
            href={cvHref}
            download
            className="hidden min-h-11 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-strong sm:inline-flex"
          >
            <Download className="size-4" aria-hidden="true" />
            {t.nav.cv}
          </a>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-fg md:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25 }}
            className="border-t border-border md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
              {links.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === id ? 'true' : undefined}
                    className={`flex min-h-11 items-center rounded-lg px-3 text-base ${
                      active === id ? 'bg-surface text-accent' : 'text-fg hover:bg-surface'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={cvHref}
                  download
                  className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-accent font-semibold text-on-accent"
                >
                  <Download className="size-4" aria-hidden="true" />
                  {t.hero.ctaPrimary}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
