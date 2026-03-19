import { styled } from '@mui/material/styles';

export const Page = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(4, 2, 7),
}));

export const Shell = styled('div')(({ theme }) => ({
  width: 'min(1000px, 100%)',
  display: 'grid',
  gap: theme.spacing(3),
}));

export const ContentGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: 'minmax(0, 1fr) 280px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const EmptyPanel = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  background: 'rgba(16, 20, 36, 0.9)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius:
    typeof theme.shape.borderRadius === 'number'
      ? theme.shape.borderRadius + 6
      : `calc(${theme.shape.borderRadius} + 6px)`,
  boxShadow: '0 22px 50px rgba(6, 8, 16, 0.6)',
}));
