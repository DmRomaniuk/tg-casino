import { styled } from '@mui/material/styles';

export const SlotPanel = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'grid',
  gap: theme.spacing(3),
  background:
    'linear-gradient(160deg, rgba(20, 24, 40, 0.95), rgba(10, 12, 22, 0.95))',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius:
    typeof theme.shape.borderRadius === 'number'
      ? theme.shape.borderRadius + 6
      : `calc(${theme.shape.borderRadius} + 6px)`,
  boxShadow:
    'inset 0 0 90px rgba(22, 26, 48, 0.7), 0 30px 60px rgba(5, 7, 14, 0.6)',
  position: 'relative',
  overflow: 'hidden',
}));

export const ReelGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: theme.spacing(1.8),
}));

export const StatusPill = styled('div')(({ theme }) => ({
  padding: theme.spacing(1.4, 1.6),
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(255, 255, 255, 0.08)',
  background: 'rgba(12, 16, 30, 0.7)',
  fontSize: 14,
  color: '#cfd6ee',
}));

export const JackpotOverlay = styled('div')(() => ({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  background:
    'radial-gradient(circle at 30% 30%, rgba(255, 214, 102, 0.25), transparent 60%), radial-gradient(circle at 70% 40%, rgba(255, 94, 58, 0.2), transparent 55%)',
  animation: 'jackpotPulse 1.2s ease-in-out infinite',
  '@keyframes jackpotPulse': {
    '0%': { opacity: 0.2 },
    '50%': { opacity: 0.6 },
    '100%': { opacity: 0.2 },
  },
}));
