import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'

const fieldBase =
  'w-full rounded-lg border bg-bg px-4 py-3 text-base text-fg placeholder:text-muted/60 ' +
  'transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40'

interface BaseProps {
  id: string
  label: string
  error?: string
  hint?: string
}

function Wrapper({ id, label, error, hint, children }: BaseProps & { children: ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {hint && (
          <span id={`${id}-hint`} className="font-mono text-xs text-muted">
            {hint}
          </span>
        )}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

const describedBy = (id: string, error?: string, hint?: string) =>
  [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined

export function InputField({ id, label, error, hint, ...rest }: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrapper id={id} label={label} error={error} hint={hint}>
      <input
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${fieldBase} ${error ? 'border-danger' : 'border-border-strong focus:border-accent'}`}
        {...rest}
      />
    </Wrapper>
  )
}

export function TextareaField({
  id,
  label,
  error,
  hint,
  ...rest
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrapper id={id} label={label} error={error} hint={hint}>
      <textarea
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${fieldBase} min-h-36 resize-y ${error ? 'border-danger' : 'border-border-strong focus:border-accent'}`}
        {...rest}
      />
    </Wrapper>
  )
}
