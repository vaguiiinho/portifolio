import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

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

  console.log(
    `Seed completed: ${seedProjects.length} projects, stats and config are ready.`,
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
