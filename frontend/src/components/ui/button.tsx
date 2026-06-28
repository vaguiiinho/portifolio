"use client"

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { trackStatsEvent } from '@/lib/analytics'

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
  metricKey?: string
}

type ButtonAsButtonProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button'
  }

type ButtonAsAnchorProps = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a'
    href: string
    isExternal?: boolean
  }

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps

export function Button({
  variant = 'default',
  size = 'default',
  as = 'button',
  className,
  metricKey,
  ...props
}: ButtonProps) {
  const classNames = cn(
    'inline-flex items-center justify-center transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
    variantStyles[variant],
    sizeStyles[size],
    className,
  )

  if (as === 'a') {
    const { isExternal = false, onClick, ...anchorProps } = props as ButtonAsAnchorProps & { isExternal?: boolean }
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      trackStatsEvent(metricKey ?? '')
      onClick?.(event)
    }

    if (isExternal) {
      return <a className={classNames} onClick={handleClick} {...anchorProps} />
    }

    return <Link className={classNames} onClick={handleClick} {...anchorProps} />
  }

  const { onClick, ...buttonProps } = props as React.ButtonHTMLAttributes<HTMLButtonElement>
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    trackStatsEvent(metricKey ?? '')
    onClick?.(event)
  }

  return <button className={classNames} onClick={handleClick} {...buttonProps} />
}
