import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User, UserRole } from '../domain/entities/user';
import { PlainPassword } from '../domain/value-objects';
import type { IUserRepository } from '../domain/repositories/i-user-repository';
import type { IPasswordHasher } from '../domain/services/i-password-hasher';
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
      randomUUID(),
      email,
      await this.passwordHasher.hash(password),
      input.role ?? UserRole.administrador,
      now,
      now,
    );

    return toUserResult(await this.userRepository.create(user));
  }
}
