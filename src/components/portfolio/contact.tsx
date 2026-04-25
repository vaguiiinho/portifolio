"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "./container"
import { FadeIn } from "@/components/ui/fade-in"
import { FormField } from "@/components/ui/form-field"
import { socialLinks } from "@/data/navigation"
import { contactData } from "@/data/site"

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    // Reset form
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container>
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            {contactData.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {contactData.subtitle}
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <FadeIn direction="left" className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">{contactData.contactTitle}</h3>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                {contactData.contactDescription}
              </p>
            </div>

            {/* Social Links */}
            <FadeIn direction="left" className="space-y-4">
              {socialLinks.map((link) => (
                <div
                  key={link.name}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 hover:border-accent/50 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-secondary group-hover:bg-accent/10 transition-colors">
                    <link.icon className="h-5 w-5 group-hover:text-accent transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{link.name}</div>
                    <div className="text-sm text-muted-foreground">{link.username}</div>
                  </div>
                </div>
              ))}
            </FadeIn>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="right">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  id="name"
                  name="name"
                  label={contactData.formLabels.name}
                  placeholder={contactData.formPlaceholders.name}
                  required
                />
                <FormField
                  id="email"
                  name="email"
                  type="email"
                  label={contactData.formLabels.email}
                  placeholder={contactData.formPlaceholders.email}
                  required
                />
              </div>

              <FormField
                id="subject"
                name="subject"
                label={contactData.formLabels.subject}
                placeholder={contactData.formPlaceholders.subject}
                required
              />

              <FormField
                id="message"
                name="message"
                label={contactData.formLabels.message}
                placeholder={contactData.formPlaceholders.message}
                rows={5}
                required
              />

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    {contactData.submittingText}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {contactData.submitButton}
                  </>
                )}
              </Button>
            </form>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
