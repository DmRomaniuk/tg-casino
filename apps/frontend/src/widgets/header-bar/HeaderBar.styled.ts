import { styled } from '@mui/material/styles';

export const HeaderPanel = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  padding: theme.spacing(2.5, 3),
  background: 'rgba(16, 20, 36, 0.9)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius:
    typeof theme.shape.borderRadius === 'number'
      ? theme.shape.borderRadius + 6
      : `calc(${theme.shape.borderRadius} + 6px)`,
  boxShadow: '0 22px 50px rgba(6, 8, 16, 0.6)',
}));

export const Brand = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
}));

export const UserCard = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  background: 'rgba(12, 14, 26, 0.6)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
}));
