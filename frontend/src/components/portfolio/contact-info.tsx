import { ArrowRight, BriefcaseBusiness, MessageSquareMore } from "lucide-react"
import { AppLink } from "@/components/ui/app-link"
import { FadeIn } from "@/components/ui/fade-in"
import { SocialLinksCard } from "./social-links-card"
import type { Locale } from "@/lib/locale"
import type { ContactContent } from "@/lib/site-content"

interface ContactInfoProps {
  locale: Locale
  content: ContactContent
}

export function ContactInfo({ locale, content: contactContent }: ContactInfoProps) {

  const ctaBaseClass =
    "inline-flex items-center justify-center transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 h-8 px-3 py-2 gap-1.5 rounded-full text-sm"
  const primaryCtaClass = `${ctaBaseClass} bg-primary text-primary-foreground hover:bg-primary/90`
  const secondaryCtaClass = `${ctaBaseClass} border border-input bg-background hover:bg-secondary`

  return (
    <FadeIn direction="left" className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-2">{contactContent.contactTitle}</h3>
        <p className="text-muted-foreground text-pretty leading-relaxed">
          {contactContent.contactDescription}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          {contactContent.contactNote}
        </p>
      </div>

      <div className="grid gap-4">
        {contactContent.paths.map((path, index) => {
          const isRecruiter = index === 0
          const Icon = isRecruiter ? BriefcaseBusiness : MessageSquareMore

          return (
            <article
              key={path.title}
              className="rounded-3xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-secondary p-3 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold">{path.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground text-pretty">
                    {path.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <AppLink href={path.ctaHref} className={primaryCtaClass}>
                      {path.ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </AppLink>

                    <AppLink href={path.secondaryHref} className={secondaryCtaClass}>
                      {path.secondaryLabel}
                    </AppLink>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <SocialLinksCard />
    </FadeIn>
  )
}
