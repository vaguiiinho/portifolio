"use client"

import { Quote, Sparkles } from "lucide-react"
import { Container } from "./container"
import { MetricBeacon } from "./metric-beacon"
import { SectionHeader } from "./section-header"
import { getTestimonialsContent } from "@/lib/content/localized"
import type { Locale } from "@/lib/locale"
import { hasTestimonialsContent, resolveLocalizedField, type SiteContentField, type TestimonialsContent } from "@/lib/site-content"

interface TestimonialsProps {
  locale: Locale
  content?: SiteContentField<TestimonialsContent>
}

export function Testimonials({ locale, content }: TestimonialsProps) {
  const testimonialsContent = getTestimonialsContent(locale)
  const resolvedContent = resolveLocalizedField(content, locale, testimonialsContent)

  if (!hasTestimonialsContent(content, locale)) return null

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-secondary/20">
      <MetricBeacon eventKey="section:testimonials" />
      <Container>
        <SectionHeader
          title={testimonialsContent.title}
          subtitle={testimonialsContent.subtitle}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {resolvedContent.cards.map((item) => (
            <article
              key={`${item.name}-${item.company}`}
              className="relative h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
            >
              <Quote className="h-8 w-8 text-accent/30" />

              <p className="mt-6 text-base leading-7 text-foreground/90 text-pretty">
                {item.quote}
              </p>

              <div className="mt-6 space-y-4 border-t border-border pt-6">
                <div>
                  <h3 className="text-base font-semibold tracking-tight">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.role} • {item.company}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  <Sparkles className="h-3.5 w-3.5" />
                  {item.result}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {resolvedContent.trustPoints.map((point) => (
            <div
              key={point}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm"
            >
              {point}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
