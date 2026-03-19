import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Symbol } from '@tma-game/shared-types';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../../app/store/authStore';
import { useAudioTone } from '../../../shared/lib/useAudioTone';
import { triggerImpact, triggerNotification } from '../../../shared/lib/haptics';
import { spin } from '../api/spin.api';
import { SpinHistoryEntry } from './types';
import {
  betPresets,
  clampBet,
  getRandomSymbol,
  getMaxBetForBalance,
  maxBetLimit,
  minBet,
} from './utils';

export function useSpinMachine() {
  const user = useAuthStore((state) => state.user);
  const updateBalance = useAuthStore((state) => state.updateBalance);
  const playTone = useAudioTone();

  const [betAmount, setBetAmount] = useState(10);
  const [reels, setReels] = useState<Symbol[]>(['🍒', '🍋', '🍊']);
  const [spinningReels, setSpinningReels] = useState([false, false, false]);
  const [status, setStatus] = useState('Ready to spin');
  const [history, setHistory] = useState<SpinHistoryEntry[]>([]);
  const [highlightWin, setHighlightWin] = useState(false);
  const [jackpotActive, setJackpotActive] = useState(false);
  const highlightTimeoutRef = useRef<number | null>(null);
  const stopTimeoutsRef = useRef<number[]>([]);

  const balance = user?.balance ?? 0;
  const maxBet = useMemo(
    () => getMaxBetForBalance(user?.balance),
    [user?.balance]
  );

  useEffect(() => {
    if (betAmount > maxBet) {
      setBetAmount(maxBet);
    } else if (betAmount < minBet) {
      setBetAmount(minBet);
    }
  }, [betAmount, maxBet]);

  useEffect(() => {
    return () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
      stopTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
      stopTimeoutsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!spinningReels.some(Boolean)) {
      return undefined;
    }
    const interval = setInterval(() => {
      setReels((prev) =>
        prev.map((value, index) =>
          spinningReels[index] ? getRandomSymbol() : value
        )
      );
    }, 90);
    return () => clearInterval(interval);
  }, [spinningReels]);

  const spinMutation = useMutation({
    mutationFn: () => spin(betAmount),
    onMutate: () => {
      stopTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
      stopTimeoutsRef.current = [];
      setSpinningReels([true, true, true]);
      setHighlightWin(false);
      setJackpotActive(false);
      setStatus('Spinning...');
      playTone(320, 0.07, 0.04);
      triggerImpact('light');
    },
    onSuccess: (data) => {
      const stopDelays = [200, 450, 700];
      stopDelays.forEach((delay, index) => {
        const timeoutId = window.setTimeout(() => {
          setReels((prev) => {
            const next = [...prev];
            next[index] = data.result.reels[index];
            return next;
          });
          setSpinningReels((prev) => {
            const next = [...prev];
            next[index] = false;
            return next;
          });

          if (index === stopDelays.length - 1) {
            updateBalance(data.newBalance);
            setHistory((prev) => [
              {
                id: Date.now(),
                reels: data.result.reels,
                win: data.result.win,
                bet: betAmount,
                time: new Date().toLocaleTimeString(),
              },
              ...prev,
            ].slice(0, 6));
            if (data.result.win > 0) {
              setHighlightWin(true);
              setStatus(`Win +${data.result.win}`);
              if (data.result.combination === 'jackpot') {
                setJackpotActive(true);
                playTone(880, 0.12, 0.08);
                setTimeout(() => playTone(660, 0.18, 0.07), 130);
                triggerNotification('success');
              } else {
                playTone(640, 0.1, 0.07);
                triggerImpact('medium');
              }
            } else {
              setStatus('No win. Try again.');
              playTone(220, 0.06, 0.03);
              triggerImpact('soft');
            }

            if (highlightTimeoutRef.current) {
              clearTimeout(highlightTimeoutRef.current);
            }
            highlightTimeoutRef.current = window.setTimeout(() => {
              setHighlightWin(false);
              setJackpotActive(false);
            }, 1600);
          }
        }, delay);
        stopTimeoutsRef.current.push(timeoutId);
      });
    },
    onError: () => {
      setSpinningReels([false, false, false]);
      setStatus('Spin failed. Check connection.');
      triggerNotification('error');
    },
  });

  const canSpin =
    !!user &&
    !spinningReels.some(Boolean) &&
    !spinMutation.isPending &&
    betAmount > 0 &&
    betAmount <= maxBetLimit &&
    betAmount <= maxBet &&
    balance >= betAmount;
  const betChips = useMemo(() => betPresets, []);

  const handleSpin = useCallback(() => {
    if (canSpin) {
      spinMutation.mutate();
    }
  }, [canSpin, spinMutation]);

  const handleBetIncrement = useCallback(() => {
    setBetAmount((value) => clampBet(value + 10, maxBet));
  }, [maxBet]);

  const handleBetDecrement = useCallback(() => {
    setBetAmount((value) => clampBet(value - 10, maxBet));
  }, [maxBet]);

  const handleBetSelect = useCallback(
    (value: number) => {
      setBetAmount(clampBet(value, maxBet));
    },
    [maxBet]
  );

  const handleMaxBet = useCallback(() => {
    setBetAmount(maxBet);
  }, [maxBet]);

  return {
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
    hasUser: !!user,
  };
}
