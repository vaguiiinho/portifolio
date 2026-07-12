import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '../../../../generated/prisma/client';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { User } from '../../domain/entities/user';
import type { IUserRepository } from '../../domain/repositories/i-user-repository';
import { UserPrismaMapper } from '../mappers/user-prisma-mapper';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? UserPrismaMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? UserPrismaMapper.toDomain(user) : null;
  }

  async create(user: User): Promise<User> {
    try {
      const created = await this.prisma.user.create({
        data: UserPrismaMapper.toPersistence(user),
      });
      return UserPrismaMapper.toDomain(created);
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
}
