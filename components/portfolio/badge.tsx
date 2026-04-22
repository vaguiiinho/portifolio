"use client"

import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "outline" | "glow"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-secondary text-secondary-foreground": variant === "default",
          "border border-border bg-transparent text-muted-foreground": variant === "outline",
          "bg-accent/10 text-accent border border-accent/20": variant === "glow",
        },
        className
      )}
    >
      {children}
    </span>
  )
}
