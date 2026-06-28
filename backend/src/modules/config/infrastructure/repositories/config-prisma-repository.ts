import { Injectable } from '@nestjs/common';
import { Config as PrismaConfig } from '../../../../generated/prisma/client';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Config } from '../../domain/entities/config';
import type {
  Locale,
  LocalizedContent,
  ServicesContent,
  SiteContent,
  TestimonialsContent,
} from '../../domain/entities/site-content';
import { IConfigRepository } from '../../domain/repositories/i-config-repository';

const DEFAULT_CONFIG = {
  id: '1',
  siteName: 'João Silva',
  description:
    'Full Stack Developer building scalable and modern applications.',
  aboutBio: {
    pt: [
      'Sou João Silva, desenvolvedor Full Stack com foco em produtos que precisam comunicar valor rápido, sustentar crescimento e ser fáceis de evoluir.',
      'Trabalho com Next.js, TypeScript, NestJS e PostgreSQL para construir jornadas que simplificam a decisão do usuário e reduzem atrito na conversão.',
      'Prefiro escopos bem definidos, entregas previsíveis e interfaces que deixam claro o próximo passo para recrutadores, clientes e times técnicos.',
    ],
    en: [
      "I'm João Silva, a Full Stack Developer focused on products that need to communicate value quickly, support growth and stay easy to evolve.",
      'I work with Next.js, TypeScript, NestJS and PostgreSQL to build journeys that simplify user decisions and reduce conversion friction.',
      'I prefer well-defined scopes, predictable deliveries and interfaces that make the next step clear for recruiters, clients and technical teams.',
    ],
  } satisfies SiteContent['aboutBio'],
  servicesContent: {
    pt: {
      ctaTitle: 'Quer um escopo mais preciso?',
      ctaDescription:
        'Eu posso adaptar a entrega para uma landing page, case study, painel interno ou API sob medida.',
      ctaLabel: 'Pedir orçamento',
      cards: [
        {
          title: 'Landing pages e portfólios',
          description:
            'Sites rápidos, escaneáveis e orientados a CTA para gerar conversa e apresentar credibilidade em poucos segundos.',
          deliverables: ['Hero com CTA forte', 'Seções de prova social', 'SEO básico e compartilhamento'],
        },
        {
          title: 'Dashboards e backoffices',
          description:
            'Interfaces para operação interna com foco em organização de dados, desempenho e leitura simples para times em rotina.',
          deliverables: ['Fluxos administrativos', 'Painéis analíticos', 'Controle de permissões'],
        },
        {
          title: 'APIs e integrações',
          description:
            'Backends com arquitetura limpa, validação e persistência estruturada para conectar sistemas sem acoplamento desnecessário.',
          deliverables: ['NestJS + Prisma', 'Regras de negócio isoladas', 'Integrações com serviços externos'],
        },
        {
          title: 'Evolução e manutenção',
          description:
            'Ajustes contínuos para manter o produto confiável, rápido e alinhado com novas demandas de negócio ou contratação.',
          deliverables: ['Correções e melhorias', 'Refatoração orientada a valor', 'Apoio em decisão técnica'],
        },
      ],
    },
    en: {
      ctaTitle: 'Need a more precise scope?',
      ctaDescription:
        'I can adapt the delivery for a landing page, case study, internal dashboard or custom API.',
      ctaLabel: 'Request a quote',
      cards: [
        {
          title: 'Landing pages and portfolios',
          description:
            'Fast, scannable sites built around a strong CTA to generate conversation and present credibility in seconds.',
          deliverables: ['Strong hero CTA', 'Social proof sections', 'Basic SEO and sharing'],
        },
        {
          title: 'Dashboards and backoffices',
          description:
            'Operational interfaces focused on data organization, performance and a simple reading flow for daily work.',
          deliverables: ['Admin flows', 'Analytics panels', 'Permission control'],
        },
        {
          title: 'APIs and integrations',
          description:
            'Backends with clean architecture, validation and structured persistence to connect systems without unnecessary coupling.',
          deliverables: ['NestJS + Prisma', 'Isolated business rules', 'External service integrations'],
        },
        {
          title: 'Evolution and maintenance',
          description:
            'Continuous improvements to keep the product reliable, fast and aligned with new business or hiring demands.',
          deliverables: ['Fixes and improvements', 'Value-driven refactoring', 'Technical decision support'],
        },
      ],
    },
  } satisfies SiteContent['servicesContent'],
  testimonialsContent: {
    pt: {
      cards: [
        {
          quote:
            'A entrega foi organizada do início ao fim, com escopo claro e comunicação objetiva. Isso deixou a decisão de avançar muito mais fácil.',
          name: 'Cliente de landing page',
          role: 'Negócio local',
          company: 'Projeto institucional',
          result: 'Site pronto para captar leads com menos fricção.',
        },
        {
          quote:
            'O processo de implementação foi simples de acompanhar e o resultado final trouxe uma base muito mais confiável para evoluir a operação.',
          name: 'Parceiro técnico',
          role: 'Produto web',
          company: 'Dashboard interno',
          result: 'Fluxo mais previsível para manutenção e novas features.',
        },
        {
          quote:
            'O foco em conversão e clareza de mensagem ajudou o projeto a sair do nível de portfólio genérico e virar uma apresentação comercial de fato.',
          name: 'Gestor de produto',
          role: 'Marketing e vendas',
          company: 'Case de conversão',
          result: 'Apresentação mais forte para recrutadores e clientes.',
        },
      ],
      trustPoints: [
        'Entrega com escopo claro',
        'Comunicação direta e previsível',
        'Arquitetura fácil de manter',
      ],
    },
    en: {
      cards: [
        {
          quote:
            'The delivery was organized from start to finish, with a clear scope and objective communication. That made the decision to move forward much easier.',
          name: 'Landing page client',
          role: 'Local business',
          company: 'Institutional project',
          result: 'Site ready to capture leads with less friction.',
        },
        {
          quote:
            'The implementation process was easy to follow and the final result provided a much more reliable base to evolve the operation.',
          name: 'Technical partner',
          role: 'Web product',
          company: 'Internal dashboard',
          result: 'More predictable flow for maintenance and new features.',
        },
        {
          quote:
            'The focus on conversion and message clarity helped the project move from a generic portfolio piece to a real commercial presentation.',
          name: 'Product manager',
          role: 'Marketing and sales',
          company: 'Conversion case',
          result: 'Stronger presentation for recruiters and clients.',
        },
      ],
      trustPoints: [
        'Clear scope delivery',
        'Direct and predictable communication',
        'Easy-to-maintain architecture',
      ],
    },
  } satisfies SiteContent['testimonialsContent'],
};

function isLocale(value: unknown): value is Locale {
  return value === 'pt' || value === 'en';
}

function cloneStringArray(value: string[]): string[] {
  return [...value];
}

function cloneServicesContent(value: ServicesContent): ServicesContent {
  return {
    ctaTitle: value.ctaTitle,
    ctaDescription: value.ctaDescription,
    ctaLabel: value.ctaLabel,
    cards: value.cards.map((card) => ({
      title: card.title,
      description: card.description,
      deliverables: [...card.deliverables],
    })),
  };
}

function cloneTestimonialsContent(value: TestimonialsContent): TestimonialsContent {
  return {
    cards: value.cards.map((card) => ({
      quote: card.quote,
      name: card.name,
      role: card.role,
      company: card.company,
      result: card.result,
    })),
    trustPoints: [...value.trustPoints],
  };
}

function normalizeLocalizedValue<T>(
  value: unknown,
  fallback: LocalizedContent<T>,
  clone: (input: T) => T,
): LocalizedContent<T> {
  if (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    ('pt' in value || 'en' in value)
  ) {
    const candidate = value as LocalizedContent<T>;

    return {
      pt: candidate.pt ? clone(candidate.pt) : fallback.pt ? clone(fallback.pt) : undefined,
      en: candidate.en ? clone(candidate.en) : fallback.en ? clone(fallback.en) : undefined,
    };
  }

  if (value !== undefined && value !== null) {
    return {
      pt: clone(value as T),
      en: clone(value as T),
    };
  }

  return {
    pt: fallback.pt ? clone(fallback.pt) : undefined,
    en: fallback.en ? clone(fallback.en) : undefined,
  };
}

function normalizeConfig(raw: PrismaConfig): Config {
  const prismaConfig = raw as PrismaConfig & {
    aboutBio?: unknown;
    servicesContent?: unknown;
    testimonialsContent?: unknown;
  };

  return new Config(
    prismaConfig.id,
    prismaConfig.siteName,
    prismaConfig.description,
    normalizeLocalizedValue(prismaConfig.aboutBio, DEFAULT_CONFIG.aboutBio, cloneStringArray),
    normalizeLocalizedValue(prismaConfig.servicesContent, DEFAULT_CONFIG.servicesContent, cloneServicesContent),
    normalizeLocalizedValue(
      prismaConfig.testimonialsContent,
      DEFAULT_CONFIG.testimonialsContent,
      cloneTestimonialsContent,
    ),
    prismaConfig.updatedAt,
  );
}

@Injectable()
export class ConfigPrismaRepository implements IConfigRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(): Promise<Config> {
    let prismaConfig = await this.prisma.config.findFirst();

    if (!prismaConfig) {
      prismaConfig = await this.prisma.config.create({
        data: {
          ...DEFAULT_CONFIG,
          updatedAt: new Date(),
        } as never,
      });
    }

    return normalizeConfig(prismaConfig);
  }

  async update(config: Config): Promise<Config> {
    const prismaConfig = await this.prisma.config.update({
      where: { id: config.id },
      data: {
        siteName: config.siteName,
        description: config.description,
        aboutBio: config.aboutBio,
        servicesContent: config.servicesContent,
        testimonialsContent: config.testimonialsContent,
        updatedAt: config.updatedAt,
      } as never,
    });

    return normalizeConfig(prismaConfig);
  }
}
