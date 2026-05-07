import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-black text-white hover:bg-neutral-800 active:bg-neutral-900',
  secondary: 'bg-gold text-white hover:bg-gold-dark active:bg-gold-dark',
  outline: 'border border-black text-black hover:bg-neutral-50 active:bg-neutral-100',
  ghost: 'text-black hover:bg-neutral-100 active:bg-neutral-200',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-xs tracking-widest',
  md: 'px-6 py-3 text-xs tracking-widest',
  lg: 'px-8 py-4 text-sm tracking-widest',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center
        font-medium uppercase transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black
        disabled:opacity-50 disabled:pointer-events-none
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
