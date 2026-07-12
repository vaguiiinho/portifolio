"use client"

import { useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2, PencilLine, Languages, Plus, Trash2, X } from "lucide-react"
import { RemoveScroll } from "react-remove-scroll"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { updateConfig } from "@/lib/api"
import { getAboutContent, getServicesContent, getTestimonialsContent } from "@/lib/content/localized"
import { type Locale } from "@/lib/locale"
import type { SiteConfig } from "@/lib/site-config"
import {
  type LocalizedContent,
  type ServicesContent,
  type TestimonialsContent,
} from "@/lib/site-content"

interface SiteContentModalProps {
  open: boolean
  config: SiteConfig
  onClose: () => void
  onSaved: () => Promise<void> | void
  locale: Locale
}

interface LocaleDraft {
  aboutBio: string[]
  servicesContent: ServicesContent
  testimonialsContent: TestimonialsContent
}

type DraftsByLocale = Record<Locale, LocaleDraft>

function cloneServicesContent(value: ServicesContent): ServicesContent {
  return {
    ctaTitle: value.ctaTitle,
    ctaDescription: value.ctaDescription,
    ctaLabel: value.ctaLabel,
    cards: value.cards.map((card) => ({
      title: card.title,
      description: card.description,
      deliverables: [...card.deliverables],
    })),
  }
}

function cloneTestimonialsContent(value: TestimonialsContent): TestimonialsContent {
  return {
    cards: value.cards.map((card) => ({
      quote: card.quote,
      name: card.name,
      role: card.role,
      company: card.company,
      result: card.result,
    })),
    trustPoints: [...value.trustPoints],
  }
}

function resolveLocalizedValue<T>(value: T | LocalizedContent<T> | undefined, locale: Locale, fallback: T): T {
  if (!value) {
    return fallback
  }

  if (typeof value === "object" && !Array.isArray(value) && ("pt" in value || "en" in value)) {
    const localized = value as LocalizedContent<T>
    return localized[locale] ?? localized.pt ?? localized.en ?? fallback
  }

  return value as T
}

function normalizeLocaleDraft(locale: Locale, config: SiteConfig): LocaleDraft {
  const aboutFallback = getAboutContent(locale)
  const servicesFallback = getServicesContent(locale)
  const testimonialsFallback = getTestimonialsContent(locale)

  const aboutBio = resolveLocalizedValue(config.aboutBio, locale, aboutFallback.bio)
  const servicesContent = resolveLocalizedValue(config.servicesContent, locale, servicesFallback)
  const testimonialsContent = resolveLocalizedValue(
    config.testimonialsContent,
    locale,
    testimonialsFallback,
  )

  return {
    aboutBio: [...aboutBio],
    servicesContent: cloneServicesContent(servicesContent),
    testimonialsContent: cloneTestimonialsContent(testimonialsContent),
  }
}

function buildInitialDrafts(config: SiteConfig): DraftsByLocale {
  return {
    pt: normalizeLocaleDraft("pt", config),
    en: normalizeLocaleDraft("en", config),
  }
}

export function SiteContentModal({ open, config, onClose, onSaved, locale }: SiteContentModalProps) {
  const [activeLocale, setActiveLocale] = useState<Locale>(locale)
  const [drafts, setDrafts] = useState<DraftsByLocale>(() => buildInitialDrafts(config))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentDraft = drafts[activeLocale]

  function updateCurrentDraft(updater: (draft: LocaleDraft) => LocaleDraft) {
    setDrafts((current) => ({
      ...current,
      [activeLocale]: updater(current[activeLocale]),
    }))
  }

  function updateAboutBio(index: number, value: string) {
    updateCurrentDraft((draft) => ({
      ...draft,
      aboutBio: draft.aboutBio.map((item, currentIndex) => (currentIndex === index ? value : item)),
    }))
  }

  function addAboutBio() {
    updateCurrentDraft((draft) => ({ ...draft, aboutBio: [...draft.aboutBio, ""] }))
  }

  function removeAboutBio(index: number) {
    updateCurrentDraft((draft) => ({
      ...draft,
      aboutBio: draft.aboutBio.filter((_, currentIndex) => currentIndex !== index),
    }))
  }

  function updateServiceCard(index: number, field: keyof ServicesContent["cards"][number], value: string) {
    updateCurrentDraft((draft) => ({
      ...draft,
      servicesContent: {
        ...draft.servicesContent,
        cards: draft.servicesContent.cards.map((card, currentIndex) => {
          if (currentIndex !== index) {
            return card
          }

          if (field === "deliverables") {
            return {
              ...card,
              deliverables: value
                .split("\n")
                .map((item) => item.trim())
                .filter(Boolean),
            }
          }

          return { ...card, [field]: value }
        }),
      },
    }))
  }

  function updateServicesField(field: "ctaTitle" | "ctaDescription" | "ctaLabel", value: string) {
    updateCurrentDraft((draft) => ({
      ...draft,
      servicesContent: {
        ...draft.servicesContent,
        [field]: value,
      },
    }))
  }

  function addServiceCard() {
    updateCurrentDraft((draft) => ({
      ...draft,
      servicesContent: {
        ...draft.servicesContent,
        cards: [...draft.servicesContent.cards, { title: "", description: "", deliverables: [] }],
      },
    }))
  }

  function removeServiceCard(index: number) {
    updateCurrentDraft((draft) => ({
      ...draft,
      servicesContent: {
        ...draft.servicesContent,
        cards: draft.servicesContent.cards.filter((_, currentIndex) => currentIndex !== index),
      },
    }))
  }

  function updateTestimonialCard(index: number, field: keyof TestimonialsContent["cards"][number], value: string) {
    updateCurrentDraft((draft) => ({
      ...draft,
      testimonialsContent: {
        ...draft.testimonialsContent,
        cards: draft.testimonialsContent.cards.map((card, currentIndex) =>
          currentIndex === index ? { ...card, [field]: value } : card,
        ),
      },
    }))
  }

  function updateTrustPoint(index: number, value: string) {
    updateCurrentDraft((draft) => ({
      ...draft,
      testimonialsContent: {
        ...draft.testimonialsContent,
        trustPoints: draft.testimonialsContent.trustPoints.map((item, currentIndex) =>
          currentIndex === index ? value : item,
        ),
      },
    }))
  }

  function addTestimonialCard() {
    updateCurrentDraft((draft) => ({
      ...draft,
      testimonialsContent: {
        ...draft.testimonialsContent,
        cards: [...draft.testimonialsContent.cards, { quote: "", name: "", role: "", company: "", result: "" }],
      },
    }))
  }

  function removeTestimonialCard(index: number) {
    updateCurrentDraft((draft) => ({
      ...draft,
      testimonialsContent: {
        ...draft.testimonialsContent,
        cards: draft.testimonialsContent.cards.filter((_, currentIndex) => currentIndex !== index),
      },
    }))
  }

  function addTrustPoint() {
    updateCurrentDraft((draft) => ({
      ...draft,
      testimonialsContent: {
        ...draft.testimonialsContent,
        trustPoints: [...draft.testimonialsContent.trustPoints, ""],
      },
    }))
  }

  function removeTrustPoint(index: number) {
    updateCurrentDraft((draft) => ({
      ...draft,
      testimonialsContent: {
        ...draft.testimonialsContent,
        trustPoints: draft.testimonialsContent.trustPoints.filter((_, currentIndex) => currentIndex !== index),
      },
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const payload = {
      aboutBio: {
        pt: drafts.pt.aboutBio.map((item) => item.trim()).filter(Boolean),
        en: drafts.en.aboutBio.map((item) => item.trim()).filter(Boolean),
      },
      servicesContent: {
        pt: {
          ctaTitle: drafts.pt.servicesContent.ctaTitle.trim(),
          ctaDescription: drafts.pt.servicesContent.ctaDescription.trim(),
          ctaLabel: drafts.pt.servicesContent.ctaLabel.trim(),
          cards: drafts.pt.servicesContent.cards.map((card) => ({
            title: card.title.trim(),
            description: card.description.trim(),
            deliverables: card.deliverables.map((item) => item.trim()).filter(Boolean),
          })),
        },
        en: {
          ctaTitle: drafts.en.servicesContent.ctaTitle.trim(),
          ctaDescription: drafts.en.servicesContent.ctaDescription.trim(),
          ctaLabel: drafts.en.servicesContent.ctaLabel.trim(),
          cards: drafts.en.servicesContent.cards.map((card) => ({
            title: card.title.trim(),
            description: card.description.trim(),
            deliverables: card.deliverables.map((item) => item.trim()).filter(Boolean),
          })),
        },
      },
      testimonialsContent: {
        pt: {
          cards: drafts.pt.testimonialsContent.cards.map((card) => ({
            quote: card.quote.trim(),
            name: card.name.trim(),
            role: card.role.trim(),
            company: card.company.trim(),
            result: card.result.trim(),
          })),
          trustPoints: drafts.pt.testimonialsContent.trustPoints.map((item) => item.trim()).filter(Boolean),
        },
        en: {
          cards: drafts.en.testimonialsContent.cards.map((card) => ({
            quote: card.quote.trim(),
            name: card.name.trim(),
            role: card.role.trim(),
            company: card.company.trim(),
            result: card.result.trim(),
          })),
          trustPoints: drafts.en.testimonialsContent.trustPoints
            .map((item) => item.trim())
            .filter(Boolean),
        },
      },
    }

    try {
      setIsSubmitting(true)
      setError(null)

      await updateConfig(payload)
      await onSaved()
      onClose()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : locale === "en"
            ? "Failed to save content."
            : "Falha ao salvar o conteúdo.",
      )
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
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
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
                    {locale === "en" ? "Shared content" : "Conteúdo compartilhado"}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {locale === "en" ? "Edit public sections" : "Editar seções públicas"}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground text-pretty">
                        {locale === "en"
                          ? "Update the content that appears in About, Services and Testimonials."
                          : "Atualize o conteúdo que aparece em Sobre, Serviços e Depoimentos."}
                      </p>
                    </div>
                    <div className="inline-flex rounded-full border border-border bg-secondary/40 p-1">
                      {(["pt", "en"] as Locale[]).map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setActiveLocale(item)}
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                            activeLocale === item
                              ? "bg-background text-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Languages className="h-4 w-4" />
                          {item.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <section className="space-y-4 rounded-2xl border border-border bg-secondary/20 p-5">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {locale === "en" ? "About" : "Sobre"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {locale === "en"
                        ? "Bio paragraphs shown on the about page."
                        : "Parágrafos de bio exibidos na página sobre."}
                    </p>
                  </div>
                  <div className="grid gap-4">
                    {currentDraft.aboutBio.map((paragraph, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <FormField
                            id={`about-bio-${activeLocale}-${index}`}
                            name={`aboutBio-${activeLocale}-${index}`}
                            label={locale === "en" ? `Bio paragraph ${index + 1}` : `Parágrafo da bio ${index + 1}`}
                            rows={3}
                            value={paragraph}
                            onChange={(event) => updateAboutBio(index, event.target.value)}
                          />
                        </div>
                        <Button type="button" variant="outline" size="icon" className="mt-7 shrink-0" onClick={() => removeAboutBio(index)} disabled={currentDraft.aboutBio.length === 1} aria-label={locale === "en" ? "Remove paragraph" : "Remover parágrafo"}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" className="w-fit rounded-full" onClick={addAboutBio}>
                      <Plus className="h-4 w-4" />
                      {locale === "en" ? "Add paragraph" : "Adicionar parágrafo"}
                    </Button>
                  </div>
                </section>

                <section className="space-y-4 rounded-2xl border border-border bg-secondary/20 p-5">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {locale === "en" ? "Services" : "Serviços"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {locale === "en"
                        ? "Cards and CTA shown on the services page."
                        : "Cards e CTA exibidos na página de serviços."}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <FormField
                      id={`services-cta-title-${activeLocale}`}
                      name={`servicesCtaTitle-${activeLocale}`}
                      label={locale === "en" ? "CTA title" : "Título do CTA"}
                      value={currentDraft.servicesContent.ctaTitle}
                      onChange={(event) => updateServicesField("ctaTitle", event.target.value)}
                    />
                    <FormField
                      id={`services-cta-label-${activeLocale}`}
                      name={`servicesCtaLabel-${activeLocale}`}
                      label={locale === "en" ? "CTA label" : "Texto do CTA"}
                      value={currentDraft.servicesContent.ctaLabel}
                      onChange={(event) => updateServicesField("ctaLabel", event.target.value)}
                    />
                    <FormField
                      id={`services-cta-description-${activeLocale}`}
                      name={`servicesCtaDescription-${activeLocale}`}
                      label={locale === "en" ? "CTA description" : "Descrição do CTA"}
                      rows={3}
                      value={currentDraft.servicesContent.ctaDescription}
                      onChange={(event) => updateServicesField("ctaDescription", event.target.value)}
                    />
                  </div>

                  <div className="grid gap-4">
                    {currentDraft.servicesContent.cards.map((card, index) => (
                      <div key={index} className="rounded-2xl border border-border bg-background/70 p-4">
                        <div className="mb-3 flex items-center justify-between gap-3 text-sm font-semibold">
                          <span>{locale === "en" ? `Service card ${index + 1}` : `Card de serviço ${index + 1}`}</span>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeServiceCard(index)} aria-label={locale === "en" ? "Remove service" : "Remover serviço"}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid gap-4">
                          <FormField
                            id={`service-card-title-${activeLocale}-${index}`}
                            name={`serviceCardTitle-${activeLocale}-${index}`}
                            label={locale === "en" ? "Title" : "Título"}
                            value={card.title}
                            onChange={(event) => updateServiceCard(index, "title", event.target.value)}
                          />
                          <FormField
                            id={`service-card-description-${activeLocale}-${index}`}
                            name={`serviceCardDescription-${activeLocale}-${index}`}
                            label={locale === "en" ? "Description" : "Descrição"}
                            rows={3}
                            value={card.description}
                            onChange={(event) => updateServiceCard(index, "description", event.target.value)}
                          />
                          <FormField
                            id={`service-card-deliverables-${activeLocale}-${index}`}
                            name={`serviceCardDeliverables-${activeLocale}-${index}`}
                            label={locale === "en" ? "Deliverables, one per line" : "Entregáveis, um por linha"}
                            rows={3}
                            value={card.deliverables.join("\n")}
                            onChange={(event) => updateServiceCard(index, "deliverables", event.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" className="w-fit rounded-full" onClick={addServiceCard}>
                      <Plus className="h-4 w-4" />
                      {locale === "en" ? "Add service" : "Adicionar serviço"}
                    </Button>
                  </div>
                </section>

                <section className="space-y-4 rounded-2xl border border-border bg-secondary/20 p-5">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {locale === "en" ? "Testimonials" : "Depoimentos"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {locale === "en"
                        ? "Social proof cards and trust points."
                        : "Cards de prova social e pontos de confiança."}
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {currentDraft.testimonialsContent.cards.map((card, index) => (
                      <div key={index} className="rounded-2xl border border-border bg-background/70 p-4">
                        <div className="mb-3 flex items-center justify-between gap-3 text-sm font-semibold">
                          <span>{locale === "en" ? `Testimonial ${index + 1}` : `Depoimento ${index + 1}`}</span>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeTestimonialCard(index)} aria-label={locale === "en" ? "Remove testimonial" : "Remover depoimento"}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            id={`testimonial-quote-${activeLocale}-${index}`}
                            name={`testimonialQuote-${activeLocale}-${index}`}
                            label={locale === "en" ? "Quote" : "Citação"}
                            rows={4}
                            value={card.quote}
                            onChange={(event) => updateTestimonialCard(index, "quote", event.target.value)}
                          />
                          <div className="grid gap-4">
                            <FormField
                              id={`testimonial-name-${activeLocale}-${index}`}
                              name={`testimonialName-${activeLocale}-${index}`}
                              label={locale === "en" ? "Name" : "Nome"}
                              value={card.name}
                              onChange={(event) => updateTestimonialCard(index, "name", event.target.value)}
                            />
                            <FormField
                              id={`testimonial-role-${activeLocale}-${index}`}
                              name={`testimonialRole-${activeLocale}-${index}`}
                              label={locale === "en" ? "Role" : "Cargo"}
                              value={card.role}
                              onChange={(event) => updateTestimonialCard(index, "role", event.target.value)}
                            />
                            <FormField
                              id={`testimonial-company-${activeLocale}-${index}`}
                              name={`testimonialCompany-${activeLocale}-${index}`}
                              label={locale === "en" ? "Company" : "Empresa"}
                              value={card.company}
                              onChange={(event) => updateTestimonialCard(index, "company", event.target.value)}
                            />
                            <FormField
                              id={`testimonial-result-${activeLocale}-${index}`}
                              name={`testimonialResult-${activeLocale}-${index}`}
                              label={locale === "en" ? "Result" : "Resultado"}
                              value={card.result}
                              onChange={(event) => updateTestimonialCard(index, "result", event.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" className="w-fit rounded-full" onClick={addTestimonialCard}>
                      <Plus className="h-4 w-4" />
                      {locale === "en" ? "Add testimonial" : "Adicionar depoimento"}
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {currentDraft.testimonialsContent.trustPoints.map((point, index) => (
                      <div key={index} className="flex items-end gap-3">
                        <div className="min-w-0 flex-1"><FormField id={`trust-point-${activeLocale}-${index}`} name={`trustPoint-${activeLocale}-${index}`} label={locale === "en" ? `Trust point ${index + 1}` : `Ponto de confiança ${index + 1}`} value={point} onChange={(event) => updateTrustPoint(index, event.target.value)} /></div>
                        <Button type="button" variant="outline" size="icon" className="shrink-0" onClick={() => removeTrustPoint(index)} aria-label={locale === "en" ? "Remove trust point" : "Remover ponto de confiança"}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" className="w-fit rounded-full" onClick={addTrustPoint}>
                      <Plus className="h-4 w-4" />
                      {locale === "en" ? "Add trust point" : "Adicionar ponto de confiança"}
                    </Button>
                  </div>
                </section>

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
                        {locale === "en" ? "Save content" : "Salvar conteúdo"}
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
