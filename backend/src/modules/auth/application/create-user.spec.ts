import { ConflictException } from '@nestjs/common';
import { CreateUser } from './create-user';
import { User, UserRole } from '../domain/entities/user';
import type { IUserRepository } from '../domain/repositories/i-user-repository';
import type { IPasswordHasher } from '../domain/services/i-password-hasher';
import type { IIdGenerator } from '../../../shared/domain/services/i-id-generator';

describe('CreateUser', () => {
  let service: CreateUser;
  let userRepository: jest.Mocked<IUserRepository>;
  let passwordHasher: jest.Mocked<IPasswordHasher>;
  let idGenerator: jest.Mocked<IIdGenerator>;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
    };
    passwordHasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };
    idGenerator = { generate: jest.fn(() => 'user-id') };
    service = new CreateUser(userRepository, passwordHasher, idGenerator);
  });

  it('creates an administrator with a hashed password', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    passwordHasher.hash.mockResolvedValue('hashed-password');
    userRepository.create.mockImplementation(async (user) => user);

    const result = await service.execute({
      email: ' Admin@Portfolio.Local ',
      password: 'secret123',
    });

    expect(userRepository.findByEmail).toHaveBeenCalledWith(
      'admin@portfolio.local',
    );
    expect(passwordHasher.hash).toHaveBeenCalledWith('secret123');
    expect(idGenerator.generate).toHaveBeenCalled();
    expect(result.email).toBe('admin@portfolio.local');
    expect(result.role).toBe(UserRole.administrador);
    expect(result).not.toHaveProperty('passwordHash');
  });

  it('rejects an email that is already registered', async () => {
    userRepository.findByEmail.mockResolvedValue(
      new User(
        'user-1',
        'admin@portfolio.local',
        'hash',
        UserRole.administrador,
        new Date(),
        new Date(),
      ),
    );

    await expect(
      service.execute({
        email: 'admin@portfolio.local',
        password: 'secret123',
      }),
    ).rejects.toThrow(ConflictException);
    expect(passwordHasher.hash).not.toHaveBeenCalled();
  });
});
