import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { TelegramUser } from '@tma-game/shared-types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findByTelegramId(telegramId: number): Promise<UserEntity | null> {
    return this.usersRepository.findOne({ where: { telegramId } });
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async createOrUpdate(telegramUser: TelegramUser): Promise<UserEntity> {
    await this.usersRepository.upsert(
      {
        telegramId: telegramUser.id,
        firstName: telegramUser.firstName,
        lastName: telegramUser.lastName,
        username: telegramUser.username,
        balance: 1000,
      },
      ['telegramId']
    );

    const user = await this.findByTelegramId(telegramUser.id);
    if (!user) {
      throw new Error('Failed to load user after upsert');
    }
    return user;
  }

  async updateBalance(id: string, balance: number): Promise<UserEntity> {
    await this.usersRepository.update(id, { balance });
    return this.findById(id) as Promise<UserEntity>;
  }

  async getLeaderboard(): Promise<UserEntity[]> {
    return this.usersRepository.find({
      order: { balance: 'DESC' },
      take: 10,
    });
  }
}
