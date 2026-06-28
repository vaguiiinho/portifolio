import { techStack } from "@/lib/content"
import { getAboutContent } from "@/lib/content/localized"
import type { Locale } from "@/lib/locale"

interface TechStackProps {
  locale: Locale
}

export function TechStack({ locale }: TechStackProps) {
  const aboutContent = getAboutContent(locale)

  return (
    <div className="pt-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        {aboutContent.techStackTitle}
      </h3>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech.name}
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-accent/10 text-accent border border-accent/20"
          >
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  )
}
