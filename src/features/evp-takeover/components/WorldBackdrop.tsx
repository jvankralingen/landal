import { AnimatePresence, motion } from 'framer-motion';

interface WorldBackdropProps {
  imageUrl: string;
  worldKey: string;
}

export function WorldBackdrop({ imageUrl, worldKey }: WorldBackdropProps) {
  return (
    <div className="takeover-backdrop">
      <AnimatePresence mode="sync">
        <motion.img
          key={`${worldKey}::${imageUrl}`}
          src={imageUrl}
          alt=""
          className="takeover-backdrop__img"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 1.1, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 8, ease: 'linear' },
          }}
          draggable={false}
        />
      </AnimatePresence>
      <div className="takeover-backdrop__veil" />
    </div>
  );
}
