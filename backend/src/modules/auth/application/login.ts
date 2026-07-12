import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PlainPassword } from '../domain/value-objects';
import type { IUserRepository } from '../domain/repositories/i-user-repository';
import type { IPasswordHasher } from '../domain/services/i-password-hasher';
import type { ITokenService } from '../domain/services/i-token-service';
import { toUserResult, UserResult } from './user-result';
import { PASSWORD_HASHER, TOKEN_SERVICE, USER_REPOSITORY } from '../../../shared/domain/tokens';

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  user: UserResult;
}

@Injectable()
export class Login {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: IPasswordHasher,
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: ITokenService,
  ) {}

  async execute(input: LoginInput): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const password = PlainPassword.create(input.password).toString();
    const passwordMatches = await this.passwordHasher.compare(
      password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.tokenService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      user: toUserResult(user),
    };
  }
}
