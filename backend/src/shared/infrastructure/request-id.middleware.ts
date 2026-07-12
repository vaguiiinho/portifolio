import { randomUUID } from 'crypto';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
export type RequestWithId = Request & { requestId?: string };
@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestIdMiddleware.name);
  use(request: RequestWithId, response: Response, next: NextFunction): void {
    const requestId = request.header('x-request-id')?.trim() || randomUUID();
    request.requestId = requestId;
    response.setHeader('x-request-id', requestId);
    const startedAt = Date.now();
    response.on('finish', () => this.logger.log(JSON.stringify({ requestId, method: request.method, path: request.originalUrl, statusCode: response.statusCode, durationMs: Date.now() - startedAt })));
    next();
  }
}
