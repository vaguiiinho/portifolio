import { Container } from "./container"
import { Avatar } from "./avatar"
import { TechStack } from "./tech-stack"
import { SectionHeader } from "./section-header"
import { getAboutContent } from "@/lib/content/localized"
import type { Locale } from "@/lib/locale"

interface AboutProps {
  siteName: string
  showHeader?: boolean
  locale: Locale
}

export function About({ siteName, showHeader = true, locale }: AboutProps) {
  const aboutContent = getAboutContent(locale)

  return (
    <section id="about" className="py-24 sm:py-32 bg-secondary/30">
      <Container>
        {showHeader && (
          <SectionHeader className="mb-12" title={aboutContent.title} subtitle={aboutContent.subtitle} />
        )}

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Avatar / Image */}
          <div className="relative">
            <Avatar siteName={siteName} />
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <div className="prose prose-invert max-w-none">
              {aboutContent.bio.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>

            <TechStack locale={locale} />
          </div>
        </div>
      </Container>
    </section>
  )
}
