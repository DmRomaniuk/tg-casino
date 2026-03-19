import { styled } from '@mui/material/styles';

export const LeaderboardPanel = styled('div')(({ theme }) => ({
  padding: theme.spacing(2.5),
  display: 'grid',
  gap: theme.spacing(2),
  background: 'rgba(18, 22, 40, 0.92)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius:
    typeof theme.shape.borderRadius === 'number'
      ? theme.shape.borderRadius + 6
      : `calc(${theme.shape.borderRadius} + 6px)`,
}));

export const LeaderboardItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.2),
  borderRadius:
    typeof theme.shape.borderRadius === 'number'
      ? Math.max(0, theme.shape.borderRadius - 4)
      : `calc(${theme.shape.borderRadius} - 4px)`,
  background: 'rgba(10,12,24,0.7)',
  border: '1px solid rgba(255,255,255,0.05)',
  fontSize: 14,
}));
