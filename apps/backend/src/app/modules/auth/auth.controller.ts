import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async authenticate(@Body('initData') initData: string) {
    if (!initData) {
      throw new UnauthorizedException('Missing initData');
    }
    return this.authService.authenticate(initData);
  }
}
