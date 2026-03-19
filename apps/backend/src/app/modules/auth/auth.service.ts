import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  validateInitData(initData: string): boolean {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      throw new UnauthorizedException('TELEGRAM_BOT_TOKEN is not set');
    }
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');

    if (!hash) return false;

    params.delete('hash');

    const dataCheckString = Array.from(params.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const secretKey = createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    const calculatedHash = createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    return calculatedHash === hash;
  }

  async authenticate(initData: string): Promise<{ token: string; user: UserEntity }> {
    const isValid = this.validateInitData(initData);

    if (!isValid) {
      throw new UnauthorizedException('Invalid Telegram initData');
    }

    const params = new URLSearchParams(initData);
    const userJson = params.get('user');

    if (!userJson) {
      throw new UnauthorizedException('No user data in initData');
    }

    const telegramUser = JSON.parse(userJson);

    const user = await this.usersService.createOrUpdate({
      id: telegramUser.id,
      firstName: telegramUser.first_name,
      lastName: telegramUser.last_name,
      username: telegramUser.username,
      languageCode: telegramUser.language_code,
    });

    const token = this.jwtService.sign({ sub: user.id, telegramId: user.telegramId });

    return { token, user };
  }
}
