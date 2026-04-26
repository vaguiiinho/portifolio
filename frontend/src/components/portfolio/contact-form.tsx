"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"
import { FormField } from "@/components/ui/form-field"
import { contactData } from "@/data/site"

export function ContactForm() {
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
  )
}