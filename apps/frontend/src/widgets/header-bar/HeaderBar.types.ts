import { User } from '@tma-game/shared-types';
import { TelegramUserWithPhoto } from '../../features/auth/hooks/useTelegramUser.types';

export interface HeaderBarProps {
  user: User | null;
  telegramUser: TelegramUserWithPhoto | null;
  authPending: boolean;
}
