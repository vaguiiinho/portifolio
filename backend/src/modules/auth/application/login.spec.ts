import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { Login } from './login';
import { User, UserRole } from '../domain/entities/user';
import type { IUserRepository } from '../domain/repositories/i-user-repository';
import type { IPasswordHasher } from '../domain/services/i-password-hasher';
import type { ITokenService } from '../domain/services/i-token-service';

describe('Login', () => {
  let service: Login;
  let userRepository: jest.Mocked<IUserRepository>;
  let passwordHasher: jest.Mocked<IPasswordHasher>;
  let tokenService: jest.Mocked<ITokenService>;

  beforeEach(async () => {
    const mockUserRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
    };
    const mockPasswordHasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };
    const mockTokenService = {
      sign: jest.fn(),
      verify: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Login,
        { provide: 'IUserRepository', useValue: mockUserRepository },
        { provide: 'IPasswordHasher', useValue: mockPasswordHasher },
        { provide: 'ITokenService', useValue: mockTokenService },
      ],
    }).compile();

    service = module.get(Login);
    userRepository = module.get('IUserRepository');
    passwordHasher = module.get('IPasswordHasher');
    tokenService = module.get('ITokenService');
  });

  it('should authenticate a valid administrator', async () => {
    const user = new User(
      'user-1',
      'admin@portfolio.local',
      'hashed-password',
      UserRole.administrador,
      new Date('2026-06-28T00:00:00.000Z'),
      new Date('2026-06-28T00:00:00.000Z'),
    );

    userRepository.findByEmail.mockResolvedValue(user);
    passwordHasher.compare.mockResolvedValue(true);
    tokenService.sign.mockReturnValue('token');

    const result = await service.execute({
      email: user.email,
      password: 'secret',
    });

    expect(userRepository.findByEmail).toHaveBeenCalledWith(user.email);
    expect(passwordHasher.compare).toHaveBeenCalledWith(
      'secret',
      user.passwordHash,
    );
    expect(tokenService.sign).toHaveBeenCalledWith({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    expect(result).toEqual({
      accessToken: 'token',
      user: user.toJSON(),
    });
  });

  it('should reject invalid credentials', async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    await expect(
      service.execute({
        email: 'missing@portfolio.local',
        password: 'secret',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
