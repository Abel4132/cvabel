import { Fragment } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'

/** Cadena simple de capas: vertical en móvil, horizontal en pantallas anchas. */
export function ArchitectureDiagram({ layers, label }: { layers: string[]; label: string }) {
  return (
    <ol
      aria-label={label}
      className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center"
    >
      {layers.map((layer, i) => (
        <Fragment key={layer}>
          <li className="rounded-lg border border-border-strong bg-bg px-3 py-2 text-center font-mono text-xs text-fg">
            {layer}
          </li>
          {i < layers.length - 1 && (
            <li aria-hidden="true" className="flex justify-center text-accent">
              <ArrowDown className="size-4 sm:hidden" />
              <ArrowRight className="hidden size-4 sm:block" />
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  )
}
