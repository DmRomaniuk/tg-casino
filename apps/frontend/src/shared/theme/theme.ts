import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f7b733',
    },
    secondary: {
      main: '#fc4a1a',
    },
    background: {
      default: '#0d0f1a',
      paper: '#14182a',
    },
    text: {
      primary: '#f5f7ff',
      secondary: '#b7bfd6',
    },
  },
  typography: {
    fontFamily: '"Sora", "Space Grotesk", system-ui, sans-serif',
    h4: {
      fontFamily: '"Bebas Neue", "Sora", sans-serif',
      letterSpacing: '0.08em',
    },
    h5: {
      fontFamily: '"Bebas Neue", "Sora", sans-serif',
      letterSpacing: '0.06em',
    },
  },
  shape: {
    borderRadius: 16,
  },
});
