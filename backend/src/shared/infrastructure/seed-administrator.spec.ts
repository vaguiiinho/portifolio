const { administratorEnvironment, seedAdministrator } = require('../../../prisma/seed.cjs');

describe('administrator seed', () => {
  const env = {
    DATABASE_URL: 'postgresql://user:password@localhost:5432/database',
    ADMIN_EMAIL: ' Admin@Example.com ',
    ADMIN_PASSWORD: 'secret123',
  };

  it('normalizes and validates the required environment', () => {
    expect(administratorEnvironment(env)).toMatchObject({
      email: 'admin@example.com',
      password: 'secret123',
    });
    expect(() => administratorEnvironment({ ...env, ADMIN_EMAIL: '' })).toThrow(
      'Set ADMIN_EMAIL and ADMIN_PASSWORD',
    );
    expect(() => administratorEnvironment({ ...env, DATABASE_URL: '' })).toThrow(
      'DATABASE_URL must be defined',
    );
  });

  it('creates the first administrator idempotently', async () => {
    const upsert = jest.fn();
    const prisma = { user: { upsert } };
    const log = jest.fn();

    await seedAdministrator(prisma, env, log);
    await seedAdministrator(prisma, env, log);

    expect(upsert).toHaveBeenCalledTimes(2);
    expect(upsert).toHaveBeenNthCalledWith(1, expect.objectContaining({
      where: { email: 'admin@example.com' },
      update: {},
      create: expect.objectContaining({
        email: 'admin@example.com',
        role: 'administrador',
        passwordHash: expect.stringMatching(/^[a-f0-9]{32}:[a-f0-9]{128}$/),
      }),
    }));
    expect(log).toHaveBeenCalledWith('Administrator admin@example.com is ready.');
  });
});
