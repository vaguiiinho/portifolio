import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { randomUUID } from 'crypto';
import { hashPassword } from '../src/modules/auth/infrastructure/services/password-hasher.service';
import { UserRole } from '../src/modules/auth/domain/entities/user';

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
      ${UserRole.administrador},
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
