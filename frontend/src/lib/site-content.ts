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

export interface SiteContent {
  aboutBio: LocalizedContent<string[]>
  servicesContent: LocalizedContent<ServicesContent>
  testimonialsContent: LocalizedContent<TestimonialsContent>
}

export type SiteContentField<T> = T | LocalizedContent<T>

function isLocalizedObject(value: unknown) {
  return Boolean(value && typeof value === "object" && !Array.isArray(value))
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
