import { AppLink } from "@/components/ui/app-link"
import { getNavLinks } from "@/lib/content/localized"
import type { Locale } from "@/lib/locale"

interface DesktopNavProps {
  locale: Locale
  showServices?: boolean
}

export function DesktopNav({ locale, showServices = true }: DesktopNavProps) {
  const navLinks = getNavLinks(locale).filter((link) => showServices || link.href !== "/servicos")

  return (
    <div className="hidden md:flex items-center gap-8">
      {navLinks.map((link) => (
        <AppLink
          key={link.name}
          href={link.href}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {link.name}
        </AppLink>
      ))}
    </div>
  )
}
