import { Symbol } from '@tma-game/shared-types';

export interface SpinHistoryEntry {
  id: number;
  reels: Symbol[];
  win: number;
  bet: number;
  time: string;
}
