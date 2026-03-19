import { memo, useMemo } from 'react';
import { Chip, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchLeaderboard } from '../../features/leaderboard/api/leaderboard.api';
import { LeaderboardItem, LeaderboardPanel } from './Leaderboard.styled';
import { useAuthStore } from '../../app/store/authStore';

export const Leaderboard = memo(function Leaderboard() {
  const userId = useAuthStore((state) => state.user?.id);
  const { data: leaderboard = [], isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard,
    refetchInterval: 15000,
  });
  const userEntry = useMemo(
    () => leaderboard.find((entry) => entry.userId === userId),
    [leaderboard, userId]
  );

  return (
    <LeaderboardPanel>
      <Typography variant="h6">Leaderboard</Typography>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
      {isLoading ? (
        <Stack alignItems="center" paddingY={2}>
          <CircularProgress size={24} />
        </Stack>
      ) : leaderboard.length ? (
        <Stack spacing={1}>
          {leaderboard.map((entry) => {
            const isYou = entry.userId === userId;
            return (
              <LeaderboardItem key={entry.userId}>
                <Stack>
                  <Typography variant="caption" color="text.secondary">
                    #{entry.rank}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" fontWeight={600}>
                      {entry.firstName}
                    </Typography>
                    {isYou && (
                      <Chip size="small" label="You" color="primary" />
                    )}
                  </Stack>
                </Stack>
                <Typography variant="body2" fontWeight={600}>
                  {entry.balance}
                </Typography>
              </LeaderboardItem>
            );
          })}
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No players yet.
        </Typography>
      )}
      {userEntry && (
        <>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              Your rank
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              #{userEntry.rank} · {userEntry.balance} credits
            </Typography>
          </Stack>
        </>
      )}
    </LeaderboardPanel>
  );
});
