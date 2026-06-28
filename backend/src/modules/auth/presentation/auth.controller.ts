import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Login } from '../application/login';
import { LoginDto } from './dtos';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly login: Login) {}

  @Post('login')
  async signIn(@Body() dto: LoginDto) {
    return this.login.execute(dto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@CurrentUser() user: unknown) {
    return user;
  }
}
