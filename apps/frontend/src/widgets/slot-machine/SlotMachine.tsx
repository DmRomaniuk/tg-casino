import { memo } from 'react';
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';
import { JackpotOverlay, ReelGrid, SlotPanel, StatusPill } from './SlotMachine.styled';
import { useSpinMachine } from '../../features/spin/model/useSpinMachine';
import { SlotReel } from './SlotReel';
import { symbolPool } from '../../features/spin/model/utils';

export const SlotMachine = memo(function SlotMachine() {
  const {
    betAmount,
    reels,
    spinningReels,
    status,
    history,
    highlightWin,
    jackpotActive,
    canSpin,
    betChips,
    maxBet,
    balance,
    handleSpin,
    handleBetIncrement,
    handleBetDecrement,
    handleBetSelect,
    handleMaxBet,
    hasUser,
  } = useSpinMachine();

  return (
    <SlotPanel>
      {jackpotActive && <JackpotOverlay />}
      <ReelGrid>
        {reels.map((symbol, index) => (
          <SlotReel
            key={`${symbol}-${index}`}
            symbol={symbol}
            spinning={spinningReels[index]}
            highlight={highlightWin && !spinningReels.some(Boolean)}
            delayMs={index * 120}
            strip={symbolPool}
          />
        ))}
      </ReelGrid>

      <StatusPill>{status}</StatusPill>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Bet
          </Typography>
          <Button
            variant="outlined"
            onClick={handleBetDecrement}
            disabled={!hasUser}
            sx={{ minWidth: 40 }}
          >
            -
          </Button>
          <Typography
            sx={{
              padding: '8px 16px',
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(9,11,22,0.8)',
              minWidth: 72,
              textAlign: 'center',
            }}
          >
            {betAmount}
          </Typography>
          <Button
            variant="outlined"
            onClick={handleBetIncrement}
            disabled={!hasUser}
            sx={{ minWidth: 40 }}
          >
            +
          </Button>
        </Stack>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSpin}
          disabled={!canSpin}
        >
          {spinningReels.some(Boolean) ? 'Spinning...' : 'Spin'}
        </Button>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        <Typography variant="caption" color="text.secondary">
          Balance: {hasUser ? balance : '—'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Max bet: {hasUser ? maxBet : '—'}
        </Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={handleMaxBet}
          disabled={!hasUser}
        >
          Max
        </Button>
      </Stack>

      <Stack direction="row" spacing={1} flexWrap="wrap">
        {betChips.map((value) => (
          <Chip
            key={value}
            label={`${value}`}
            color={value === betAmount ? 'primary' : 'default'}
            variant={value === betAmount ? 'filled' : 'outlined'}
            onClick={() => handleBetSelect(value)}
            disabled={!hasUser || value > maxBet}
            sx={{ fontWeight: 600 }}
          />
        ))}
      </Stack>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      <Stack spacing={1}>
        <Typography variant="subtitle1">Recent spins</Typography>
        {history.length ? (
          history.map((entry) => (
            <Box
              key={entry.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 1,
                borderRadius: 2,
                background: 'rgba(10,12,24,0.7)',
                border: '1px solid rgba(255,255,255,0.05)',
                fontSize: 14,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  {entry.time}
                </Typography>
                <Typography variant="body2">
                  {entry.reels.join(' ')}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                fontWeight={600}
                color={entry.win > 0 ? 'primary' : 'text.secondary'}
              >
                {entry.win > 0 ? `+${entry.win}` : '—'}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No spins yet.
          </Typography>
        )}
      </Stack>
    </SlotPanel>
  );
});
