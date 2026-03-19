import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { spin, canSpin, calculateNewBalance, SPIN_COST } from '@tma-game/game-logic';
import { SpinResult, LeaderboardEntry } from '@tma-game/shared-types';

@Injectable()
export class GameService {
  constructor(private readonly usersService: UsersService) {}

  async spinSlot(userId: string, betAmount: number = SPIN_COST): Promise<{
    result: SpinResult;
    newBalance: number;
  }> {
    const user = await this.usersService.findById(userId);

    if (!user) throw new BadRequestException('User not found');

    if (!canSpin(user.balance, betAmount)) {
      throw new BadRequestException('Insufficient balance');
    }

    const result = spin(betAmount);
    const newBalance = calculateNewBalance(user.balance, betAmount, result.win);

    await this.usersService.updateBalance(userId, newBalance);

    return { result, newBalance };
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const users = await this.usersService.getLeaderboard();

    return users.map((user, index) => ({
      rank: index + 1,
      userId: user.id,
      firstName: user.firstName,
      username: user.username,
      balance: user.balance,
    }));
  }
}
