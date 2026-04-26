import { Container } from "./container"
import { FadeIn } from "@/components/ui/fade-in"
import { Avatar } from "./avatar"
import { TechStack } from "./tech-stack"
import { aboutData } from "@/data/site"

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
            <Avatar />
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

            <TechStack />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
