import type { Locale } from "./locale"

export type LocalizedContent<T> = Partial<Record<Locale, T>>

export interface ServiceCardContent {
  title: string
  description: string
  deliverables: string[]
}

export interface ServicesContent {
  ctaTitle: string
  ctaDescription: string
  ctaLabel: string
  cards: ServiceCardContent[]
}

export interface TestimonialCardContent {
  quote: string
  name: string
  role: string
  company: string
  result: string
}

export interface TestimonialsContent {
  cards: TestimonialCardContent[]
  trustPoints: string[]
}

export interface ContactPathContent {
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  secondaryLabel: string
  secondaryHref: string
}

export interface ContactContent {
  title: string
  subtitle: string
  contactTitle: string
  contactDescription: string
  contactNote: string
  paths: ContactPathContent[]
  formLabels: { name: string; email: string; subject: string; message: string }
  formPlaceholders: { name: string; email: string; subject: string; message: string }
  submitButton: string
  submittingText: string
}

export interface SiteContent {
  aboutBio: LocalizedContent<string[]>
  servicesContent: LocalizedContent<ServicesContent>
  testimonialsContent: LocalizedContent<TestimonialsContent>
  contactContent: LocalizedContent<ContactContent>
}

export type SiteContentField<T> = T | LocalizedContent<T>

function isLocalizedObject(value: unknown) {
  return Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      ("pt" in value || "en" in value),
  )
}

export function resolveLocalizedField<T>(
  value: SiteContentField<T> | undefined,
  locale: Locale,
  fallback: T,
): T {
  if (!value) {
    return fallback
  }

  if (isLocalizedObject(value)) {
    const localizedValue = (value as LocalizedContent<T>)[locale] as T | undefined

    if (localizedValue !== undefined) {
      return localizedValue
    }

    const fallbackValue = (locale === "en" ? (value as LocalizedContent<T>).pt : (value as LocalizedContent<T>).en) as
      | T
      | undefined

    if (fallbackValue !== undefined) {
      return fallbackValue
    }

    return fallback
  }

  return value as T
}

export function getConfiguredLocalizedField<T>(
  value: SiteContentField<T> | undefined,
  locale: Locale,
): T | undefined {
  if (!value) return undefined

  if (isLocalizedObject(value)) {
    const localized = value as LocalizedContent<T>
    return localized[locale] ?? (locale === "en" ? localized.pt : localized.en)
  }

  return value as T
}

export function hasServicesContent(content: SiteContentField<ServicesContent> | undefined, locale: Locale): boolean {
  if (!content) return true
  return (getConfiguredLocalizedField(content, locale)?.cards.length ?? 0) > 0
}

export function hasTestimonialsContent(
  content: SiteContentField<TestimonialsContent> | undefined,
  locale: Locale,
): boolean {
  if (!content) return true
  const value = getConfiguredLocalizedField(content, locale)
  return Boolean(value && (value.cards.length > 0 || value.trustPoints.length > 0))
}
