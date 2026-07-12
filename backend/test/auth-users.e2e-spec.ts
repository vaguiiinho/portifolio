import { INestApplication, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { CreateUser } from '../src/modules/auth/application/create-user';
import { Login } from '../src/modules/auth/application/login';
import { User, UserRole } from '../src/modules/auth/domain/entities/user';
import type { IUserRepository } from '../src/modules/auth/domain/repositories/i-user-repository';
import type { IPasswordHasher } from '../src/modules/auth/domain/services/i-password-hasher';
import type { AuthTokenPayload, ITokenService } from '../src/modules/auth/domain/services/i-token-service';
import { AuthController } from '../src/modules/auth/presentation/auth.controller';
import { AuthGuard } from '../src/modules/auth/presentation/guards/auth.guard';
import { RolesGuard } from '../src/modules/auth/presentation/guards/roles.guard';
import { EnvironmentService } from '../src/shared/config';
import { ID_GENERATOR, PASSWORD_HASHER, TOKEN_SERVICE, USER_REPOSITORY } from '../src/shared/domain/tokens';
import type { IIdGenerator } from '../src/shared/domain/services/i-id-generator';

class UsersRepository implements IUserRepository {
  private readonly users = new Map<string, User>();

  constructor(users: User[]) {
    users.forEach((user) => {
      this.users.set(user.id, user);
      this.users.set(user.email, user);
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.get(email) ?? null;
  }

  async create(user: User): Promise<User> {
    this.users.set(user.id, user);
    this.users.set(user.email, user);
    return user;
  }
}

class PasswordHasher implements IPasswordHasher {
  async hash(value: string): Promise<string> { return `hash:${value}`; }
  async compare(value: string, hash: string): Promise<boolean> { return hash === `hash:${value}`; }
}

class TokenService implements ITokenService {
  private readonly payloads = new Map<string, AuthTokenPayload>();

  add(token: string, payload: AuthTokenPayload): void { this.payloads.set(token, payload); }
  sign(payload: Omit<AuthTokenPayload, 'iat' | 'exp'>): string { return `token-${payload.sub}`; }
  verify(token: string): AuthTokenPayload {
    const payload = this.payloads.get(token);
    if (!payload) throw new UnauthorizedException('Invalid token');
    return payload;
  }
}

describe('POST /auth/users (e2e)', () => {
  let app: INestApplication<App>;
  let tokens: TokenService;

  const admin = new User('admin-1', 'admin@example.com', 'hash:secret123', UserRole.administrador, new Date(), new Date());
  const visitor = new User('visitor-1', 'visitor@example.com', 'hash:secret123', UserRole.visitante, new Date(), new Date());

  beforeEach(async () => {
    tokens = new TokenService();
    tokens.add('admin-token', { sub: admin.id, email: admin.email, role: admin.role, iat: 1, exp: 9999999999 });
    tokens.add('visitor-token', { sub: visitor.id, email: visitor.email, role: visitor.role, iat: 1, exp: 9999999999 });

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        Login, CreateUser, AuthGuard, RolesGuard, Reflector,
        { provide: USER_REPOSITORY, useValue: new UsersRepository([admin, visitor]) },
        { provide: PASSWORD_HASHER, useClass: PasswordHasher },
        { provide: TOKEN_SERVICE, useValue: tokens },
        { provide: ID_GENERATOR, useValue: { generate: () => 'created-user' } satisfies IIdGenerator },
        { provide: EnvironmentService, useValue: { authCookieSecure: false, authCookieSameSite: 'lax', authCookieDomain: undefined, authJwtExpiresInSeconds: 86400 } },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
  });

  afterEach(async () => { await app.close(); });

  const payload = { email: 'new@example.com', password: 'secret123' };

  it('rejects a request without a token', () => request(app.getHttpServer()).post('/auth/users').send(payload).expect(401));

  it('rejects a visitor token', () => request(app.getHttpServer()).post('/auth/users').set('Authorization', 'Bearer visitor-token').send(payload).expect(403));

  it('allows an administrator and never exposes the password hash', () => request(app.getHttpServer()).post('/auth/users').set('Authorization', 'Bearer admin-token').send(payload).expect(201).expect(({ body }) => {
    expect(body).toMatchObject({ id: 'created-user', email: payload.email, role: UserRole.administrador });
    expect(body.passwordHash).toBeUndefined();
  }));

  it('rejects an invalid payload', () => request(app.getHttpServer()).post('/auth/users').set('Authorization', 'Bearer admin-token').send({ email: 'invalid', password: '123' }).expect(400));

  it('rejects a duplicate email', () => request(app.getHttpServer()).post('/auth/users').set('Authorization', 'Bearer admin-token').send({ email: admin.email, password: 'secret123' }).expect(409));
});
