import { cn } from "@/lib/utils"

const BADGE_VARIANTS = {
  default: "bg-secondary text-secondary-foreground",
  glow: "bg-accent/10 text-accent border border-accent/20 shadow-sm shadow-accent/20",
} as const

type BadgeVariant = keyof typeof BADGE_VARIANTS

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 text-xs font-medium rounded-full transition-colors",
        BADGE_VARIANTS[variant], // ← Type-safe
        className
      )}
      {...props}
    />
  )
}