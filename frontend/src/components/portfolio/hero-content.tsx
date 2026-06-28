import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { heroContent } from "@/lib/content"
import { portfolioRoutes } from "@/lib/routes"
import type { HeroStat } from "@/lib/stats"

interface HeroContentProps {
  stats: HeroStat[]
}

export function HeroContent({ stats }: HeroContentProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          {heroContent.availabilityText}
        </div>

        <h1 className="text-4xl font-bold tracking-tight leading-tight text-balance sm:text-5xl lg:text-6xl">
          {heroContent.title}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">
            {heroContent.titleHighlight}
          </span>{" "}
          e produtos modernos
        </h1>

        <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {heroContent.subtitle}
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button as="a" href={portfolioRoutes.services} size="lg" className="rounded-full group">
          {heroContent.viewProjectsText}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        <Button as="a" href={portfolioRoutes.contact} variant="outline" size="lg" className="rounded-full">
          {heroContent.contactMeText}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 pt-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
