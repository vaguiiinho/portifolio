import { cookies } from "next/headers"

export type Locale = "pt" | "en"

const LOCALE_COOKIE = "portfolio-locale"

export function isLocale(value: unknown): value is Locale {
  return value === "pt" || value === "en"
}

export function getLocaleFromCookieValue(value?: string | null): Locale {
  return isLocale(value) ? value : "pt"
}

export function getLocale() {
  return getLocaleFromCookieValue(cookies().get(LOCALE_COOKIE)?.value)
}

export function getLocaleCookieName() {
  return LOCALE_COOKIE
}
