import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { es, type Dictionary } from './es'
import { en } from './en'

export type Lang = 'es' | 'en'
const dictionaries: Record<Lang, Dictionary> = { es, en }
const STORAGE_KEY = 'lang'

function detectInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch {
    /* almacenamiento bloqueado: se ignora */
  }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

interface LanguageContextValue {
  lang: Lang
  t: Dictionary
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectInitialLang)
  const t = dictionaries[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignorado */
    }
  }, [lang, t])

  const toggle = useCallback(() => setLang((l) => (l === 'es' ? 'en' : 'es')), [])
  const value = useMemo(() => ({ lang, t, toggle }), [lang, t, toggle])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage debe usarse dentro de <LanguageProvider>')
  return ctx
}
