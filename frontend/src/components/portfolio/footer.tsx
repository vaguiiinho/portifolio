import { ArrowDownToLine, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "./container"
import { AppLink } from "@/components/ui/app-link"
import { socialLinks } from "@/data/navigation"
import { footerContent } from "@/lib/content"

interface FooterProps {
  siteName: string
}

export function Footer({ siteName }: FooterProps) {
  return (
    <footer className="py-8 border-t border-border">
      <Container>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {siteName}. {footerContent.copyrightText}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button as="a" href="/curriculo" variant="outline" size="sm" className="rounded-full">
                Ver currículo
              </Button>
              <Button as="a" href="/curriculo.pdf" isExternal download size="sm" className="rounded-full">
                <ArrowDownToLine className="h-4 w-4" />
                Baixar PDF
              </Button>
              <Button as="a" href="/contato" size="sm" className="rounded-full">
                Falar comigo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((link) => (
              <AppLink
                key={link.name}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Visitar ${link.name}`}
                title={link.name}
              >
                <link.icon className="h-5 w-5" aria-hidden="true" />
              </AppLink>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
