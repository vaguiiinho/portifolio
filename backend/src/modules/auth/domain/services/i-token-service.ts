import { UserRole } from '../entities/user';

export interface AuthTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface ITokenService {
  sign(payload: Omit<AuthTokenPayload, 'iat' | 'exp'>): string;
  verify(token: string): AuthTokenPayload;
}
