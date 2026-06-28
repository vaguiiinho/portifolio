"use client"

import { useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2, PencilLine, X } from "lucide-react"
import { RemoveScroll } from "react-remove-scroll"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { updateConfig } from "@/lib/api"
import type { Locale } from "@/lib/locale"
import type { SiteConfig } from "@/lib/site-config"

interface SiteConfigModalProps {
  open: boolean
  config: SiteConfig
  onClose: () => void
  onSaved: () => Promise<void> | void
  locale: Locale
}

export function SiteConfigModal({ open, config, onClose, onSaved, locale }: SiteConfigModalProps) {
  const [siteName, setSiteName] = useState(config.siteName)
  const [description, setDescription] = useState(config.description)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedSiteName = siteName.trim()
    const trimmedDescription = description.trim()

    if (trimmedSiteName.length < 2) {
      setError(locale === "en" ? "Site name must have at least 2 characters." : "O nome do site deve ter pelo menos 2 caracteres.")
      return
    }

    if (trimmedDescription.length < 10) {
      setError(
        locale === "en"
          ? "Description must have at least 10 characters."
          : "A descrição deve ter pelo menos 10 caracteres.",
      )
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      await updateConfig({
        siteName: trimmedSiteName,
        description: trimmedDescription,
      })

      await onSaved()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : locale === "en" ? "Failed to save site settings." : "Falha ao salvar as configurações do site.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <RemoveScroll enabled>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />

            <motion.form
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              onSubmit={handleSubmit}
              className="relative w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full bg-secondary/80 p-2 transition-colors hover:bg-secondary"
                aria-label={locale === "en" ? "Close modal" : "Fechar modal"}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-8 p-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                    <PencilLine className="h-4 w-4" />
                    {locale === "en" ? "Site settings" : "Configurações do site"}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {locale === "en" ? "Edit site identity" : "Editar identidade do site"}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground text-pretty">
                      {locale === "en"
                        ? "Update the name and description used across the public pages."
                        : "Atualize o nome e a descrição usados nas páginas públicas."}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5">
                  <FormField
                    id="site-name"
                    name="siteName"
                    label={locale === "en" ? "Site name" : "Nome do site"}
                    placeholder={locale === "en" ? "Your public name" : "Seu nome público"}
                    required
                    value={siteName}
                    onChange={(event) => setSiteName(event.target.value)}
                  />
                  <FormField
                    id="site-description"
                    name="description"
                    label={locale === "en" ? "Description" : "Descrição"}
                    placeholder={locale === "en" ? "Short positioning statement" : "Frase curta de apresentação"}
                    rows={4}
                    required
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border pt-4">
                  <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
                    {locale === "en" ? "Cancel" : "Cancelar"}
                  </Button>
                  <Button type="submit" className="rounded-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {locale === "en" ? "Saving" : "Salvando"}
                      </>
                    ) : (
                      <>
                        <PencilLine className="h-4 w-4" />
                        {locale === "en" ? "Save changes" : "Salvar alterações"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.form>
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  )
}
