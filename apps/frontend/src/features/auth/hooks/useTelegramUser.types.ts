import { TelegramUser } from '@tma-game/shared-types';

export interface TelegramUserWithPhoto extends TelegramUser {
  photoUrl?: string;
}
