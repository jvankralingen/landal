interface RandomParkButtonProps {
  onShuffle: () => void;
}

export function RandomParkButton({ onShuffle }: RandomParkButtonProps) {
  return (
    <button
      type="button"
      className="takeover-random-btn"
      onClick={onShuffle}
      aria-label="Willekeurig park"
      title="Willekeurig park"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </svg>
    </button>
  );
}
