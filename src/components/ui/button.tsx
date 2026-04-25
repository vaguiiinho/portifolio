import * as React from 'react'
import Link from 'next/link'
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

type ButtonBaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

type ButtonAsButtonProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button'
  }

type ButtonAsAnchorProps = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a'
    href: string
    isExternal?: boolean // Para links externos
  }

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps

export function Button({
  variant = 'default',
  size = 'default',
  as = 'button',
  className,
  ...props
}: ButtonProps) {
  const classNames = cn(
    'inline-flex items-center justify-center transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
    variantStyles[variant],
    sizeStyles[size],
    className,
  )

  if (as === 'a') {
    const { isExternal = false, ...anchorProps } = props as ButtonAsAnchorProps & { isExternal?: boolean }

    if (isExternal) {
      return <a className={classNames} {...anchorProps} />
    }

    return (
      <Link className={classNames} {...anchorProps} />
    )
  }

  return (
    <button className={classNames} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} />
  )
}
