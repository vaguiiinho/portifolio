import {
  User as PrismaUser,
  UserRole as PrismaUserRole,
} from '../../../../generated/prisma/client';
import { User, UserRole } from '../../domain/entities/user';

export class UserPrismaMapper {
  static toDomain(user: PrismaUser): User {
    return new User(
      user.id,
      user.email,
      user.passwordHash,
      user.role as UserRole,
      user.createdAt,
      user.updatedAt,
    );
  }

  static toPersistence(user: User) {
    return {
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role as PrismaUserRole,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
