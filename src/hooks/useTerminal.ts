import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export interface TerminalLine {
  kind: string
  text: string
}

/**
 * Escribe los comandos carácter por carácter y muestra las salidas de golpe.
 * Con reduced-motion devuelve el estado final inmediatamente.
 */
export function useTerminal(lines: TerminalLine[]) {
  const reduce = useReducedMotion()
  const [state, setState] = useState({ lines, line: 0, char: 0 })

  // Reinicia la animación al cambiar de idioma (patrón "derivar estado de props")
  if (state.lines !== lines) setState({ lines, line: 0, char: 0 })

  const { line: lineIndex, char: charIndex } = state

  useEffect(() => {
    if (reduce || lineIndex >= lines.length) return
    const line = lines[lineIndex]
    const isCmd = line.kind === 'cmd'
    const typingChars = isCmd && charIndex < line.text.length
    const delay = typingChars ? 45 + Math.random() * 40 : isCmd ? 320 : 140
    const timeout = window.setTimeout(() => {
      setState((s) =>
        typingChars ? { ...s, char: s.char + 1 } : { ...s, line: s.line + 1, char: 0 },
      )
    }, delay)
    return () => window.clearTimeout(timeout)
  }, [reduce, lines, lineIndex, charIndex])

  if (reduce) return { visible: lines, typing: null as TerminalLine | null, done: true }

  const current = lines[lineIndex]
  const typing: TerminalLine | null = current
    ? { ...current, text: current.kind === 'cmd' ? current.text.slice(0, charIndex) : '' }
    : null
  return { visible: lines.slice(0, lineIndex), typing, done: lineIndex >= lines.length }
}
