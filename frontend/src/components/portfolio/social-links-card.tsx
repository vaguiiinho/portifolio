import { AppLink } from "@/components/ui/app-link"
import { socialLinks } from "@/lib/content"

export function SocialLinksCard() {
  return (
    <div className="space-y-4">
      {socialLinks.map((link) => (
        <AppLink
          href={link.href}
          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          key={link.name}
          className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all group hover:border-accent/50 hover:bg-secondary/50"
        >
          <div className="p-3 rounded-lg bg-secondary group-hover:bg-accent/10 transition-colors">
            <link.icon className="h-5 w-5 group-hover:text-accent transition-colors" />
          </div>
          <div className="flex-1">
            <div className="font-medium">{link.name}</div>
            <div className="text-sm text-muted-foreground">{link.username}</div>
          </div>
        </AppLink>
      ))}
    </div>
  )
}
