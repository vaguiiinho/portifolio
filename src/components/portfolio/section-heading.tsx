import { createElement, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export function SectionHeading({
  level = 2,
  className,
  ...props
}: SectionHeadingProps) {
  const headingLevel = Math.min(Math.max(level, 1), 6) as 1 | 2 | 3 | 4 | 5 | 6

  const HeadingComponent: Record<number, string> = {
    1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6'
  }

  return createElement(
    HeadingComponent[headingLevel],
    { className: cn("text-2xl font-bold text-foreground", className), ...props },
    null
  )
}