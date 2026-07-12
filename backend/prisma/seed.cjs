require('dotenv/config');

const { randomBytes, scrypt: scryptCallback } = require('crypto');
const { promisify } = require('util');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('../dist/src/generated/prisma/client');

const scrypt = promisify(scryptCallback);
async function hashPassword(value) {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = await scrypt(value, salt, 64);

  return `${salt}:${derivedKey.toString('hex')}`;
}

function administratorEnvironment(env) {
  const email = env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = env.ADMIN_PASSWORD;
  const databaseUrl = env.DATABASE_URL;

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

  return { email, password, databaseUrl };
}

async function seedAdministrator(prisma, env = process.env, log = console.log) {
  const { email, password } = administratorEnvironment(env);
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash: await hashPassword(password),
      role: 'administrador',
    },
  });

  log(`Administrator ${email} is ready.`);
}

async function main() {
  const { databaseUrl } = administratorEnvironment(process.env);
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: databaseUrl }),
  });

  try {
    await seedAdministrator(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = { administratorEnvironment, seedAdministrator };
