import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"
import { Container } from "./container"
import { servicesContent } from "@/lib/content"

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <Container>
        <FadeIn className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            {servicesContent.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {servicesContent.subtitle}
          </p>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          {servicesContent.cards.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.08}>
              <article className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
                <div className="mb-5 inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  Serviço {index + 1}
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
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-border bg-secondary/30 px-6 py-6 text-center md:flex-row md:text-left">
          <div className="max-w-2xl">
            <h3 className="text-xl font-semibold tracking-tight">
              Quer um escopo mais preciso?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              Eu posso adaptar a entrega para uma landing page, case study, painel interno ou API sob medida.
            </p>
          </div>

          <Button as="a" href="#contact" size="lg" className="rounded-full shrink-0">
            Pedir orçamento
            <ArrowRight className="h-4 w-4" />
          </Button>
        </FadeIn>
      </Container>
    </section>
  )
}
