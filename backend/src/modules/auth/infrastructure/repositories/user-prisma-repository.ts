import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { User, UserRole } from '../../domain/entities/user';
import type { IUserRepository } from '../../domain/repositories/i-user-repository';

type UserRow = {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const users = await this.prisma.$queryRaw<UserRow[]>`
      SELECT
        id,
        email,
        "passwordHash",
        role,
        "createdAt",
        "updatedAt"
      FROM "users"
      WHERE id = ${id}
      LIMIT 1
    `;

    return users[0] ? this.toDomain(users[0]) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = await this.prisma.$queryRaw<UserRow[]>`
      SELECT
        id,
        email,
        "passwordHash",
        role,
        "createdAt",
        "updatedAt"
      FROM "users"
      WHERE email = ${email}
      LIMIT 1
    `;

    return users[0] ? this.toDomain(users[0]) : null;
  }

  async create(user: User): Promise<User> {
    const created = await this.prisma.$queryRaw<UserRow[]>`
      INSERT INTO "users" (
        id,
        email,
        "passwordHash",
        role,
        "createdAt",
        "updatedAt"
      )
      VALUES (
        ${user.id},
        ${user.email},
        ${user.passwordHash},
        ${user.role},
        ${user.createdAt},
        ${user.updatedAt}
      )
      RETURNING
        id,
        email,
        "passwordHash",
        role,
        "createdAt",
        "updatedAt"
    `;

    return this.toDomain(created[0]);
  }

  private toDomain(user: UserRow): User {
    return new User(
      user.id,
      user.email,
      user.passwordHash,
      user.role as UserRole,
      user.createdAt,
      user.updatedAt,
    );
  }
}
