import { ArrowRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "./container"
import { stats } from "@/data/stats"
import { FadeIn } from "@/components/ui/fade-in"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orb */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] grid-pattern"
        />
      </div>

      <Container className="py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <FadeIn direction="left" className="space-y-8">
            <div className="space-y-4">
              <FadeIn direction="up" delay={0.2} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Available for new projects
              </FadeIn>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
                Full Stack Developer building{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">
                  scalable
                </span>{" "}
                and modern applications
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl text-pretty leading-relaxed">
                I transform complex problems into elegant, user-centric solutions. 
                Specializing in React, Next.js, and cloud architecture to build 
                products that scale.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button as="a" href="#projects" size="lg" className="rounded-full group">
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button as="a" href="#contact" variant="outline" size="lg" className="rounded-full">
              Contact Me
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

          {/* Simple Avatar */}
          <FadeIn direction="right" delay={0.2} className="relative hidden lg:block">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 to-accent/10 rounded-3xl blur-2xl" />
              
              {/* Avatar Placeholder */}
              <div className="relative aspect-square bg-gradient-to-br from-secondary to-muted rounded-2xl overflow-hidden border border-border flex items-center justify-center">
                <div className="text-9xl font-bold text-muted-foreground/20">J</div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-accent/10 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
