"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"
import { FormField } from "@/components/ui/form-field"
import { contactContent } from "@/lib/content"
import { useContact } from "@/hooks/use-contact"

export function ContactForm() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const { submitContact, isSubmitting, error, success } = useContact()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const subject = String(formData.get("subject") ?? "").trim()
    const message = String(formData.get("message") ?? "").trim()

    await submitContact({
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: subject ? `Subject: ${subject}\n\n${message}` : message,
    })

    setStatusMessage("Mensagem enviada. Eu retorno em breve.")
    form.reset()
  }

  return (
    <FadeIn direction="right">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
            <FormField
            id="name"
            name="name"
            label={contactContent.formLabels.name}
            placeholder={contactContent.formPlaceholders.name}
            required
          />
          <FormField
            id="email"
            name="email"
            type="email"
            label={contactContent.formLabels.email}
            placeholder={contactContent.formPlaceholders.email}
            required
          />
        </div>

        <FormField
          id="subject"
          name="subject"
          label={contactContent.formLabels.subject}
          placeholder={contactContent.formPlaceholders.subject}
          required
        />

        <FormField
          id="message"
          name="message"
          label={contactContent.formLabels.message}
          placeholder={contactContent.formPlaceholders.message}
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
              {contactContent.submittingText}
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {contactContent.submitButton}
            </>
          )}
        </Button>

        {(statusMessage || success || error) && (
          <div
            className={`flex items-start gap-2 rounded-xl border p-4 text-sm ${
              error ? "border-red-500/30 bg-red-500/10 text-red-200" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
            }`}
          >
            {error ? (
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            <span>{error || success || statusMessage}</span>
          </div>
        )}
      </form>
    </FadeIn>
  )
}
