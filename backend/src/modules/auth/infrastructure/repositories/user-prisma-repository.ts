import { ConflictException, Injectable } from '@nestjs/common';
import {
  Prisma,
  User as PrismaUser,
  UserRole as PrismaUserRole,
} from '../../../../generated/prisma/client';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { User, UserRole } from '../../domain/entities/user';
import type { IUserRepository } from '../../domain/repositories/i-user-repository';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? this.toDomain(user) : null;
  }

  async create(user: User): Promise<User> {
    try {
      const created = await this.prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          passwordHash: user.passwordHash,
          role: user.role as PrismaUserRole,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
      return this.toDomain(created);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email is already in use');
      }
      throw error;
    }
  }

  private toDomain(user: PrismaUser): User {
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
