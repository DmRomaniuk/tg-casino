import { useEffect, useRef, useState } from 'react';

export function useCountUp(target: number | undefined, durationMs = 500) {
  const [value, setValue] = useState(target ?? 0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(value);

  useEffect(() => {
    if (typeof target !== 'number') {
      return;
    }
    if (target === fromRef.current) {
      setValue(target);
      return;
    }
    fromRef.current = value;
    startRef.current = null;

    const step = (timestamp: number) => {
      if (!startRef.current) {
        startRef.current = timestamp;
      }
      const progress = Math.min(
        1,
        (timestamp - startRef.current) / durationMs
      );
      const nextValue = Math.round(
        fromRef.current + (target - fromRef.current) * progress
      );
      setValue(nextValue);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, durationMs]);

  return value;
}
