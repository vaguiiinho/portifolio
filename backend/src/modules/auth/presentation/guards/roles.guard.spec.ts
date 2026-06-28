import { ForbiddenException } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { UserRole } from '../../domain/entities/user';

describe('RolesGuard', () => {
  it('should allow administrator role', () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue([UserRole.administrador]),
    } as any;
    const guard = new RolesGuard(reflector);
    const context = {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: UserRole.administrador } }),
      }),
    } as any;

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should reject insufficient role', () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue([UserRole.administrador]),
    } as any;
    const guard = new RolesGuard(reflector);
    const context = {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: UserRole.visitante } }),
      }),
    } as any;

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });
});
