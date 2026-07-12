import { Request, Response } from 'express';
import { createCsrfOriginMiddleware } from './csrf-origin.middleware';

describe('createCsrfOriginMiddleware', () => {
  const middleware = createCsrfOriginMiddleware('http://localhost:3000');
  const next = jest.fn();
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows safe requests and requests without the auth cookie', () => {
    middleware({ method: 'GET', headers: {} } as Request, response, next);
    middleware(
      { method: 'POST', headers: { origin: 'https://malicious.example' } } as Request,
      response,
      next,
    );

    expect(next).toHaveBeenCalledTimes(2);
  });

  it('allows authenticated mutations from the configured origin', () => {
    middleware(
      {
        method: 'POST',
        headers: {
          cookie: 'portfolio-auth-token=token',
          origin: 'http://localhost:3000',
        },
      } as Request,
      response,
      next,
    );

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('rejects authenticated mutations from an untrusted or missing origin', () => {
    middleware(
      {
        method: 'DELETE',
        headers: {
          cookie: 'portfolio-auth-token=token',
          origin: 'https://malicious.example',
        },
      } as Request,
      response,
      next,
    );
    middleware(
      {
        method: 'PUT',
        headers: { cookie: 'portfolio-auth-token=token' },
      } as Request,
      response,
      next,
    );

    expect(next).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.json).toHaveBeenCalledWith({
      statusCode: 403,
      message: 'Request origin is not allowed',
      error: 'Forbidden',
    });
  });
});
