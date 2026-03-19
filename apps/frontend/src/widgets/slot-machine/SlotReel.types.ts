import { Symbol } from '@tma-game/shared-types';

export interface SlotReelProps {
  symbol: Symbol;
  spinning: boolean;
  highlight: boolean;
  delayMs: number;
  strip: Symbol[];
}
