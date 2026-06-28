"use client"

import { useState } from "react"
import { sendContact, type ContactPayload } from "@/lib/api"

export function useContact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function submitContact(payload: ContactPayload) {
    try {
      setIsSubmitting(true)
      setError(null)
      setSuccess(null)
      await sendContact(payload)
      setSuccess("Mensagem enviada com sucesso.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao enviar a mensagem")
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    submitContact,
    isSubmitting,
    error,
    success,
  }
}
