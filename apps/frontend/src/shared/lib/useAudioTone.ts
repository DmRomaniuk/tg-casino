import { useCallback, useRef } from 'react';

export function useAudioTone() {
  const audioRef = useRef<AudioContext | null>(null);

  return useCallback((frequency: number, duration: number, volume = 0.06) => {
    if (typeof window === 'undefined') {
      return;
    }
    const AudioContextImpl =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextImpl) {
      return;
    }
    if (!audioRef.current) {
      audioRef.current = new AudioContextImpl();
    }
    const context = audioRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gainNode.gain.value = volume;
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + duration);
  }, []);
}
