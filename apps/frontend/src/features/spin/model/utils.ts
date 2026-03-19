import { Symbol } from '@tma-game/shared-types';

export const symbolPool: Symbol[] = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎'];

export const minBet = 10;
export const maxBetLimit = 200;
export const betPresets = [10, 25, 50, 100, 150];

export const clampBet = (value: number, maxBet = maxBetLimit) =>
  Math.max(minBet, Math.min(maxBet, value));

export const getMaxBetForBalance = (balance?: number) =>
  balance ? Math.max(minBet, Math.min(maxBetLimit, balance)) : maxBetLimit;

export const createReelSet = () => [
  symbolPool[Math.floor(Math.random() * symbolPool.length)],
  symbolPool[Math.floor(Math.random() * symbolPool.length)],
  symbolPool[Math.floor(Math.random() * symbolPool.length)],
];

export const getRandomSymbol = () =>
  symbolPool[Math.floor(Math.random() * symbolPool.length)];
