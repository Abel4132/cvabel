import type { ReactNode } from 'react'

type Tone = 'neutral' | 'accent' | 'ok'

const tones: Record<Tone, string> = {
  neutral: 'border-border bg-surface-2 text-muted',
  accent: 'border-accent/30 bg-accent/10 text-accent',
  ok: 'border-ok/30 bg-ok/10 text-ok',
}

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-xs ${tones[tone]}`}
    >
      {children}
    </span>
  )
}
