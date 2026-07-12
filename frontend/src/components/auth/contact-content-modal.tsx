"use client"

import { useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2, PencilLine, X } from "lucide-react"
import { RemoveScroll } from "react-remove-scroll"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { updateConfig } from "@/lib/api"
import { getContactContent } from "@/lib/content/localized"
import type { Locale } from "@/lib/locale"
import type { SiteConfig } from "@/lib/site-config"
import { type ContactContent, type LocalizedContent } from "@/lib/site-content"

interface Props { open: boolean; config: SiteConfig; locale: Locale; onClose: () => void; onSaved: () => Promise<void> | void }

function clone(content: ContactContent): ContactContent {
  return { ...content, paths: content.paths.map((path) => ({ ...path })), formLabels: { ...content.formLabels }, formPlaceholders: { ...content.formPlaceholders } }
}

function resolve(value: SiteConfig["contactContent"], locale: Locale): ContactContent {
  const fallback = getContactContent(locale)
  if (!value || !("pt" in value || "en" in value)) return clone((value ?? fallback) as ContactContent)
  return clone((value as LocalizedContent<ContactContent>)[locale] ?? (value as LocalizedContent<ContactContent>).pt ?? fallback)
}

export function ContactContentModal({ open, config, locale, onClose, onSaved }: Props) {
  const [activeLocale, setActiveLocale] = useState<Locale>(locale)
  const [drafts, setDrafts] = useState<Record<Locale, ContactContent>>(() => ({ pt: resolve(config.contactContent, "pt"), en: resolve(config.contactContent, "en") }))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const draft = drafts[activeLocale]

  function update(updater: (content: ContactContent) => ContactContent) {
    setDrafts((current) => ({ ...current, [activeLocale]: updater(current[activeLocale]) }))
  }
  function updateField(field: keyof Omit<ContactContent, "paths" | "formLabels" | "formPlaceholders">, value: string) { update((content) => ({ ...content, [field]: value })) }
  function updatePath(index: number, field: keyof ContactContent["paths"][number], value: string) { update((content) => ({ ...content, paths: content.paths.map((path, current) => current === index ? { ...path, [field]: value } : path) })) }
  function updateForm(group: "formLabels" | "formPlaceholders", field: keyof ContactContent["formLabels"], value: string) { update((content) => ({ ...content, [group]: { ...content[group], [field]: value } })) }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      setIsSubmitting(true); setError(null)
      const normalize = (content: ContactContent): ContactContent => ({ ...content, title: content.title.trim(), subtitle: content.subtitle.trim(), contactTitle: content.contactTitle.trim(), contactDescription: content.contactDescription.trim(), contactNote: content.contactNote.trim(), submitButton: content.submitButton.trim(), submittingText: content.submittingText.trim(), paths: content.paths.map((path) => Object.fromEntries(Object.entries(path).map(([key, value]) => [key, value.trim()])) as ContactContent["paths"][number]), formLabels: Object.fromEntries(Object.entries(content.formLabels).map(([key, value]) => [key, value.trim()])) as ContactContent["formLabels"], formPlaceholders: Object.fromEntries(Object.entries(content.formPlaceholders).map(([key, value]) => [key, value.trim()])) as ContactContent["formPlaceholders"] })
      await updateConfig({ contactContent: { pt: normalize(drafts.pt), en: normalize(drafts.en) } })
      await onSaved(); onClose()
    } catch (err) { setError(err instanceof Error ? err.message : "Falha ao salvar o conteúdo de contato.") } finally { setIsSubmitting(false) }
  }

  return <AnimatePresence>{open && <RemoveScroll enabled><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4"><div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} /><motion.form initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} onSubmit={submit} className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"><button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-full bg-secondary/80 p-2" aria-label="Fechar"><X className="h-5 w-5" /></button><div className="space-y-6 p-8"><div><div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground"><PencilLine className="h-4 w-4" />Contato</div><h2 className="mt-3 text-2xl font-bold">Editar página de contato</h2><div className="mt-3 inline-flex rounded-full border border-border p-1">{(["pt", "en"] as Locale[]).map((item) => <button key={item} type="button" onClick={() => setActiveLocale(item)} className={`rounded-full px-4 py-2 text-sm ${activeLocale === item ? "bg-secondary" : "text-muted-foreground"}`}>{item.toUpperCase()}</button>)}</div></div><section className="grid gap-4"><FormField id="contact-title" name="title" label="Título" value={draft.title} onChange={(event) => updateField("title", event.target.value)} /><FormField id="contact-subtitle" name="subtitle" label="Subtítulo" rows={3} value={draft.subtitle} onChange={(event) => updateField("subtitle", event.target.value)} /><FormField id="contact-heading" name="contactTitle" label="Título dos canais" value={draft.contactTitle} onChange={(event) => updateField("contactTitle", event.target.value)} /><FormField id="contact-description" name="contactDescription" label="Descrição dos canais" rows={3} value={draft.contactDescription} onChange={(event) => updateField("contactDescription", event.target.value)} /><FormField id="contact-note" name="contactNote" label="Nota de contato" rows={2} value={draft.contactNote} onChange={(event) => updateField("contactNote", event.target.value)} /></section>{draft.paths.map((path, index) => <section key={index} className="grid gap-4 rounded-2xl border border-border p-4"><h3 className="font-semibold">Canal {index + 1}</h3>{(["title", "description", "ctaLabel", "ctaHref", "secondaryLabel", "secondaryHref"] as (keyof ContactContent["paths"][number])[]).map((field) => <FormField key={field} id={`path-${index}-${field}`} name={field} label={field} rows={field === "description" ? 3 : undefined} value={path[field]} onChange={(event) => updatePath(index, field, event.target.value)} />)}</section>)}<section className="grid gap-4 rounded-2xl border border-border p-4"><h3 className="font-semibold">Formulário</h3>{(["name", "email", "subject", "message"] as (keyof ContactContent["formLabels"])[]).map((field) => <div key={field} className="grid gap-4 md:grid-cols-2"><FormField id={`label-${field}`} name={`label-${field}`} label={`Rótulo: ${field}`} value={draft.formLabels[field]} onChange={(event) => updateForm("formLabels", field, event.target.value)} /><FormField id={`placeholder-${field}`} name={`placeholder-${field}`} label={`Placeholder: ${field}`} value={draft.formPlaceholders[field]} onChange={(event) => updateForm("formPlaceholders", field, event.target.value)} /></div>)}<FormField id="submit" name="submit" label="Botão de envio" value={draft.submitButton} onChange={(event) => updateField("submitButton", event.target.value)} /><FormField id="submitting" name="submitting" label="Texto durante envio" value={draft.submittingText} onChange={(event) => updateField("submittingText", event.target.value)} /></section>{error && <p className="text-sm text-destructive">{error}</p>}<div className="flex justify-end gap-3 border-t border-border pt-4"><Button type="button" variant="outline" onClick={onClose}>Cancelar</Button><Button type="submit" disabled={isSubmitting}>{isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}Salvar contato</Button></div></div></motion.form></motion.div></RemoveScroll>}</AnimatePresence>
}
