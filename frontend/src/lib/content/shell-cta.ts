import { portfolioRoutes } from "@/lib/routes"

export const shellCtaContent = {
  navbar: {
    primaryLabel: "Pedir orçamento",
    primaryHref: portfolioRoutes.contact,
    secondaryLabel: "Ver currículo",
    secondaryHref: portfolioRoutes.resume,
  },
  footer: {
    primaryLabel: "Ver currículo",
    primaryHref: portfolioRoutes.resume,
    secondaryLabel: "Baixar PDF",
    secondaryHref: portfolioRoutes.resumePdf,
    tertiaryLabel: "Falar comigo",
    tertiaryHref: portfolioRoutes.contact,
  },
} as const
