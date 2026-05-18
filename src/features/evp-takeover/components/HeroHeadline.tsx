import { AnimatePresence, motion } from 'framer-motion';

interface HeroHeadlineProps {
  headline: string;
  sub?: string;
  cacheKey: string;
}

export function HeroHeadline({ headline, sub, cacheKey }: HeroHeadlineProps) {
  return (
    <div>
      <AnimatePresence mode="popLayout">
        <motion.h1
          key={cacheKey}
          className="takeover-headline"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
        >
          {headline}
        </motion.h1>
      </AnimatePresence>
      {sub && (
        <AnimatePresence mode="popLayout">
          <motion.p
            key={`${cacheKey}::sub`}
            className="takeover-sub"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
          >
            {sub}
          </motion.p>
        </AnimatePresence>
      )}
    </div>
  );
}
