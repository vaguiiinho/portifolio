import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../domain/entities/user';
import type { IUserRepository } from '../domain/repositories/i-user-repository';
import type { IPasswordHasher } from '../domain/services/i-password-hasher';
import type { ITokenService } from '../domain/services/i-token-service';

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  user: ReturnType<User['toJSON']>;
}

@Injectable()
export class Login {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
    @Inject('ITokenService')
    private readonly tokenService: ITokenService,
  ) {}

  async execute(input: LoginInput): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await this.passwordHasher.compare(
      input.password,
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
      user: user.toJSON(),
    };
  }
}
