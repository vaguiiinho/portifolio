import { Container } from "./container"
import { FadeIn } from "@/components/ui/fade-in"
import { techStack } from "@/data/navigation"
import { aboutData, siteConfig } from "@/data/site"

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-secondary/30">
      <Container>
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            {aboutData.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {aboutData.subtitle}
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Avatar / Image */}
          <FadeIn className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 to-accent/10 rounded-3xl blur-2xl" />

              {/* Avatar Placeholder */}
              <div className="relative aspect-square bg-gradient-to-br from-secondary to-muted rounded-2xl overflow-hidden border border-border flex items-center justify-center">
                <div className="text-9xl font-bold text-muted-foreground/20">
                  {siteConfig.name.charAt(0)}
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-accent/10 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
              </div>
            </div>
          </FadeIn>

          {/* Bio */}
          <FadeIn direction="right" className="space-y-6">
            <div className="prose prose-invert max-w-none">
              {aboutData.bio.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tech Stack */}
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
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
