import { useEffect, useRef, useState } from 'react';

interface EditableTextProps {
  /** Huidige weergavetekst (override óf auto-generated). */
  value: string;
  /** True wanneer er voor de huidige selectie een gebruikers-override actief is. */
  hasOverride: boolean;
  /** Tag voor de display-rendering — h1 voor headlines, p voor body. */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  /** Single-line input of multi-line textarea. Default = single-line. */
  multiline?: boolean;
  className?: string;
  /** Optionele inline-styles (kleur, font, etc.) — properly geprobeerd in
   *  zowel display als edit-mode zodat de tekst niet "springt". */
  style?: React.CSSProperties;
  onSave: (next: string) => void;
  /** Optional reset-handler. Als omitted: empty + blur is een no-op
   *  (geen verwijderen, geen terugval naar auto). */
  onReset?: () => void;
}

/**
 * Klik op de tekst om te bewerken. Blur of Enter saved (Shift+Enter voor
 * regel-einde in multiline). Esc annuleert. Een × verschijnt rechts wanneer
 * er een override actief is — klik 'm om terug te vallen op auto-tekst.
 */
export function EditableText({
  value,
  hasOverride,
  as = 'span',
  multiline = false,
  className,
  style,
  onSave,
  onReset,
}: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Sync draft met value wanneer parent een nieuwe waarde levert en we
  // niet aan het bewerken zijn.
  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  // Bij opening van edit-mode: focus + select-all zodat typen direct vervangt.
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const startEdit = () => {
    setDraft(value);
    setEditing(true);
  };

  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== value) {
      onSave(trimmed);
    } else if (!trimmed && onReset) {
      // Lege string + onReset beschikbaar → terug naar auto-tekst.
      // Zonder onReset (bv. bij perks) is leeg + blur een no-op, zodat
      // de bestaande waarde behouden blijft.
      onReset();
    }
    setEditing(false);
  };

  if (editing) {
    if (multiline) {
      return (
        <textarea
          ref={(el) => {
            inputRef.current = el;
          }}
          className={`cc-editable cc-editable--editing ${className ?? ''}`}
          value={draft}
          style={style}
          rows={3}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.preventDefault();
              cancel();
            }
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              commit();
            }
          }}
        />
      );
    }
    return (
      <input
        ref={(el) => {
          inputRef.current = el;
        }}
        className={`cc-editable cc-editable--editing ${className ?? ''}`}
        value={draft}
        style={style}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault();
            cancel();
          }
          if (e.key === 'Enter') {
            e.preventDefault();
            commit();
          }
        }}
      />
    );
  }

  const Tag = as;
  return (
    <span className="cc-editable-wrap">
      <Tag
        className={`cc-editable ${hasOverride ? 'cc-editable--has-override' : ''} ${className ?? ''}`}
        style={style}
        onClick={startEdit}
        title="Klik om te bewerken"
      >
        {value}
      </Tag>
      {hasOverride && onReset && (
        <button
          type="button"
          className="cc-editable-reset"
          onClick={(e) => {
            e.stopPropagation();
            onReset();
          }}
          aria-label="Override verwijderen — terug naar auto-tekst"
          title="Override verwijderen"
        >
          ×
        </button>
      )}
    </span>
  );
}
