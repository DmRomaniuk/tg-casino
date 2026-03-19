import { memo, useMemo } from 'react';
import { Avatar, CircularProgress, Stack, Typography } from '@mui/material';
import { Brand, HeaderPanel, UserCard } from './HeaderBar.styled';
import { HeaderBarProps } from './HeaderBar.types';
import { useCountUp } from '../../shared/lib/useCountUp';

export const HeaderBar = memo(function HeaderBar({
  user,
  telegramUser,
  authPending,
}: HeaderBarProps) {
  const displayName = useMemo(() => {
    if (user) {
      return `${user.firstName} ${user.lastName ?? ''}`.trim();
    }
    if (telegramUser) {
      return `${telegramUser.firstName} ${telegramUser.lastName ?? ''}`.trim();
    }
    return 'Guest';
  }, [user, telegramUser]);
  const balance = useCountUp(user?.balance);

  return (
    <HeaderPanel>
      <Brand>
        <Typography variant="h4" letterSpacing="0.12em">
          Neon Slots
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Spin the reels, climb the board, chase the jackpot.
        </Typography>
      </Brand>
      <Stack direction="row" spacing={2} alignItems="center">
        {authPending && <CircularProgress size={24} />}
        <UserCard>
          <Avatar
            src={telegramUser?.photoUrl}
            sx={{ width: 48, height: 48, fontSize: 20 }}
          >
            {(user?.firstName?.[0] || telegramUser?.firstName?.[0] || 'G')
              .toUpperCase()}
          </Avatar>
          <Stack spacing={0.3}>
            <Typography variant="subtitle1" fontWeight={600}>
              {displayName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Balance: {user ? balance : '—'}
            </Typography>
          </Stack>
        </UserCard>
      </Stack>
    </HeaderPanel>
  );
});
