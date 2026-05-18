import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function SidePanel({ open, onClose, title = 'Instellingen', children }: SidePanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          key="panel"
          className="takeover-panel"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 34 }}
          aria-label={title}
        >
          <header className="takeover-panel__head">
            <span className="takeover-panel__title">{title}</span>
            <button
              type="button"
              className="takeover-panel__close"
              onClick={onClose}
              aria-label="Sluit instellingen"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </header>
          <div className="takeover-panel__body">{children}</div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

interface PanelToggleProps {
  open: boolean;
  onToggle: () => void;
  /** Compact summary shown when closed (e.g. "Forest · Horeca"). */
  summary?: string;
}

export function PanelToggle({ open, onToggle, summary }: PanelToggleProps) {
  return (
    <button
      type="button"
      className={'takeover-panel-toggle' + (open ? ' is-open' : '')}
      onClick={onToggle}
      aria-label={open ? 'Sluit instellingen' : 'Open instellingen'}
      aria-expanded={open}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
      {!open && summary && (
        <span className="takeover-panel-toggle__summary">{summary}</span>
      )}
    </button>
  );
}
