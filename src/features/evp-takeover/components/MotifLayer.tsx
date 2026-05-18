import { AnimatePresence, motion } from 'framer-motion';
import { resolveMotifs } from '../data/motifs';
import type { WorldId } from '../types';

interface MotifLayerProps {
  worldId: WorldId;
  region: string;
  cacheKey: string;
}

const COLOR_VAR: Record<string, string> = {
  'fg-secondary': 'var(--fg-secondary)',
  accent: 'var(--accent)',
  highlight: 'var(--highlight)',
};

export function MotifLayer({ worldId, region, cacheKey }: MotifLayerProps) {
  const motifs = resolveMotifs(worldId, region);

  return (
    <div className="takeover-motifs" aria-hidden="true">
      <AnimatePresence mode="sync">
        <motion.div
          key={cacheKey}
          className="takeover-motifs__set"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
        >
          {motifs.map((m, i) => {
            const Cmp = m.cmp;
            return (
              <motion.div
                key={i}
                className="takeover-motifs__item"
                style={{
                  top: m.top,
                  right: m.right,
                  bottom: m.bottom,
                  left: m.left,
                  width: m.size,
                  height: m.size,
                  color: COLOR_VAR[m.color ?? 'accent'],
                  opacity: m.opacity ?? 0.5,
                  ['--motif-rotate' as never]: `${m.rotate ?? 0}deg`,
                }}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: m.opacity ?? 0.5 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.08,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <Cmp width="100%" height="100%" />
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
