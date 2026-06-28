export const resumePageContent = {
  heroBadge: "Currículo para recrutadores e clientes",
  heroActions: {
    downloadLabel: "Baixar PDF",
    experienceLabel: "Ver experiência",
  },
  sections: {
    summaryTitle: "Resumo profissional",
    experienceSubtitle: "Linha do tempo objetiva das entregas mais relevantes.",
    educationSubtitle: "Trilhas de aprendizado, atualização técnica e foco atual.",
  },
  ctaActions: {
    downloadLabel: "Baixar PDF",
    contactLabel: "Falar comigo",
  },
} as const

export const resumePdfContent = {
  title: "Joao Silva",
  subtitle: "Full Stack Developer",
  summaryTitle: "Resumo",
  summary: "Desenvolvedor focado em conversao, interfaces claras e backends modulares.",
  stacksTitle: "Stacks",
  stacks: "Next.js, React, TypeScript, NestJS, Prisma, PostgreSQL",
  experienceTitle: "Experiencia",
  experienceLines: [
    "2021 - Atual | Freelance e projetos sob demanda",
    "2021 - Atual | Landing pages, dashboards, APIs e integracoes",
  ],
  contactsTitle: "Contatos",
  contacts: ["linkedin.com/in/joaosilva", "github.com/joaosilva", "hello@joaosilva.dev"],
} as const
