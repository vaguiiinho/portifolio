import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { Login } from './application/login';
import { CreateUser } from './application/create-user';
import { UserPrismaRepository } from './infrastructure/repositories/user-prisma-repository';
import { PasswordHasherService } from './infrastructure/services/password-hasher.service';
import { JwtTokenService } from './infrastructure/services/jwt-token.service';
import { AuthGuard } from './presentation/guards/auth.guard';
import { RolesGuard } from './presentation/guards/roles.guard';
import { IdentifiersModule } from '../../shared/infrastructure';
import { PASSWORD_HASHER, TOKEN_SERVICE, USER_REPOSITORY } from '../../shared/domain/tokens';

@Module({
  imports: [IdentifiersModule],
  controllers: [AuthController],
  providers: [
    Login,
    CreateUser,
    AuthGuard,
    RolesGuard,
    {
      provide: USER_REPOSITORY,
      useClass: UserPrismaRepository,
    },
    {
      provide: PASSWORD_HASHER,
      useClass: PasswordHasherService,
    },
    {
      provide: TOKEN_SERVICE,
      useClass: JwtTokenService,
    },
  ],
  exports: [AuthGuard, RolesGuard, TOKEN_SERVICE],
})
export class AuthModule {}
