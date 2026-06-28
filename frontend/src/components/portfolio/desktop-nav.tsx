import { AppLink } from "@/components/ui/app-link"
import { navLinks } from "@/lib/content"

export function DesktopNav() {
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
