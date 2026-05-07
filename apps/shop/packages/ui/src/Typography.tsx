import type { ReactNode, ElementType, HTMLAttributes } from 'react'

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small' | 'label' | 'price'
  children: ReactNode
}

const variantMap: Record<NonNullable<TypographyProps['variant']>, { tag: ElementType; classes: string }> = {
  h1: { tag: 'h1', classes: 'text-4xl md:text-5xl font-light tracking-tight leading-tight' },
  h2: { tag: 'h2', classes: 'text-2xl md:text-3xl font-light tracking-tight' },
  h3: { tag: 'h3', classes: 'text-xl font-light tracking-tight' },
  h4: { tag: 'h4', classes: 'text-base font-medium tracking-wide' },
  body: { tag: 'p', classes: 'text-sm text-neutral-700 leading-relaxed' },
  small: { tag: 'p', classes: 'text-xs text-neutral-500' },
  label: { tag: 'span', classes: 'text-xs tracking-widest uppercase font-medium' },
  price: { tag: 'span', classes: 'text-lg font-medium' },
}

export function Typography({
  as,
  variant = 'body',
  className = '',
  children,
  ...props
}: TypographyProps) {
  const { tag: DefaultTag, classes } = variantMap[variant]
  const Tag = as ?? DefaultTag
  return (
    <Tag {...props} className={`${classes} ${className}`}>
      {children}
    </Tag>
  )
}
