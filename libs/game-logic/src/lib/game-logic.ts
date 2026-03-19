import type { Symbol, SpinResult, CombinationType } from '@tma-game/shared-types';

export const SYMBOLS: Symbol[] = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎'];

export const WIN_MULTIPLIERS: Record<CombinationType, number> = {
  none: 0,
  pair: 2,
  three_of_a_kind: 5,
  jackpot: 20,
};

export const SPIN_COST = 10;

function getRandomSymbol(): Symbol {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function getCombination(reels: Symbol[]): CombinationType {
  const [a, b, c] = reels;
  if (a === b && b === c && a === '💎') return 'jackpot';
  if (a === b && b === c) return 'three_of_a_kind';
  if (a === b || b === c || a === c) return 'pair';
  return 'none';
}

export function spin(betAmount: number): SpinResult {
  const reels: Symbol[] = [
    getRandomSymbol(),
    getRandomSymbol(),
    getRandomSymbol(),
  ];
  const combination = getCombination(reels);
  const win = WIN_MULTIPLIERS[combination] > 0
    ? betAmount * WIN_MULTIPLIERS[combination]
    : 0;
  return { reels, win, combination };
}

export function calculateNewBalance(
  currentBalance: number,
  betAmount: number,
  win: number
): number {
  return currentBalance - betAmount + win;
}

export function canSpin(balance: number, betAmount: number): boolean {
  return balance >= betAmount;
}
