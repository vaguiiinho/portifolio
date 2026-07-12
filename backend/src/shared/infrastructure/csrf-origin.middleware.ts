import { NextFunction, Request, Response } from 'express';

const AUTH_COOKIE_NAME = 'portfolio-auth-token';
const UNSAFE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export function createCsrfOriginMiddleware(allowedOrigin: string) {
  return (request: Request, response: Response, next: NextFunction): void => {
    if (
      !UNSAFE_METHODS.has(request.method) ||
      !hasAuthCookie(request.headers.cookie) ||
      request.headers.origin === allowedOrigin
    ) {
      next();
      return;
    }

    response.status(403).json({
      statusCode: 403,
      message: 'Request origin is not allowed',
      error: 'Forbidden',
    });
  };
}

function hasAuthCookie(cookieHeader: string | undefined): boolean {
  return (
    cookieHeader
      ?.split(';')
      .some((cookie) => cookie.trim().startsWith(`${AUTH_COOKIE_NAME}=`)) ?? false
  );
}
