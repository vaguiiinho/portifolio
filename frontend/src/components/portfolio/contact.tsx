import { Container } from "./container"
import { ContactForm } from "./contact-form"
import { ContactInfo } from "./contact-info"
import { SectionHeader } from "./section-header"
import { getContactContent } from "@/lib/content/localized"
import type { Locale } from "@/lib/locale"

interface ContactProps {
  showHeader?: boolean
  locale: Locale
}

export function Contact({ showHeader = true, locale }: ContactProps) {
  const contactContent = getContactContent(locale)

  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container>
        {showHeader && (
          <SectionHeader className="mb-12" title={contactContent.title} subtitle={contactContent.subtitle} />
        )}

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <ContactInfo locale={locale} />
          <div id="contact-form">
            <ContactForm locale={locale} />
          </div>
        </div>
      </Container>
    </section>
  )
}
