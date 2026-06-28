import { portfolioRoutes } from "@/lib/routes"
import type { Locale } from "@/lib/locale"

export function getNavLinks(locale: Locale) {
  return locale === "en"
    ? [
        { name: "Home", href: "/" },
        { name: "Services", href: "/servicos" },
        { name: "Projects", href: "/projetos" },
        { name: "Resume", href: "/curriculo" },
        { name: "About", href: "/sobre" },
        { name: "Contact", href: "/contato" },
      ]
    : [
        { name: "Início", href: "/" },
        { name: "Serviços", href: "/servicos" },
        { name: "Projetos", href: "/projetos" },
        { name: "Currículo", href: "/curriculo" },
        { name: "Sobre", href: "/sobre" },
        { name: "Contato", href: "/contato" },
      ]
}

export function getShellCtaContent(locale: Locale) {
  return locale === "en"
    ? {
        navbar: {
          primaryLabel: "Request quote",
          primaryHref: portfolioRoutes.contact,
          secondaryLabel: "View resume",
          secondaryHref: portfolioRoutes.resume,
        },
        footer: {
          primaryLabel: "View resume",
          primaryHref: portfolioRoutes.resume,
          secondaryLabel: "Download PDF",
          secondaryHref: portfolioRoutes.resumePdf,
          tertiaryLabel: "Contact me",
          tertiaryHref: portfolioRoutes.contact,
        },
      }
    : {
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
      }
}

export function getFooterContent(locale: Locale) {
  return locale === "en"
    ? { copyrightText: "All rights reserved." }
    : { copyrightText: "Todos os direitos reservados." }
}

export function getHeroContent(locale: Locale) {
  return locale === "en"
    ? {
        availabilityText: "Available for projects and opportunities",
        title: "Full Stack Developer focused on",
        titleHighlight: "conversion",
        subtitle:
          "I turn requirements into clear, fast and scalable products. I deliver interfaces, APIs and integrations focused on business impact, simple maintenance and objective communication.",
        viewProjectsText: "View services",
        contactMeText: "Talk to me",
      }
    : {
        availabilityText: "Disponível para projetos e oportunidades",
        title: "Full Stack Developer focado em",
        titleHighlight: "conversão",
        subtitle:
          "Transformo requisitos em produtos claros, rápidos e fáceis de escalar. Entrego interfaces, APIs e integrações com foco em impacto de negócio, manutenção simples e comunicação objetiva.",
        viewProjectsText: "Ver serviços",
        contactMeText: "Falar comigo",
      }
}

export function getProjectsContent(locale: Locale) {
  return locale === "en"
    ? {
        title: "Featured cases",
        subtitle:
          "Each project below tells the problem, the solution and the impact. This is not a stack list; it is a delivery history.",
        ctaLabel: "I want a case like this",
        modal: {
          technologiesTitle: "Technologies used",
          viewLiveDemoText: "View demo",
          viewSourceCodeText: "View code",
          sections: [
            {
              title: "Problem",
              description:
                "The project context, the main pain point and the blocker that had to be removed to generate results.",
            },
            {
              title: "Solution",
              description:
                "How the interface, API and data flow were structured to reduce friction and keep the base evolvable.",
            },
            {
              title: "Result",
              description:
                "What was delivered and what practical value the project added for the end user or the business.",
            },
          ],
        },
      }
    : {
        title: "Cases em destaque",
        subtitle:
          "Cada projeto abaixo conta o problema, a solução e o impacto. Não é uma lista de tecnologias; é um histórico de entrega.",
        ctaLabel: "Quero um case assim",
        modal: {
          technologiesTitle: "Tecnologias usadas",
          viewLiveDemoText: "Ver demo",
          viewSourceCodeText: "Ver código",
          sections: [
            {
              title: "Problema",
              description:
                "O contexto do projeto, a dor principal e qual bloqueio precisava ser removido para gerar resultado.",
            },
            {
              title: "Solução",
              description:
                "Como a interface, a API e o fluxo de dados foram estruturados para reduzir atrito e manter a base evolutiva.",
            },
            {
              title: "Resultado",
              description:
                "O que foi entregue e qual valor prático o projeto adicionou ao usuário final ou ao negócio.",
            },
          ],
        },
      }
}

export function getServicesContent(locale: Locale) {
  return locale === "en"
    ? {
        title: "Contractable services",
        subtitle:
          "Packages designed for direct hiring, with a clear scope and a focus on delivery that helps you sell, capture leads or operate better.",
        ctaTitle: "Need a more precise scope?",
        ctaDescription:
          "I can adapt the delivery for a landing page, case study, internal dashboard or custom API.",
        ctaLabel: "Request a quote",
        cards: [
          {
            title: "Landing pages and portfolios",
            description:
              "Fast, scannable sites built around a strong CTA to generate conversation and present credibility in seconds.",
            deliverables: ["Strong hero CTA", "Social proof sections", "Basic SEO and sharing"],
          },
          {
            title: "Dashboards and backoffices",
            description:
              "Operational interfaces focused on data organization, performance and a simple reading flow for daily work.",
            deliverables: ["Admin flows", "Analytics panels", "Permission control"],
          },
          {
            title: "APIs and integrations",
            description:
              "Backends with clean architecture, validation and structured persistence to connect systems without unnecessary coupling.",
            deliverables: ["NestJS + Prisma", "Isolated business rules", "External service integrations"],
          },
          {
            title: "Evolution and maintenance",
            description:
              "Continuous improvements to keep the product reliable, fast and aligned with new business or hiring demands.",
            deliverables: ["Fixes and improvements", "Value-driven refactoring", "Technical decision support"],
          },
        ],
      }
    : {
        title: "Serviços contratáveis",
        subtitle:
          "Pacotes pensados para contratação direta, com escopo claro e foco em entrega que ajuda a vender, captar ou operar melhor.",
        ctaTitle: "Quer um escopo mais preciso?",
        ctaDescription:
          "Eu posso adaptar a entrega para uma landing page, case study, painel interno ou API sob medida.",
        ctaLabel: "Pedir orçamento",
        cards: [
          {
            title: "Landing pages e portfólios",
            description:
              "Sites rápidos, escaneáveis e orientados a CTA para gerar conversa e apresentar credibilidade em poucos segundos.",
            deliverables: ["Hero com CTA forte", "Seções de prova social", "SEO básico e compartilhamento"],
          },
          {
            title: "Dashboards e backoffices",
            description:
              "Interfaces para operação interna com foco em organização de dados, desempenho e leitura simples para times em rotina.",
            deliverables: ["Fluxos administrativos", "Painéis analíticos", "Controle de permissões"],
          },
          {
            title: "APIs e integrações",
            description:
              "Backends com arquitetura limpa, validação e persistência estruturada para conectar sistemas sem acoplamento desnecessário.",
            deliverables: ["NestJS + Prisma", "Regras de negócio isoladas", "Integrações com serviços externos"],
          },
          {
            title: "Evolução e manutenção",
            description:
              "Ajustes contínuos para manter o produto confiável, rápido e alinhado com novas demandas de negócio ou contratação.",
            deliverables: ["Correções e melhorias", "Refatoração orientada a valor", "Apoio em decisão técnica"],
          },
        ],
      }
}

export function getAboutContent(locale: Locale) {
  return locale === "en"
    ? {
        title: "How I work",
        subtitle:
          "I combine clean architecture, objective interfaces and iterative delivery to turn ideas into reliable products.",
        bio: [
          "I'm João Silva, a Full Stack Developer focused on products that need to communicate value quickly, support growth and stay easy to evolve.",
          "I work with Next.js, TypeScript, NestJS and PostgreSQL to build journeys that simplify user decisions and reduce conversion friction.",
          "I prefer well-defined scopes, predictable deliveries and interfaces that make the next step clear for recruiters, clients and technical teams.",
        ],
        techStackTitle: "Stack I use frequently",
      }
    : {
        title: "Como trabalho",
        subtitle:
          "Combino arquitetura limpa, interfaces objetivas e entrega iterativa para transformar ideias em produtos confiáveis.",
        bio: [
          `Sou João Silva, desenvolvedor Full Stack com foco em produtos que precisam comunicar valor rápido, sustentar crescimento e ser fáceis de evoluir.`,
          `Trabalho com Next.js, TypeScript, NestJS e PostgreSQL para construir jornadas que simplificam a decisão do usuário e reduzem atrito na conversão.`,
          `Prefiro escopos bem definidos, entregas previsíveis e interfaces que deixam claro o próximo passo para recrutadores, clientes e times técnicos.`,
        ],
        techStackTitle: "Stack que uso com frequência",
      }
}

export function getContactContent(locale: Locale) {
  return locale === "en"
    ? {
        title: "Ready to talk?",
        subtitle:
          "If you need a portfolio, landing page, dashboard, API or integration, send me the context and I'll reply with the clearest next step.",
        contactTitle: "Direct channels",
        contactDescription:
          "Pick the fastest channel for you. I prioritize objective contact and respond within 24 business hours.",
        contactNote:
          "If you prefer, send me the context, the deadline and the project goal. That speeds up my reply.",
        paths: [
          {
            title: "I'm a recruiter",
            description:
              "I want to quickly understand your background, resume and stack to assess technical and communication fit.",
            ctaLabel: "View resume",
            ctaHref: portfolioRoutes.resume,
            secondaryLabel: "LinkedIn",
            secondaryHref: "https://linkedin.com/in/joaosilva",
          },
          {
            title: "I'm a client",
            description:
              "I have an idea, a page or a product to launch with a focus on conversion and a clear scope.",
            ctaLabel: "Request quote",
            ctaHref: `${portfolioRoutes.contact}#contact-form`,
            secondaryLabel: "WhatsApp",
            secondaryHref: "https://wa.me/5500000000000",
          },
        ],
        formLabels: {
          name: "Name",
          email: "Email",
          subject: "Subject",
          message: "Message",
        },
        formPlaceholders: {
          name: "Your name",
          email: "you@company.com",
          subject: "Landing page, dashboard or API?",
          message: "Briefly tell me what you need to deliver...",
        },
        submitButton: "Send message",
        submittingText: "Sending...",
      }
    : {
        title: "Pronto para conversar?",
        subtitle:
          "Se você precisa de um portfólio, landing page, dashboard, API ou integração, me chame com o contexto e eu respondo com o próximo passo mais claro.",
        contactTitle: "Canais diretos",
        contactDescription:
          "Escolha o canal mais rápido para você. Eu priorizo contato objetivo e retorno em até 24 horas úteis.",
        contactNote:
          "Se preferir, me mande o contexto, o prazo e o objetivo do projeto. Isso acelera a resposta.",
        paths: [
          {
            title: "Sou recrutador",
            description:
              "Quero entender seu histórico, currículo e stack com rapidez para avaliar fit técnico e de comunicação.",
            ctaLabel: "Ver currículo",
            ctaHref: portfolioRoutes.resume,
            secondaryLabel: "LinkedIn",
            secondaryHref: "https://linkedin.com/in/joaosilva",
          },
          {
            title: "Sou cliente",
            description:
              "Tenho uma ideia, uma página ou um produto para colocar no ar com foco em conversão e clareza de escopo.",
            ctaLabel: "Pedir orçamento",
            ctaHref: `${portfolioRoutes.contact}#contact-form`,
            secondaryLabel: "WhatsApp",
            secondaryHref: "https://wa.me/5500000000000",
          },
        ],
        formLabels: {
          name: "Nome",
          email: "E-mail",
          subject: "Assunto",
          message: "Mensagem",
        },
        formPlaceholders: {
          name: "Seu nome",
          email: "voce@empresa.com",
          subject: "Landing page, dashboard ou API?",
          message: "Conte brevemente o que você precisa entregar...",
        },
        submitButton: "Enviar mensagem",
        submittingText: "Enviando...",
      }
}

export function getResumePageContent(locale: Locale) {
  return locale === "en"
    ? {
        heroBadge: "Resume for recruiters and clients",
        heroActions: {
          downloadLabel: "Download PDF",
          experienceLabel: "View experience",
        },
        sections: {
          summaryTitle: "Professional summary",
          experienceSubtitle: "Objective timeline of the most relevant deliveries.",
          educationSubtitle: "Learning paths, technical updates and current focus.",
        },
        ctaActions: {
          downloadLabel: "Download PDF",
          contactLabel: "Talk to me",
        },
      }
    : {
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
      }
}

export function getResumeContent(locale: Locale) {
  return locale === "en"
    ? {
        title: "Resume and experience",
        subtitle:
          "Concise summary for recruiters and clients who want to understand my profile in under a minute.",
        summary:
          "Full Stack Developer focused on conversion-oriented products, clear interfaces and well-organized backends. I work from discovery to deploy, with attention to scope, maintenance and technical communication.",
        highlights: [
          "Next.js, React, TypeScript and Tailwind on the frontend",
          "NestJS, Prisma and PostgreSQL on the backend",
          "Clean architecture, validation and separation of responsibilities",
          "Support for product, UX and technical evolution decisions",
        ],
        experienceTitle: "Experience",
        experiences: [
          {
            role: "Full Stack Developer",
            period: "2021 - Present",
            company: "Freelance and on-demand projects",
            description:
              "Delivery of institutional pages, dashboards and APIs with a focus on scope clarity, implementation speed and maintainability.",
            achievements: [
              "Built lead capture flows and conversion pages",
              "Implemented API integrations and relational persistence",
              "Standardized reusable components and modular structure",
            ],
          },
          {
            role: "Product development",
            period: "2019 - 2021",
            company: "Cross-functional teams",
            description:
              "Participated in refinement, implementation and follow-up cycles for web products with multiple user profiles.",
            achievements: [
              "Collaborated with design and product on delivery prioritization",
              "Evolved interfaces and components with a focus on consistency",
              "Adjusted performance, usability and data organization",
            ],
          },
        ],
        educationTitle: "Education and focus",
        education: [
          "Continuous training in web development, software architecture and product practices.",
          "Regular updates on Next.js, NestJS, API design, observability and UI best practices.",
        ],
        skillsTitle: "Key skills",
        skills: [
          "Conversion-focused frontend",
          "Modular and testable backend",
          "Data modeling and integrations",
          "Clear technical communication",
          "Iterative delivery with impact priority",
        ],
        ctaTitle: "Need a profile like this on your team?",
        ctaDescription:
          "Download the PDF resume or contact me directly to discuss a role, freelance work or partnership.",
      }
    : {
        title: "Currículo e experiência",
        subtitle:
          "Resumo objetivo para recrutadores e clientes que querem entender meu perfil em menos de um minuto.",
        summary:
          "Desenvolvedor Full Stack com foco em produtos orientados a conversão, interfaces claras e backends bem organizados. Atuo do discovery ao deploy, com atenção a escopo, manutenção e comunicação técnica.",
        highlights: [
          "Next.js, React, TypeScript e Tailwind no frontend",
          "NestJS, Prisma e PostgreSQL no backend",
          "Arquitetura limpa, validação e separação de responsabilidades",
          "Apoio em decisões de produto, UX e evolução técnica",
        ],
        experienceTitle: "Experiência",
        experiences: [
          {
            role: "Full Stack Developer",
            period: "2021 - Atual",
            company: "Freelance e projetos sob demanda",
            description:
              "Entrega de páginas institucionais, dashboards e APIs com foco em clareza de escopo, velocidade de implementação e facilidade de manutenção.",
            achievements: [
              "Construção de fluxos de captação e páginas de conversão",
              "Implementação de integrações com APIs e persistência relacional",
              "Padronização de componentes reutilizáveis e estrutura modular",
            ],
          },
          {
            role: "Desenvolvimento de produto",
            period: "2019 - 2021",
            company: "Times multifuncionais",
            description:
              "Participação em ciclos de refinamento, implementação e acompanhamento de features em produtos web com múltiplos perfis de usuário.",
            achievements: [
              "Colaboração com design e produto para priorização de entregas",
              "Evolução de interfaces e componentes orientados a consistência",
              "Ajustes de performance, usabilidade e organização de dados",
            ],
          },
        ],
        educationTitle: "Formação e foco",
        education: [
          "Formação contínua em desenvolvimento web, arquitetura de software e práticas de produto.",
          "Atualização frequente em Next.js, NestJS, API design, observabilidade e boas práticas de UI.",
        ],
        skillsTitle: "Competências principais",
        skills: [
          "Frontend com foco em conversão",
          "Backend modular e testável",
          "Modelagem de dados e integrações",
          "Comunicação técnica clara",
          "Entrega iterativa com prioridade de impacto",
        ],
        ctaTitle: "Precisa de um perfil como este no seu time?",
        ctaDescription:
          "Baixe o currículo em PDF ou me chame direto para discutir vaga, freela ou parceria.",
      }
}

export function getResumePdfContent(locale: Locale) {
  return locale === "en"
    ? {
        title: "João Silva",
        subtitle: "Full Stack Developer",
        summaryTitle: "Summary",
        summary:
          "Full Stack Developer focused on conversion, clear interfaces and modular backends.",
        stacksTitle: "Stacks",
        stacks: "Next.js, React, TypeScript, NestJS, Prisma, PostgreSQL",
        experienceTitle: "Experience",
        experienceLines: [
          "2021 - Present | Freelance and on-demand projects",
          "2021 - Present | Landing pages, dashboards, APIs and integrations",
        ],
        contactsTitle: "Contacts",
        contacts: ["linkedin.com/in/joaosilva", "github.com/joaosilva", "hello@joaosilva.dev"],
      }
    : {
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
      }
}

export function getProjectFormContent(locale: Locale) {
  return locale === "en"
    ? {
        titleNew: "New Project",
        titleEdit: "Edit Project",
        submitLabelNew: "Create project",
        submitLabelEdit: "Save changes",
        closeLabel: "Close modal",
        labels: {
          title: "Title",
          description: "Description",
          techStack: "Technologies",
          githubUrl: "GitHub URL",
          liveUrl: "Live URL",
          videoUrl: "Video URL",
          videoFile: "Upload video file",
          problemTitle: "Problem title",
          problemDescription: "Problem description",
          solutionTitle: "Solution title",
          solutionDescription: "Solution description",
          resultTitle: "Result title",
          resultDescription: "Result description",
        },
        placeholders: {
          title: "Project title",
          description: "Project description",
          techStack: "React, Next.js, NestJS",
          githubUrl: "https://github.com/...",
          liveUrl: "https://...",
          videoUrl: "https://... or data:video/...",
          problemTitle: "Problem",
          problemDescription: "What needed to be solved?",
          solutionTitle: "Solution",
          solutionDescription: "How was it approached?",
          resultTitle: "Result",
          resultDescription: "What changed?",
        },
        helperText: {
          submitHelp: "Fill in the project data and save it to the backend.",
          videoCurrent: "Current video",
          videoKeepExisting: "Leave the URL empty to keep it unchanged",
          videoUpload: "Optional. Uploading a file avoids the JSON body size limit.",
          detailsTitle: "Project blocks",
          detailsDescription: "Edit the three sections shown inside the project detail modal.",
          selectedFilePrefix: "Selected file",
          cancel: "Cancel",
          saving: "Saving...",
        },
        validation: {
          titleTooShort: "Title must be at least 3 characters",
          descriptionTooShort: "Description must be at least 10 characters",
          noTechStack: "Add at least one technology",
          invalidGithubUrl: "GitHub URL must be a valid URL",
          invalidLiveUrl: "Live URL must be a valid URL",
          invalidVideoSource: "Video must be a valid URL, upload path, or video file",
        },
      }
    : {
        titleNew: "Novo projeto",
        titleEdit: "Editar projeto",
        submitLabelNew: "Criar projeto",
        submitLabelEdit: "Salvar alterações",
        closeLabel: "Fechar modal",
        labels: {
          title: "Título",
          description: "Descrição",
          techStack: "Tecnologias",
          githubUrl: "URL do GitHub",
          liveUrl: "URL online",
          videoUrl: "URL do vídeo",
          videoFile: "Enviar arquivo de vídeo",
          problemTitle: "Título do problema",
          problemDescription: "Descrição do problema",
          solutionTitle: "Título da solução",
          solutionDescription: "Descrição da solução",
          resultTitle: "Título do resultado",
          resultDescription: "Descrição do resultado",
        },
        placeholders: {
          title: "Título do projeto",
          description: "Descrição do projeto",
          techStack: "React, Next.js, NestJS",
          githubUrl: "https://github.com/...",
          liveUrl: "https://...",
          videoUrl: "https://... ou data:video/...",
          problemTitle: "Problema",
          problemDescription: "O que precisava ser resolvido?",
          solutionTitle: "Solução",
          solutionDescription: "Como foi abordado?",
          resultTitle: "Resultado",
          resultDescription: "O que mudou?",
        },
        helperText: {
          submitHelp: "Preencha os dados do projeto e salve no backend.",
          videoCurrent: "Vídeo atual",
          videoKeepExisting: "Deixe a URL vazia para manter como está",
          videoUpload: "Opcional. Enviar arquivo evita o limite do corpo JSON.",
          detailsTitle: "Blocos do projeto",
          detailsDescription: "Edite as três seções exibidas no modal de detalhes do projeto.",
          selectedFilePrefix: "Arquivo selecionado",
          cancel: "Cancelar",
          saving: "Salvando...",
        },
        validation: {
          titleTooShort: "O título deve ter pelo menos 3 caracteres",
          descriptionTooShort: "A descrição deve ter pelo menos 10 caracteres",
          noTechStack: "Adicione pelo menos uma tecnologia",
          invalidGithubUrl: "A URL do GitHub precisa ser válida",
          invalidLiveUrl: "A URL online precisa ser válida",
          invalidVideoSource: "O vídeo precisa ser uma URL válida, um caminho de upload ou um arquivo",
        },
      }
}

export function getTestimonialsContent(locale: Locale) {
  return locale === "en"
    ? {
        title: "Social proof",
        subtitle:
          "A space to reinforce trust with testimonials, credibility signals and results perceived by clients and partners.",
        cards: [
          {
            quote:
              "The delivery was organized from start to finish, with a clear scope and objective communication. That made the decision to move forward much easier.",
            name: "Landing page client",
            role: "Local business",
            company: "Institutional project",
            result: "Site ready to capture leads with less friction.",
          },
          {
            quote:
              "The implementation process was easy to follow and the final result provided a much more reliable base to evolve the operation.",
            name: "Technical partner",
            role: "Web product",
            company: "Internal dashboard",
            result: "More predictable flow for maintenance and new features.",
          },
          {
            quote:
              "The focus on conversion and message clarity helped the project move from a generic portfolio piece to a real commercial presentation.",
            name: "Product manager",
            role: "Marketing and sales",
            company: "Conversion case",
            result: "Stronger presentation for recruiters and clients.",
          },
        ],
        trustPoints: [
          "Clear scope delivery",
          "Direct and predictable communication",
          "Easy-to-maintain architecture",
        ],
      }
    : {
        title: "Prova social",
        subtitle:
          "Espaço para reforçar confiança com depoimentos, sinais de credibilidade e resultados percebidos por clientes e parceiros.",
        cards: [
          {
            quote:
              "A entrega foi organizada do início ao fim, com escopo claro e comunicação objetiva. Isso deixou a decisão de avançar muito mais fácil.",
            name: "Cliente de landing page",
            role: "Negócio local",
            company: "Projeto institucional",
            result: "Site pronto para captar leads com menos fricção.",
          },
          {
            quote:
              "O processo de implementação foi simples de acompanhar e o resultado final trouxe uma base muito mais confiável para evoluir a operação.",
            name: "Parceiro técnico",
            role: "Produto web",
            company: "Dashboard interno",
            result: "Fluxo mais previsível para manutenção e novas features.",
          },
          {
            quote:
              "O foco em conversão e clareza de mensagem ajudou o projeto a sair do nível de portfólio genérico e virar uma apresentação comercial de fato.",
            name: "Gestor de produto",
            role: "Marketing e vendas",
            company: "Case de conversão",
            result: "Apresentação mais forte para recrutadores e clientes.",
          },
        ],
        trustPoints: [
          "Entrega com escopo claro",
          "Comunicação direta e previsível",
          "Arquitetura fácil de manter",
        ],
      }
}
