import * as React from 'react'
import { cn } from '@/lib/utils'

export function Textarea({ className, ...props }: React.ComponentPropsWithoutRef<'textarea'>) {
  return (
    <textarea
      className={cn(
        'w-full rounded-xl border border-input bg-card px-3 py-2 text-base transition focus-visible:ring-2 focus-visible:ring-accent/40 outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none',
        className,
      )}
      {...props}
    />
  )
}
