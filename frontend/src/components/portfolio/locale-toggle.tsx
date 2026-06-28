"use client"

import { useRouter } from "next/navigation"
import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLocaleCookieName, type Locale } from "@/lib/locale"

function setLocaleCookie(locale: Locale) {
  document.cookie = `${getLocaleCookieName()}=${locale}; path=/; max-age=31536000; samesite=lax`
}

interface LocaleToggleProps {
  locale: Locale
}

export function LocaleToggle({ locale }: LocaleToggleProps) {
  const router = useRouter()
  const nextLocale = locale === "pt" ? "en" : "pt"

  return (
    <Button
      variant="ghost"
      size="sm"
      className="rounded-full"
      onClick={() => {
        setLocaleCookie(nextLocale)
        router.refresh()
      }}
      aria-label={locale === "pt" ? "Switch to English" : "Mudar para português"}
    >
      <Languages className="h-4 w-4" />
      {locale.toUpperCase()}
    </Button>
  )
}
