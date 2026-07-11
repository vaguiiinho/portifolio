import { Injectable } from '@nestjs/common';

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
    return process.env.NODE_ENV === 'production';
  }

  validate(): void {
    void this.databaseUrl;
    void this.port;
    void this.corsOrigin;
    void this.authJwtSecret;
    void this.authJwtExpiresInSeconds;
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
}
