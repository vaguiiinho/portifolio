import { FadeIn } from "@/components/ui/fade-in"
import { socialLinks } from "@/data/navigation"

export function SocialLinksCard() {
  return (
    <FadeIn direction="left" className="space-y-4">
      {socialLinks.map((link) => (
        <div
          key={link.name}
          className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 hover:border-accent/50 transition-all group"
        >
          <div className="p-3 rounded-lg bg-secondary group-hover:bg-accent/10 transition-colors">
            <link.icon className="h-5 w-5 group-hover:text-accent transition-colors" />
          </div>
          <div className="flex-1">
            <div className="font-medium">{link.name}</div>
            <div className="text-sm text-muted-foreground">{link.username}</div>
          </div>
        </div>
      ))}
    </FadeIn>
  )
}