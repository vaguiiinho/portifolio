import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { Login } from '../application/login';
import { AuthGuard } from './guards/auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let mockLogin: jest.Mocked<Login>;

  beforeEach(async () => {
    const mockLoginProvider = { execute: jest.fn() };
    const mockTokenService = { sign: jest.fn(), verify: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: Login, useValue: mockLoginProvider },
        { provide: 'ITokenService', useValue: mockTokenService },
        AuthGuard,
      ],
    }).compile();

    controller = module.get(AuthController);
    mockLogin = module.get(Login);
  });

  it('should sign in', async () => {
    const dto = { email: 'admin@portfolio.local', password: 'secret' };
    const response = { accessToken: 'token', user: { id: '1' } };
    mockLogin.execute.mockResolvedValue(response as never);

    await expect(controller.signIn(dto)).resolves.toBe(response);
    expect(mockLogin.execute).toHaveBeenCalledWith(dto);
  });
});
