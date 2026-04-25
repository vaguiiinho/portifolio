import { Container } from "./container"
import { socialLinks } from "@/data/navigation"
import { footerData, siteConfig } from "@/data/site"

export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. {footerData.copyrightText}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Visit ${link.name}`}
                title={link.name}
              >
                <link.icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
