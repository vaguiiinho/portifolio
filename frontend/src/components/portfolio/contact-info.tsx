import { FadeIn } from "@/components/ui/fade-in"
import { SocialLinksCard } from "./social-links-card"
import { contactData } from "@/data/site"

export function ContactInfo() {
  return (
    <FadeIn direction="left" className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-2">{contactData.contactTitle}</h3>
        <p className="text-muted-foreground text-pretty leading-relaxed">
          {contactData.contactDescription}
        </p>
      </div>

      <SocialLinksCard />
    </FadeIn>
  )
}