import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User, UserRole } from '../domain/entities/user';
import { PlainPassword } from '../domain/value-objects';
import type { IUserRepository } from '../domain/repositories/i-user-repository';
import type { IPasswordHasher } from '../domain/services/i-password-hasher';
import type { IIdGenerator } from '../../../shared/domain/services/i-id-generator';
import { toUserResult, UserResult } from './user-result';

export interface CreateUserInput {
  email: string;
  password: string;
  role?: UserRole;
}

@Injectable()
export class CreateUser {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,
    @Inject('IIdGenerator') private readonly idGenerator: IIdGenerator,
  ) {}

  async execute(input: CreateUserInput): Promise<UserResult> {
    const password = PlainPassword.create(input.password).toString();
    const email = input.email.trim().toLowerCase();
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const now = new Date();
    const user = new User(
      this.idGenerator.generate(),
      email,
      await this.passwordHasher.hash(password),
      input.role ?? UserRole.administrador,
      now,
      now,
    );

    return toUserResult(await this.userRepository.create(user));
  }
}
