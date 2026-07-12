import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '../../generated/prisma/client';
import type { RequestWithId } from './request-id.middleware';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestWithId>();
    let status = 500;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const responseObj = exceptionResponse as any;
        message = responseObj.message || message;
        error = responseObj.error || error;
      }
    } else if (this.isPrismaRecordNotFoundError(exception)) {
      status = 404;
      message = 'Resource not found';
      error = 'Not Found';
    } else {
      this.logger.error(JSON.stringify({
        requestId: request.requestId,
        error: exception instanceof Error ? exception.message : String(exception),
      }));
    }

    response.status(status).json({
      statusCode: status,
      message,
      error,
      requestId: request.requestId,
    });
  }

  private isPrismaRecordNotFoundError(exception: unknown): boolean {
    return (
      exception instanceof Prisma.PrismaClientKnownRequestError &&
      exception.code === 'P2025'
    );
  }
}
