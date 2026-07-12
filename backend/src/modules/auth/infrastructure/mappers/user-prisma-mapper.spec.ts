import { UserRole as PrismaUserRole } from '../../../../generated/prisma/client';
import { User, UserRole } from '../../domain/entities/user';
import { UserPrismaMapper } from './user-prisma-mapper';

describe('UserPrismaMapper', () => {
  it('maps the persistence model and domain entity in both directions', () => {
    const createdAt = new Date('2026-01-01T00:00:00.000Z');
    const updatedAt = new Date('2026-01-02T00:00:00.000Z');
    const user = new User(
      'user-1',
      'admin@example.com',
      '$2b$10$abcdefghijklmnopqrstuvwxyz123456789012345678901234',
      UserRole.administrador,
      createdAt,
      updatedAt,
    );

    expect(UserPrismaMapper.toPersistence(user)).toEqual({
      id: 'user-1',
      email: 'admin@example.com',
      passwordHash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456789012345678901234',
      role: PrismaUserRole.administrador,
      createdAt,
      updatedAt,
    });

    expect(
      UserPrismaMapper.toDomain({
        ...UserPrismaMapper.toPersistence(user),
      }),
    ).toMatchObject({ id: user.id, email: user.email, role: user.role });
  });
});
