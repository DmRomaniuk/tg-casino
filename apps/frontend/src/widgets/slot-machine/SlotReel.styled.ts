import { keyframes, styled } from '@mui/material/styles';

const reelSpin = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(0, calc(-1 * (var(--item-size) + var(--item-gap)) * 6), 0); }
`;

export const ReelWindow = styled('div')<{
  $spinning?: boolean;
  $highlight?: boolean;
}>(({ theme, $spinning, $highlight }) => ({
  height: 150,
  '--item-size': '56px',
  '--item-gap': '8px',
  borderRadius:
    typeof theme.shape.borderRadius === 'number'
      ? theme.shape.borderRadius + 4
      : `calc(${theme.shape.borderRadius} + 4px)`,
  background:
    'radial-gradient(circle at 30% 20%, rgba(247, 183, 51, 0.22), transparent 55%), linear-gradient(160deg, #101426, #0b0d18)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: $highlight
    ? '0 0 40px rgba(247, 183, 51, 0.45)'
    : $spinning
    ? '0 0 30px rgba(252, 74, 26, 0.35)'
    : '0 10px 24px rgba(6, 8, 16, 0.45)',
  transition: 'box-shadow 0.2s ease',
  transform: 'translateZ(0)',
}));

export const ReelStrip = styled('div')<{ $spinning?: boolean; $delay?: number }>(
  ({ $spinning, $delay }) => ({
    position: 'absolute',
    top: 'calc(-1 * var(--item-gap))',
    left: 0,
    right: 0,
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    rowGap: 'var(--item-gap)',
    padding: 'var(--item-gap) 0',
    animation: $spinning
      ? `${reelSpin} 0.9s linear infinite`
      : 'none',
    animationDelay:
      $spinning && $delay ? `${-$delay}ms` : undefined,
    willChange: $spinning ? 'transform' : undefined,
    backfaceVisibility: 'hidden',
  })
);

export const ReelSymbol = styled('div')(() => ({
  height: 'var(--item-size)',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 56,
  lineHeight: 1,
}));

export const ReelFade = styled('div')(() => ({
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(180deg, rgba(10,12,24,0.95) 0%, rgba(10,12,24,0) 28%, rgba(10,12,24,0) 72%, rgba(10,12,24,0.95) 100%)',
  pointerEvents: 'none',
}));

export const ReelCenter = styled('div')(() => ({
  height: '100%',
  display: 'grid',
  placeItems: 'center',
  fontSize: 64,
}));

export const ReelFrame = styled('div')(() => ({
  position: 'absolute',
  inset: 8,
  borderRadius: 14,
  border: '1px solid rgba(255, 255, 255, 0.06)',
  pointerEvents: 'none',
}));
