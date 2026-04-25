import { FadeIn } from "@/components/ui/fade-in"
import { techStack } from "@/data/navigation"
import { aboutData } from "@/data/site"

export function TechStack() {
  return (
    <div className="pt-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        {aboutData.techStackTitle}
      </h3>
      <FadeIn direction="up" className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech.name}
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-accent/10 text-accent border border-accent/20"
          >
            {tech.name}
          </span>
        ))}
      </FadeIn>
    </div>
  )
}