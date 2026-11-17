import { useTerminal, type TerminalLine } from '../../hooks/useTerminal'

const lineColor: Record<string, string> = {
  cmd: 'text-fg',
  out: 'text-muted',
  ok: 'text-ok',
}

function Line({ line, cursor = false }: { line: TerminalLine; cursor?: boolean }) {
  return (
    <div className={`whitespace-pre-wrap break-words ${lineColor[line.kind] ?? 'text-muted'}`}>
      {line.kind === 'cmd' && (
        <span className="select-none text-accent" aria-hidden="true">
          ${' '}
        </span>
      )}
      {line.text}
      {cursor && (
        <span
          className="cursor-blink ml-0.5 inline-block h-[1.1em] w-2 translate-y-[0.2em] bg-accent"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export function TerminalWindow({ title, lines }: { title: string; lines: TerminalLine[] }) {
  const { visible, typing, done } = useTerminal(lines)

  return (
    <div className="relative">
      {/* Halo */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/40 via-transparent to-ok/20 opacity-60 blur-xl"
        aria-hidden="true"
      />
      <figure className="relative overflow-hidden rounded-2xl border border-border-strong bg-surface/90 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-2 border-b border-border bg-surface-2/60 px-4 py-3">
          <span className="size-3 rounded-full bg-danger/80" aria-hidden="true" />
          <span className="size-3 rounded-full bg-warn/80" aria-hidden="true" />
          <span className="size-3 rounded-full bg-ok/80" aria-hidden="true" />
          <figcaption className="ml-3 truncate font-mono text-xs text-muted">{title}</figcaption>
        </div>

        {/* Texto completo para lectores de pantalla; la animación es decorativa */}
        <div className="sr-only">
          {lines.map((l, i) => (
            <p key={i}>{l.kind === 'cmd' ? `$ ${l.text}` : l.text}</p>
          ))}
        </div>

        {/* Altura reservada para evitar saltos de layout (CLS) */}
        <div
          className="min-h-[19.5rem] space-y-1 p-5 font-mono text-[13px] leading-relaxed sm:text-sm"
          aria-hidden="true"
        >
          {visible.map((l, i) => (
            <Line key={i} line={l} />
          ))}
          {typing && <Line line={typing} cursor />}
          {done && <Line line={{ kind: 'cmd', text: '' }} cursor />}
        </div>
      </figure>
    </div>
  )
}
