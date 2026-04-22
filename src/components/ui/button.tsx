import * as React from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'

type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'

const variantStyles: Record<ButtonVariant, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive: 'bg-destructive text-white hover:bg-destructive/90',
  outline: 'border border-input bg-background hover:bg-secondary',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'bg-transparent hover:bg-accent/10',
  link: 'text-primary underline-offset-4 hover:underline',
}

const sizeStyles: Record<ButtonSize, string> = {
  default: 'h-9 px-4 py-2 gap-2 rounded-md',
  sm: 'h-8 px-3 py-2 gap-1.5 rounded-md text-sm',
  lg: 'h-10 px-6 gap-2 rounded-md',
  icon: 'h-9 w-9 p-2',
  'icon-sm': 'h-8 w-8 p-2',
  'icon-lg': 'h-10 w-10 p-2',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  as?: 'button' | 'a'
  href?: string
}

export function Button({
  variant = 'default',
  size = 'default',
  as = 'button',
  className,
  ...props
}: ButtonProps) {
  const Component = as === 'a' ? 'a' : 'button'

  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  )
}
