import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  randomBytes,
  randomUUID,
  scrypt as scryptCallback,
} from 'crypto';
import { promisify } from 'util';
import path from 'path';

const scrypt = promisify(scryptCallback);
const ADMIN_ROLE = 'administrador' as const;

type PrismaClientCtor = new (options: { adapter: PrismaPg }) => {
  project: {
    deleteMany: () => Promise<unknown>;
    createMany: (args: {
      data: Array<Record<string, unknown>>;
    }) => Promise<unknown>;
  };
  stats: {
    upsert: (args: Record<string, unknown>) => Promise<unknown>;
  };
  config: {
    upsert: (args: Record<string, unknown>) => Promise<unknown>;
  };
  $executeRaw: (strings: TemplateStringsArray, ...args: unknown[]) => Promise<unknown>;
  $disconnect: () => Promise<void>;
};

function loadPrismaClient(): PrismaClientCtor {
  // Build stage uses src/generated, runtime image uses dist/generated.
  const candidates = [
    '../src/generated/prisma/client.ts',
    '../dist/generated/prisma/client.js',
  ];

  for (const candidate of candidates) {
    try {
      const modulePath = path.resolve(__dirname, candidate);
      const prismaModule = require(modulePath) as { PrismaClient?: PrismaClientCtor };

      if (prismaModule?.PrismaClient) {
        return prismaModule.PrismaClient;
      }
    } catch {
      // Try the next generated client location.
    }
  }

  throw new Error(
    'Unable to load PrismaClient from src/generated/prisma/client or dist/generated/prisma/client.',
  );
}

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;

  return `${salt}:${derivedKey.toString('hex')}`;
}

const PrismaClient = loadPrismaClient();

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

const seedProjects = [
  {
    title: 'Portfolio Website',
    description:
      'Personal portfolio built with Next.js, NestJS, Prisma, and PostgreSQL.',
    techStack: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL'],
    githubUrl: 'https://github.com/joaosilva/portfolio',
    liveUrl: 'https://joaosilva.dev',
  },
  {
    title: 'Analytics Dashboard',
    description:
      'Internal dashboard for monitoring product usage and business metrics in real time.',
    techStack: ['React', 'NestJS', 'Redis', 'PostgreSQL'],
    githubUrl: 'https://github.com/joaosilva/analytics-dashboard',
    liveUrl: 'https://dashboard.joaosilva.dev',
  },
  {
    title: 'E-commerce Platform',
    description:
      'Scalable e-commerce platform with product catalog, cart, and checkout flows.',
    techStack: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
    githubUrl: 'https://github.com/joaosilva/ecommerce-platform',
    liveUrl: 'https://shop.joaosilva.dev',
  },
];

const adminEmail = process.env.AUTH_ADMIN_EMAIL ?? 'admin@portfolio.local';
const adminPassword = process.env.AUTH_ADMIN_PASSWORD ?? 'admin123456';

async function main() {
  await prisma.project.deleteMany();

  await prisma.project.createMany({
    data: seedProjects.map((project) => ({
      ...project,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  });

  await prisma.stats.upsert({
    where: { id: '1' },
    update: {
      projectsCount: seedProjects.length,
      visitors: 0,
      updatedAt: new Date(),
    },
    create: {
      id: '1',
      projectsCount: seedProjects.length,
      visitors: 0,
      updatedAt: new Date(),
    },
  });

  await prisma.config.upsert({
    where: { id: '1' },
    update: {
      siteName: 'João Silva',
      description:
        'Full Stack Developer building scalable and modern applications.',
      updatedAt: new Date(),
    },
    create: {
      id: '1',
      siteName: 'João Silva',
      description:
        'Full Stack Developer building scalable and modern applications.',
      updatedAt: new Date(),
    },
  });

  const now = new Date();
  const passwordHash = await hashPassword(adminPassword);

  await prisma.$executeRaw`
    INSERT INTO "users" (
      id,
      email,
      "passwordHash",
      role,
      "createdAt",
      "updatedAt"
    )
    VALUES (
      ${randomUUID()},
      ${adminEmail},
      ${passwordHash},
      ${ADMIN_ROLE},
      ${now},
      ${now}
    )
    ON CONFLICT ("email")
    DO UPDATE SET
      "passwordHash" = EXCLUDED."passwordHash",
      role = EXCLUDED.role,
      "updatedAt" = EXCLUDED."updatedAt"
  `;

  console.log(
    `Seed completed: ${seedProjects.length} projects, stats, config and admin user are ready.`,
  );
}

main()
  .catch(async (error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
