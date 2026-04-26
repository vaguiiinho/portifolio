import { navLinks } from "@/data/navigation"

export function DesktopNav() {
  return (
    <div className="hidden md:flex items-center gap-8">
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {link.name}
        </a>
      ))}
    </div>
  )
}