import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'crypto';
import type {
  AuthTokenPayload,
  ITokenService,
} from '../../domain/services/i-token-service';
import { UserRole } from '../../domain/entities/user';

function base64UrlEncode(value: Buffer | string | object): string {
  const buffer =
    typeof value === 'string'
      ? Buffer.from(value)
      : Buffer.isBuffer(value)
        ? value
        : Buffer.from(JSON.stringify(value));

  return buffer.toString('base64url');
}

function base64UrlDecode<T>(value: string): T {
  return JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as T;
}

function toSeconds(expiresIn: string | number): number {
  if (typeof expiresIn === 'number') {
    return expiresIn;
  }

  const parsed = Number(expiresIn);
  if (!Number.isNaN(parsed)) {
    return parsed;
  }

  throw new Error('AUTH_JWT_EXPIRES_IN_SECONDS must be a number');
}

@Injectable()
export class JwtTokenService implements ITokenService {
  private readonly secret =
    process.env.AUTH_JWT_SECRET ?? 'portfolio-auth-secret';
  private readonly expiresInSeconds = toSeconds(
    process.env.AUTH_JWT_EXPIRES_IN_SECONDS ?? '86400',
  );

  sign(payload: Omit<AuthTokenPayload, 'iat' | 'exp'>): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const issuedAt = Math.floor(Date.now() / 1000);
    const fullPayload: AuthTokenPayload = {
      ...payload,
      iat: issuedAt,
      exp: issuedAt + this.expiresInSeconds,
    };

    const encodedHeader = base64UrlEncode(header);
    const encodedPayload = base64UrlEncode(fullPayload);
    const signature = createHmac('sha256', this.secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url');

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  verify(token: string): AuthTokenPayload {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');

    if (!encodedHeader || !encodedPayload || !encodedSignature) {
      throw new UnauthorizedException('Invalid token');
    }

    const expectedSignature = createHmac('sha256', this.secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest();
    const providedSignature = Buffer.from(encodedSignature, 'base64url');

    if (
      expectedSignature.length !== providedSignature.length ||
      !timingSafeEqual(expectedSignature, providedSignature)
    ) {
      throw new UnauthorizedException('Invalid token');
    }

    const header = base64UrlDecode<{ alg: string; typ: string }>(encodedHeader);
    if (header.alg !== 'HS256' || header.typ !== 'JWT') {
      throw new UnauthorizedException('Invalid token');
    }

    const payload = base64UrlDecode<AuthTokenPayload>(encodedPayload);
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp <= now) {
      throw new UnauthorizedException('Token expired');
    }

    if (
      payload.role !== UserRole.visitante &&
      payload.role !== UserRole.administrador
    ) {
      throw new UnauthorizedException('Invalid token');
    }

    return payload;
  }
}
