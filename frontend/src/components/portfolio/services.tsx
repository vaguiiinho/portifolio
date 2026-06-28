import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "./container"
import { MetricBeacon } from "./metric-beacon"
import { SectionHeader } from "./section-header"
import { getServicesContent } from "@/lib/content/localized"
import { portfolioRoutes } from "@/lib/routes"
import type { Locale } from "@/lib/locale"
import { resolveLocalizedField, type SiteContentField, type ServicesContent } from "@/lib/site-content"

interface ServicesProps {
  showHeader?: boolean
  showActions?: boolean
  locale: Locale
  content?: SiteContentField<ServicesContent>
}

export function Services({ showHeader = true, showActions = true, locale, content }: ServicesProps) {
  const servicesContent = getServicesContent(locale)
  const resolvedContent = resolveLocalizedField(content, locale, servicesContent)

  return (
    <section id="services" className="py-24 sm:py-32">
      <MetricBeacon eventKey="section:services" />
      <Container>
        {showHeader && (
          <SectionHeader className="mb-12" title={servicesContent.title} subtitle={servicesContent.subtitle} />
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {resolvedContent.cards.map((service, index) => (
            <article
              key={service.title}
              className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="mb-5 inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                {locale === "en" ? `Service ${index + 1}` : `Serviço ${index + 1}`}
              </div>

              <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground text-pretty">
                {service.description}
              </p>

              <div className="mt-6 space-y-3">
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {showActions && (
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-border bg-secondary/30 px-6 py-6 text-center md:flex-row md:text-left">
            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold tracking-tight">{resolvedContent.ctaTitle}</h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">
                {resolvedContent.ctaDescription}
              </p>
            </div>

            <Button
              as="a"
              href={portfolioRoutes.contact}
              size="lg"
              className="rounded-full shrink-0"
              metricKey="cta:services-contact"
            >
              {resolvedContent.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Container>
    </section>
  )
}
