import { Injectable } from '@nestjs/common';
import type { CookieOptions } from 'express';

@Injectable()
export class EnvironmentService {
  get databaseUrl(): string {
    return this.required('DATABASE_URL');
  }

  get port(): number {
    return this.positiveInteger('PORT', 3001);
  }

  get corsOrigin(): string {
    return process.env.CORS_ORIGIN?.trim() || 'http://localhost:3000';
  }

  get authJwtSecret(): string {
    const secret = process.env.AUTH_JWT_SECRET?.trim();

    if (secret) return secret;
    if (process.env.NODE_ENV === 'production') {
      throw new Error('AUTH_JWT_SECRET must be defined in production');
    }

    return 'portfolio-auth-secret';
  }

  get authJwtExpiresInSeconds(): number {
    return this.positiveInteger('AUTH_JWT_EXPIRES_IN_SECONDS', 86400);
  }

  get authCookieSecure(): boolean {
    const configured = process.env.AUTH_COOKIE_SECURE;
    const secure =
      configured === undefined
        ? process.env.NODE_ENV === 'production'
        : this.boolean('AUTH_COOKIE_SECURE');

    if (process.env.NODE_ENV === 'production' && !secure) {
      throw new Error('AUTH_COOKIE_SECURE must be true in production');
    }

    return secure;
  }

  get authCookieSameSite(): CookieOptions['sameSite'] {
    const value = process.env.AUTH_COOKIE_SAME_SITE?.trim().toLowerCase();
    if (!value) return 'lax';

    if (value === 'lax' || value === 'strict' || value === 'none') {
      return value;
    }

    throw new Error(
      'AUTH_COOKIE_SAME_SITE must be one of: lax, strict, none',
    );
  }

  get authCookieDomain(): string | undefined {
    return process.env.AUTH_COOKIE_DOMAIN?.trim() || undefined;
  }

  validate(): void {
    void this.databaseUrl;
    void this.port;
    void this.corsOrigin;
    void this.authJwtSecret;
    void this.authJwtExpiresInSeconds;
    void this.authCookieSecure;
    void this.authCookieSameSite;
    void this.authCookieDomain;

    if (this.authCookieSameSite === 'none' && !this.authCookieSecure) {
      throw new Error(
        'AUTH_COOKIE_SECURE must be true when AUTH_COOKIE_SAME_SITE is none',
      );
    }
  }

  private required(name: string): string {
    const value = process.env[name]?.trim();
    if (!value) throw new Error(`${name} must be defined`);
    return value;
  }

  private positiveInteger(name: string, defaultValue: number): number {
    const raw = process.env[name];
    if (!raw) return defaultValue;

    const value = Number(raw);
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error(`${name} must be a positive integer`);
    }

    return value;
  }

  private boolean(name: string): boolean {
    const value = process.env[name]?.trim().toLowerCase();
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new Error(`${name} must be true or false`);
  }
}
