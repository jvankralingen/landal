import { useEffect, useRef } from 'react';
import type { WorldId } from '../types';

interface AmbientAudioProps {
  worldId: WorldId;
  audioSrc?: string;
  enabled: boolean;
}

export function AmbientAudio({ worldId, audioSrc, enabled }: AmbientAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (!enabled || !audioSrc) {
      el.pause();
      return;
    }
    el.volume = 0;
    el.play().catch(() => {});
    const start = performance.now();
    const target = 0.25;
    const fadeMs = 2000;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / fadeMs);
      el.volume = target * t;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [audioSrc, enabled, worldId]);

  if (!audioSrc) return null;

  return (
    <audio
      ref={audioRef}
      src={audioSrc}
      loop
      preload="auto"
      aria-hidden="true"
    />
  );
}
