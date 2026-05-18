interface AudioToggleProps {
  enabled: boolean;
  available: boolean;
  onToggle: () => void;
}

export function AudioToggle({ enabled, available, onToggle }: AudioToggleProps) {
  return (
    <button
      type="button"
      className={'takeover-audio-toggle' + (enabled ? ' is-on' : '')}
      onClick={onToggle}
      disabled={!available}
      aria-label={enabled ? 'Geluid uit' : 'Geluid aan'}
      title={
        !available
          ? 'Nog geen geluid voor deze sfeer'
          : enabled
            ? 'Geluid uit'
            : 'Sfeer-geluid aan'
      }
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        {enabled ? (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M19 5a9 9 0 0 1 0 14" />
          </>
        ) : (
          <path d="M23 9l-6 6M17 9l6 6" />
        )}
      </svg>
    </button>
  );
}
