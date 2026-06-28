import { portfolioRoutes } from "@/lib/routes"

export const routeCtaContent = {
  services: {
    primaryLabel: "Pedir orçamento",
    primaryHref: portfolioRoutes.contact,
    secondaryLabel: "Ver projetos",
    secondaryHref: portfolioRoutes.projects,
  },
  projects: {
    primaryLabel: "Quero um projeto assim",
    primaryHref: portfolioRoutes.contact,
    secondaryLabel: "Ver currículo",
    secondaryHref: portfolioRoutes.resume,
  },
  about: {
    primaryLabel: "Ver currículo",
    primaryHref: portfolioRoutes.resume,
    secondaryLabel: "Falar comigo",
    secondaryHref: portfolioRoutes.contact,
  },
  contact: {
    primaryLabel: "Ver currículo",
    primaryHref: portfolioRoutes.resume,
    secondaryLabel: "Ver projetos",
    secondaryHref: portfolioRoutes.projects,
  },
} as const
