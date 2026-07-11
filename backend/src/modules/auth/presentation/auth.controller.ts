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
import { CreateUserDto, LoginDto } from './dtos';
import { CreateUser } from '../application/create-user';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';
import type { LoginResult } from '../application/login';
import { UserRole } from '../domain/entities/user';

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
  constructor(
    private readonly login: Login,
    private readonly createUser: CreateUser,
  ) {}

  @Post('login')
  async signIn(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.login.execute(dto);

    this.setAuthCookie(response, result);

    return { user: result.user };
  }

  @Post('users')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.administrador)
  async create(@Body() dto: CreateUserDto) {
    const user = await this.createUser.execute(dto);

    return user.toJSON();
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
