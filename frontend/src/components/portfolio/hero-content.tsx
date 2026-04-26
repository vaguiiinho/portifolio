import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"
import { stats } from "@/data/stats"
import { heroData } from "@/data/site"

export function HeroContent() {
  return (
    <FadeIn direction="left" className="space-y-8">
      <div className="space-y-4">
        <FadeIn direction="up" delay={0.2} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          {heroData.availabilityText}
        </FadeIn>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
          {heroData.title}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">
            {heroData.titleHighlight}
          </span>{" "}
          and modern applications
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl text-pretty leading-relaxed">
          {heroData.subtitle}
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button as="a" href="#projects" size="lg" className="rounded-full group">
        {heroData.viewProjectsText}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
      <Button as="a" href="#contact" variant="outline" size="lg" className="rounded-full">
        {heroData.contactMeText}
      </Button>
      </div>

      {/* Stats */}
      <div className="flex gap-8 pt-4">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} direction="up" delay={0.4 + i * 0.1}>
            <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </FadeIn>
        ))}
      </div>
    </FadeIn>
  )
}