import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import request from 'supertest';
import { App } from 'supertest/types';
import { AuthController } from '../src/modules/auth/presentation/auth.controller';
import { ProjectsController } from '../src/modules/projects/presentation/projects.controller';
import { ConfigController } from '../src/modules/config/presentation/config.controller';
import { StatsController } from '../src/modules/stats/presentation/stats.controller';
import { Login } from '../src/modules/auth/application/login';
import { CreateProject } from '../src/modules/projects/application/create-project';
import { ListProjects } from '../src/modules/projects/application/list-projects';
import { UpdateProject } from '../src/modules/projects/application/update-project';
import { DeleteProject } from '../src/modules/projects/application/delete-project';
import { GetConfig } from '../src/modules/config/application/get-config';
import { UpdateConfig } from '../src/modules/config/application/update-config';
import { GetStats } from '../src/modules/stats/application/get-stats';
import { UpdateStats } from '../src/modules/stats/application/update-stats';
import { TrackStatsEvent } from '../src/modules/stats/application/track-stats-event';
import { User, UserRole } from '../src/modules/auth/domain/entities/user';
import type { IUserRepository } from '../src/modules/auth/domain/repositories/i-user-repository';
import type { IPasswordHasher } from '../src/modules/auth/domain/services/i-password-hasher';
import type {
  AuthTokenPayload,
  ITokenService,
} from '../src/modules/auth/domain/services/i-token-service';
import type { IProjectRepository } from '../src/modules/projects/domain/repositories/i-project-repository';
import type { IConfigRepository } from '../src/modules/config/domain/repositories/i-config-repository';
import type { IStatsRepository } from '../src/modules/stats/domain/repositories/i-stats-repository';
import { Project } from '../src/modules/projects/domain/entities/project';
import { Config } from '../src/modules/config/domain/entities/config';
import { Stats } from '../src/modules/stats/domain/entities/stats';
import { AuthGuard } from '../src/modules/auth/presentation/guards/auth.guard';
import { RolesGuard } from '../src/modules/auth/presentation/guards/roles.guard';

class InMemoryUserRepository implements IUserRepository {
  private readonly users = new Map<string, User>();

  constructor(users: User[]) {
    for (const user of users) {
      this.users.set(user.email, user);
      this.users.set(user.id, user);
    }
  }

  findById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  findByEmail(email: string): Promise<User | null> {
    return this.users.get(email) ?? null;
  }

  create(user: User): Promise<User> {
    this.users.set(user.email, user);
    this.users.set(user.id, user);
    return user;
  }
}

class InMemoryPasswordHasher implements IPasswordHasher {
  hash(password: string): Promise<string> {
    return `hash:${password}`;
  }

  compare(password: string, hash: string): Promise<boolean> {
    return hash === `hash:${password}`;
  }
}

class InMemoryTokenService implements ITokenService {
  private readonly tokens = new Map<string, AuthTokenPayload>();
  private readonly visitorToken = 'visitor-token';

  constructor(visitor: User) {
    this.tokens.set(this.visitorToken, {
      sub: visitor.id,
      email: visitor.email,
      role: visitor.role,
      iat: 1,
      exp: 9999999999,
    });
  }

  sign(payload: Omit<AuthTokenPayload, 'iat' | 'exp'>): string {
    const token = `token-${payload.sub}`;
    this.tokens.set(token, {
      ...payload,
      iat: 1,
      exp: 9999999999,
    });

    return token;
  }

  verify(token: string): AuthTokenPayload {
    const payload = this.tokens.get(token);

    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    return payload;
  }

  getAdminToken(adminId: string) {
    return `token-${adminId}`;
  }

  getVisitorToken() {
    return this.visitorToken;
  }
}

class InMemoryProjectRepository implements IProjectRepository {
  private readonly projects = new Map<string, Project>();

  constructor(initialProjects: Project[]) {
    for (const project of initialProjects) {
      this.projects.set(project.id, project);
    }
  }

  findAll(): Promise<Project[]> {
    return [...this.projects.values()];
  }

  findById(id: string): Promise<Project | null> {
    return this.projects.get(id) ?? null;
  }

  create(project: Project): Promise<Project> {
    this.projects.set(project.id, project);
    return project;
  }

  update(project: Project): Promise<Project> {
    this.projects.set(project.id, project);
    return project;
  }

  delete(id: string): Promise<void> {
    this.projects.delete(id);
  }
}

class InMemoryConfigRepository implements IConfigRepository {
  private config = new Config(
    'config-1',
    'Portfolio',
    'Initial description',
    new Date('2026-06-28T00:00:00.000Z'),
  );

  find(): Promise<Config> {
    return this.config;
  }

  update(config: Config): Promise<Config> {
    this.config = config;
    return this.config;
  }
}

class InMemoryStatsRepository implements IStatsRepository {
  private stats = new Stats(
    'stats-1',
    1,
    42,
    new Date('2026-06-28T00:00:00.000Z'),
    { 'page:home': 4, 'project:view:project-1': 3, 'cta:contact': 2 },
  );

  find(): Promise<Stats> {
    return this.stats;
  }

  update(stats: Stats): Promise<Stats> {
    this.stats = stats;
    return this.stats;
  }

  trackEvent(key: string, increment = 1): Promise<Stats> {
    this.stats.trackEvent(key, increment);
    return this.stats;
  }
}

describe('Auth and permissions e2e', () => {
  let app: INestApplication<App>;
  let tokenService: InMemoryTokenService;

  const adminUser = new User(
    'admin-1',
    'admin@portfolio.local',
    'hash:secret123',
    UserRole.administrador,
    new Date('2026-06-28T00:00:00.000Z'),
    new Date('2026-06-28T00:00:00.000Z'),
  );
  const visitorUser = new User(
    'visitor-1',
    'visitor@portfolio.local',
    'hash:visitor',
    UserRole.visitante,
    new Date('2026-06-28T00:00:00.000Z'),
    new Date('2026-06-28T00:00:00.000Z'),
  );
  const initialProject = new Project(
    'project-1',
    'Existing project',
    'A published project used in e2e tests.',
    ['NestJS', 'Prisma'],
    'https://github.com/example/project',
    'https://example.com',
    new Date('2026-06-28T00:00:00.000Z'),
  );
  type LoginResponseBody = {
    accessToken: string;
    user: {
      id: string;
      email: string;
      role: UserRole;
    };
  };

  beforeEach(async () => {
    tokenService = new InMemoryTokenService(visitorUser);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [
        AuthController,
        ProjectsController,
        ConfigController,
        StatsController,
      ],
      providers: [
        Login,
        CreateProject,
        ListProjects,
        UpdateProject,
        DeleteProject,
        GetConfig,
        UpdateConfig,
        GetStats,
        UpdateStats,
        TrackStatsEvent,
        {
          provide: 'IUserRepository',
          useValue: new InMemoryUserRepository([adminUser, visitorUser]),
        },
        { provide: 'IPasswordHasher', useValue: new InMemoryPasswordHasher() },
        { provide: 'ITokenService', useValue: tokenService },
        {
          provide: 'IProjectRepository',
          useValue: new InMemoryProjectRepository([initialProject]),
        },
        {
          provide: 'IConfigRepository',
          useValue: new InMemoryConfigRepository(),
        },
        {
          provide: 'IStatsRepository',
          useValue: new InMemoryStatsRepository(),
        },
        { provide: Reflector, useClass: Reflector },
        AuthGuard,
        RolesGuard,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('keeps public routes open', async () => {
    await request(app.getHttpServer()).get('/projects').expect(200);
    await request(app.getHttpServer()).get('/config').expect(200);
    await request(app.getHttpServer()).get('/stats').expect(200);
  });

  it('authenticates and resolves the current user', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: adminUser.email, password: 'secret123' })
      .expect(201);
    const loginBody = loginResponse.body as LoginResponseBody;

    expect(loginBody).toMatchObject({
      accessToken: tokenService.getAdminToken(adminUser.id),
      user: {
        id: adminUser.id,
        email: adminUser.email,
        role: UserRole.administrador,
      },
    });

    await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${loginBody.accessToken}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          sub: adminUser.id,
          email: adminUser.email,
          role: UserRole.administrador,
        });
      });
  });

  it('rejects protected routes without a valid token', async () => {
    await request(app.getHttpServer()).post('/projects').send({}).expect(401);
  });

  it('allows the administrator to write content', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: adminUser.email, password: 'secret123' })
      .expect(201);
    const loginBody = loginResponse.body as LoginResponseBody;

    await request(app.getHttpServer())
      .post('/projects')
      .set('Authorization', `Bearer ${loginBody.accessToken}`)
      .send({
        title: 'New project',
        description: 'This project was created by the admin e2e test.',
        techStack: ['NestJS', 'Next.js'],
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          title: 'New project',
          description: 'This project was created by the admin e2e test.',
        });
      });
  });

  it('forbids non-admin tokens on administrative routes', async () => {
    await request(app.getHttpServer())
      .put('/config')
      .set('Authorization', `Bearer ${tokenService.getVisitorToken()}`)
      .send({
        siteName: 'Blocked',
      })
      .expect(403);
  });
});
