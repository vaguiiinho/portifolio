import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import type { ITokenService } from '../../domain/services/i-token-service';

describe('AuthGuard', () => {
  it('should attach user from bearer token', () => {
    const tokenService: ITokenService = {
      sign: jest.fn(),
      verify: jest.fn().mockReturnValue({
        sub: 'user-1',
        email: 'admin@portfolio.local',
        role: 'administrador',
        iat: 1,
        exp: 2,
      }),
    };
    const guard = new AuthGuard(tokenService);
    const request = {
      headers: { authorization: 'Bearer valid-token' },
    };
    const context = {
      switchToHttp: () => ({ getRequest: () => request }),
    } as any;

    expect(guard.canActivate(context)).toBe(true);
    expect(tokenService.verify).toHaveBeenCalledWith('valid-token');
    expect(request.user).toEqual({
      sub: 'user-1',
      email: 'admin@portfolio.local',
      role: 'administrador',
      iat: 1,
      exp: 2,
    });
  });

  it('should reject missing token', () => {
    const tokenService: ITokenService = {
      sign: jest.fn(),
      verify: jest.fn(),
    };
    const guard = new AuthGuard(tokenService);
    const context = {
      switchToHttp: () => ({ getRequest: () => ({ headers: {} }) }),
    } as any;

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });
});
