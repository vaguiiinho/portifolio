import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { Login } from '../application/login';
import { CreateUser } from '../application/create-user';
import { AuthGuard } from './guards/auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let mockLogin: {
    execute: jest.Mock;
  };
  let mockCreateUser: {
    execute: jest.Mock;
  };
  let response: {
    cookie: jest.Mock;
    clearCookie: jest.Mock;
  };

  beforeEach(async () => {
    mockLogin = { execute: jest.fn() };
    mockCreateUser = { execute: jest.fn() };
    const mockTokenService = { sign: jest.fn(), verify: jest.fn() };
    response = {
      cookie: jest.fn(),
      clearCookie: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: Login, useValue: mockLogin },
        { provide: CreateUser, useValue: mockCreateUser },
        { provide: 'ITokenService', useValue: mockTokenService },
        AuthGuard,
      ],
    }).compile();

    controller = module.get(AuthController);
  });

  it('should sign in', async () => {
    const dto = { email: 'admin@portfolio.local', password: 'secret' };
    const loginResult = { accessToken: 'token', user: { id: '1' } };
    mockLogin.execute.mockResolvedValue(loginResult);

    await expect(controller.signIn(dto, response as never)).resolves.toEqual({
      user: { id: '1' },
    });
    expect(mockLogin.execute).toHaveBeenCalledWith(dto);
    expect(response.cookie).toHaveBeenCalledWith(
      'portfolio-auth-token',
      'token',
      expect.objectContaining({
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      }),
    );
  });

  it('should logout by clearing the auth cookie', () => {
    controller.logout(response as never);

    expect(response.clearCookie).toHaveBeenCalledWith(
      'portfolio-auth-token',
      expect.objectContaining({
        path: '/',
        sameSite: 'lax',
      }),
    );
  });
});
