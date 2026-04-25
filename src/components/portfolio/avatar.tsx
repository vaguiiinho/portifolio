import { siteConfig } from "@/data/site"

export function Avatar() {
  return (
    <div className="relative aspect-square max-w-md mx-auto">
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 to-accent/10 rounded-3xl blur-2xl" />

      {/* Avatar Placeholder */}
      <div className="relative aspect-square bg-gradient-to-br from-secondary to-muted rounded-2xl overflow-hidden border border-border flex items-center justify-center">
        <div className="text-9xl font-bold text-muted-foreground/20">
          {siteConfig.name.charAt(0)}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-accent/10 rounded-full blur-xl" />
        <div className="absolute bottom-4 left-4 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
      </div>
    </div>
  )
}