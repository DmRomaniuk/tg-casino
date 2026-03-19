import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { GameService } from './game.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('spin')
  @UseGuards(AuthGuard)
  async spin(
    @Request() req: { user: { sub: string } },
    @Body('betAmount') betAmount?: number,
  ) {
    return this.gameService.spinSlot(req.user.sub, betAmount);
  }

  @Get('leaderboard')
  async getLeaderboard() {
    return this.gameService.getLeaderboard();
  }
}
