import { Container } from "./container"
import { FadeIn } from "@/components/ui/fade-in"
import { Avatar } from "./avatar"
import { BackgroundEffects } from "./background-effects"
import { HeroContent } from "./hero-content"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <BackgroundEffects />

      <Container className="py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <HeroContent />

          {/* Avatar */}
          <FadeIn direction="right" delay={0.2} className="relative hidden lg:block">
            <Avatar />
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
