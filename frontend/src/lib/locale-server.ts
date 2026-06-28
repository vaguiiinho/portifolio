import { cookies } from "next/headers"
import { getLocaleFromCookieValue, getLocaleCookieName } from "./locale"

export async function getLocale() {
  const cookieStore = await cookies()
  return getLocaleFromCookieValue(cookieStore.get(getLocaleCookieName())?.value)
}
