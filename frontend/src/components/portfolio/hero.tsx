import { Container } from "./container"
import { Avatar } from "./avatar"
import { BackgroundEffects } from "./background-effects"
import { HeroContent } from "./hero-content"
import { fetchHeroStats } from "@/lib/stats"
import type { Locale } from "@/lib/locale"

interface HeroProps {
  siteName: string
  locale: Locale
}

export async function Hero({ siteName, locale }: HeroProps) {
  const stats = await fetchHeroStats()

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <BackgroundEffects />

      <Container className="py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <HeroContent stats={stats} locale={locale} />
          <div className="relative hidden lg:block">
            <Avatar siteName={siteName} />
          </div>
        </div>
      </Container>
    </section>
  )
}
