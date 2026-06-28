import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import type { Request } from 'express';
import type { ITokenService } from '../../domain/services/i-token-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('ITokenService')
    private readonly tokenService: ITokenService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request & { user?: unknown }>();
    const token = this.extractBearerToken(request.headers.authorization);

    if (!token) {
      throw new UnauthorizedException('Missing authorization token');
    }

    request.user = this.tokenService.verify(token);
    return true;
  }

  private extractBearerToken(
    authorizationHeader: string | undefined,
  ): string | null {
    if (!authorizationHeader) {
      return null;
    }

    const [scheme, token] = authorizationHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return null;
    }

    return token;
  }
}
