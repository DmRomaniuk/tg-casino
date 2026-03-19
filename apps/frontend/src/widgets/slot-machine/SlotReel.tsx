import { memo, useMemo } from 'react';
import {
  ReelCenter,
  ReelFade,
  ReelFrame,
  ReelStrip,
  ReelSymbol,
  ReelWindow,
} from './SlotReel.styled';
import { SlotReelProps } from './SlotReel.types';

export const SlotReel = memo(function SlotReel({
  symbol,
  spinning,
  highlight,
  delayMs,
  strip,
}: SlotReelProps) {
  const symbols = useMemo(() => {
    return [...strip, ...strip];
  }, [strip]);

  return (
    <ReelWindow $spinning={spinning} $highlight={highlight}>
      {spinning ? (
        <ReelStrip $spinning={spinning} $delay={delayMs}>
          {symbols.map((value, index) => (
            <ReelSymbol key={`${value}-${index}`}>{value}</ReelSymbol>
          ))}
        </ReelStrip>
      ) : (
        <ReelCenter>{symbol}</ReelCenter>
      )}
      <ReelFade />
      <ReelFrame />
    </ReelWindow>
  );
});
