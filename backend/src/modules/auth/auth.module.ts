import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { Login } from './application/login';
import { CreateUser } from './application/create-user';
import { UserPrismaRepository } from './infrastructure/repositories/user-prisma-repository';
import { PasswordHasherService } from './infrastructure/services/password-hasher.service';
import { JwtTokenService } from './infrastructure/services/jwt-token.service';
import { AuthGuard } from './presentation/guards/auth.guard';
import { RolesGuard } from './presentation/guards/roles.guard';
import { PrismaService } from '../../shared/infrastructure/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [
    Login,
    CreateUser,
    AuthGuard,
    RolesGuard,
    {
      provide: 'IUserRepository',
      useClass: UserPrismaRepository,
    },
    {
      provide: 'IPasswordHasher',
      useClass: PasswordHasherService,
    },
    {
      provide: 'ITokenService',
      useClass: JwtTokenService,
    },
    PrismaService,
  ],
  exports: [AuthGuard, RolesGuard, 'ITokenService'],
})
export class AuthModule {}
