"use client"

import { cn } from "@/lib/utils"

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export function SectionHeading({
  level = 2,
  className,
  ...props
}: SectionHeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Component
      className={cn(
        "text-2xl font-bold text-foreground",
        className
      )}
      {...props}
    />
  )
}