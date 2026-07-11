import { User, UserRole } from './user';

describe('User', () => {
  const dates = [new Date('2026-01-01'), new Date('2026-01-02')] as const;

  it('normalizes the email and does not expose the password hash', () => {
    const user = new User(
      'user-1',
      ' Admin@Portfolio.Local ',
      'salt:hash',
      UserRole.administrador,
      ...dates,
    );

    expect(user.email).toBe('admin@portfolio.local');
    expect(user.toJSON()).not.toHaveProperty('passwordHash');
  });

  it('rejects invalid invariants', () => {
    expect(
      () =>
        new User(
          '',
          'admin@portfolio.local',
          'hash',
          UserRole.administrador,
          ...dates,
        ),
    ).toThrow('User id must not be empty');
    expect(
      () =>
        new User(
          'user-1',
          'invalid-email',
          'hash',
          UserRole.administrador,
          ...dates,
        ),
    ).toThrow('Email must be valid');
    expect(
      () =>
        new User(
          'user-1',
          'admin@portfolio.local',
          '',
          UserRole.administrador,
          ...dates,
        ),
    ).toThrow('Password hash must not be empty');
  });
});
