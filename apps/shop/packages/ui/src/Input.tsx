import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-xs tracking-wider uppercase text-neutral-600">
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        className={`
          w-full border border-neutral-300 px-3 py-2.5 text-sm
          placeholder:text-neutral-400
          focus:outline-none focus:border-black transition-colors
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
