import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { hashPassword } from '../src/modules/auth/infrastructure/services/password-hasher.service';

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL must be defined to seed the administrator');
}

if (!email || !password) {
  throw new Error(
    'Set ADMIN_EMAIL and ADMIN_PASSWORD before creating the initial administrator',
  );
}

if (password.length < 6) {
  throw new Error('ADMIN_PASSWORD must contain at least 6 characters');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const adminEmail = email;
const adminPassword = password;

async function main() {
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: await hashPassword(adminPassword),
      role: 'administrador',
    },
  });

  console.log(`Administrator ${adminEmail} is ready.`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
