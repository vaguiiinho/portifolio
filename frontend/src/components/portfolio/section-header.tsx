interface SectionHeaderProps {
  title: string
  subtitle: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeader({ title, subtitle, align = "center", className }: SectionHeaderProps) {
  const alignmentClass = align === "center" ? "text-center" : "text-left"

  return (
    <div className={className ? `${className} ${alignmentClass}` : alignmentClass}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">{title}</h2>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
        {subtitle}
      </p>
    </div>
  )
}
