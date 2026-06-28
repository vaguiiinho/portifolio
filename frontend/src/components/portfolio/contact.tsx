import { Container } from "./container"
import { ContactForm } from "./contact-form"
import { ContactInfo } from "./contact-info"
import { SectionHeader } from "./section-header"
import { contactContent } from "@/lib/content"

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container>
        <SectionHeader className="mb-12" title={contactContent.title} subtitle={contactContent.subtitle} />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <ContactInfo />
          <div id="contact-form">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  )
}
