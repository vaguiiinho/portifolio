import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { Login } from '../application/login';
import { LoginDto } from './dtos';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { LoginResult } from '../application/login';

const AUTH_COOKIE_NAME = 'portfolio-auth-token';

function toMaxAgeMs(): number {
  const raw = process.env.AUTH_JWT_EXPIRES_IN_SECONDS ?? '86400';
  const seconds = Number(raw);

  if (Number.isNaN(seconds) || seconds <= 0) {
    return 24 * 60 * 60 * 1000;
  }

  return seconds * 1000;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly login: Login) {}

  @Post('login')
  async signIn(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.login.execute(dto);

    this.setAuthCookie(response, result);

    return { user: result.user };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@CurrentUser() user: unknown) {
    return user;
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(AUTH_COOKIE_NAME, {
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  private setAuthCookie(response: Response, result: LoginResult) {
    response.cookie(AUTH_COOKIE_NAME, result.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: toMaxAgeMs(),
    });
  }
}
