import { useEffect, useRef } from 'react';
import { Box, CssBaseline, GlobalStyles, ThemeProvider, Typography } from '@mui/material';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useTelegramUser } from '../features/auth/hooks/useTelegramUser';
import { useAuthStore } from '../entities/user/model/authStore';
import { HeaderBar } from '../widgets/header-bar/HeaderBar';
import { Leaderboard } from '../widgets/leaderboard/Leaderboard';
import { SlotMachine } from '../widgets/slot-machine/SlotMachine';
import { theme } from '../shared/theme/theme';
import { ContentGrid, EmptyPanel, Page, Shell } from './App.styled';

const globalStyles = {
  body: {
    margin: 0,
    minHeight: '100vh',
    background:
      'radial-gradient(circle at 15% 20%, #1b2344 0%, #0b0d18 55%) no-repeat, radial-gradient(circle at 80% 15%, #2a1c3a 0%, transparent 45%) no-repeat, linear-gradient(160deg, #0b0d18, #12162a)',
    color: theme.palette.text.primary,
  },
  '#root': {
    minHeight: '100vh',
  },
};

export function App() {
  const { user: tgUser, initDataRaw } = useTelegramUser();
  const { mutate: login, isPending: authPending } = useAuth();
  const user = useAuthStore((state) => state.user);
  const loginRequested = useRef(false);

  useEffect(() => {
    if (user) {
      loginRequested.current = false;
      return;
    }
    if (initDataRaw && !authPending && !loginRequested.current) {
      loginRequested.current = true;
      login(initDataRaw);
    }
  }, [initDataRaw, user, authPending, login]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: theme.palette.background.default }}>
        <GlobalStyles styles={globalStyles} />
        <Page>
          <Shell>
            <HeaderBar
              user={user}
              telegramUser={tgUser}
              authPending={authPending}
            />

            {!user && !authPending ? (
              <EmptyPanel>
                <Typography variant="h5" gutterBottom>
                  Open in Telegram to start
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Authorization happens automatically after launch.
                </Typography>
              </EmptyPanel>
            ) : (
              <ContentGrid>
                <SlotMachine />
                <Leaderboard />
              </ContentGrid>
            )}
          </Shell>
        </Page>
      </Box>
    </ThemeProvider>
  );
}

export default App;
