import { Container } from "./container"
import { FadeIn } from "@/components/ui/fade-in"
import { ContactForm } from "./contact-form"
import { ContactInfo } from "./contact-info"
import { contactContent } from "@/lib/content"

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container>
        <FadeIn className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            {contactContent.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {contactContent.subtitle}
          </p>
        </FadeIn>

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
