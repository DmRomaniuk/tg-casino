export interface TelegramUser {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
}

export interface User {
  id: string;
  telegramId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  balance: number;
  createdAt: Date;
}

export interface SpinResult {
  reels: Symbol[];
  win: number;
  combination: CombinationType;
}

export type Symbol = '🍒' | '🍋' | '🍊' | '🍇' | '⭐' | '💎';

export type CombinationType =
  | 'none'
  | 'pair'
  | 'three_of_a_kind'
  | 'jackpot';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  firstName: string;
  username?: string;
  balance: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
