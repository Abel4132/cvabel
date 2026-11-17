import { useLanguage } from '../../i18n/LanguageProvider'

export function SkipLink() {
  const { t } = useLanguage()
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-on-accent"
    >
      {t.a11y.skip}
    </a>
  )
}

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {t.footer.rights}
        </p>
        <p className="font-mono text-xs">{t.footer.built}</p>
      </div>
    </footer>
  )
}
