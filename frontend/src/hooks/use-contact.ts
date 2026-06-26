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
      setSuccess("Message sent successfully.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
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
