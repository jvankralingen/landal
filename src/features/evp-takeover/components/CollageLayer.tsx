import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CollageTile } from '../types';

interface CollageLayerProps {
  tiles: CollageTile[];
  cacheKey: string;
}

export function CollageLayer({ tiles, cacheKey }: CollageLayerProps) {
  return (
    <div className="takeover-collage" aria-hidden="true">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={cacheKey}
          className="takeover-collage__set"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          {tiles.map((t, i) => (
            <Tile key={`${cacheKey}-${i}`} tile={t} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Tile({ tile, index }: { tile: CollageTile; index: number }) {
  const [errored, setErrored] = useState(false);
  const showPlaceholder = !tile.src || errored;

  return (
    <motion.figure
      className="takeover-collage__tile"
      data-aspect={tile.aspect}
      data-placeholder={showPlaceholder ? 'true' : undefined}
      style={{
        top: tile.top,
        right: tile.right,
        bottom: tile.bottom,
        left: tile.left,
        width: tile.width,
        zIndex: tile.z ?? 1,
        background: tile.cardBg,
        ['--tile-rotate' as never]: `${tile.rotate ?? 0}deg`,
        ['--tile-ratio' as never]: tile.ratio,
      }}
      initial={{ opacity: 0, y: 22, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{
        duration: 0.95,
        delay: 0.08 + index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {showPlaceholder ? (
        <span className="takeover-collage__placeholder">
          <span className="takeover-collage__placeholder-mark">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="9" cy="11" r="1.6" />
              <path d="M21 17l-5-5-9 9" />
            </svg>
          </span>
          <span className="takeover-collage__placeholder-label">
            {tile.placeholderLabel ?? 'Foto'}
          </span>
          <span className="takeover-collage__placeholder-hint">
            foto nodig
          </span>
        </span>
      ) : (
        <span className="takeover-collage__img-wrap">
          <img
            src={tile.src!}
            alt=""
            loading="lazy"
            draggable={false}
            onError={() => setErrored(true)}
          />
        </span>
      )}
    </motion.figure>
  );
}
