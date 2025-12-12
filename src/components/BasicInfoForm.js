import React from 'react';

const BasicInfoForm = ({ theme, isDark, selectedFunctie, beschrijving, onBeschrijvingChange }) => {
  return (
    <div
      style={{
        background: theme.bgPane,
        borderRadius: '8px',
        border: `1px solid ${theme.border}`,
        marginBottom: '24px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '16px 20px',
          borderBottom: `1px solid ${theme.border}`,
          background: isDark ? '#1e2023' : '#f9fafb',
        }}
      >
        <h2
          style={{
            fontSize: '14px',
            fontWeight: '600',
            margin: 0,
            color: theme.text,
          }}
        >
          Basis Informatie
        </h2>
        <p
          style={{
            fontSize: '12px',
            color: theme.textMuted,
            margin: '4px 0 0 0',
          }}
        >
          De kerngegevens van dit functieprofiel die als basis dienen voor alle
          lokalisaties
        </p>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: theme.text,
              marginBottom: '8px',
            }}
          >
            Functienaam
          </label>
          <input
            type="text"
            value={selectedFunctie.title}
            readOnly
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '6px',
              border: `1px solid ${theme.border}`,
              background: theme.bgInput,
              color: theme.text,
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: theme.text,
              marginBottom: '8px',
            }}
          >
            Categorie
          </label>
          <select
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '6px',
              border: `1px solid ${theme.border}`,
              background: theme.bgInput,
              color: theme.text,
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          >
            <option>Hospitality & Service</option>
            <option>Techniek & Onderhoud</option>
            <option>Entertainment & Recreatie</option>
          </select>
        </div>
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: theme.text,
              marginBottom: '8px',
            }}
          >
            Omschrijving
          </label>
          <textarea
            value={beschrijving}
            onChange={(e) => onBeschrijvingChange(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '6px',
              border: `1px solid ${theme.border}`,
              background: theme.bgInput,
              color: theme.text,
              fontSize: '14px',
              boxSizing: 'border-box',
              resize: 'vertical',
              fontFamily: 'inherit',
              lineHeight: '1.5',
            }}
            placeholder="Beschrijf de kern van deze functie..."
          />
          <div
            style={{
              fontSize: '11px',
              color: theme.textMuted,
              marginTop: '6px',
            }}
          >
            Deze omschrijving wordt als basis gebruikt voor AI-gegenereerde
            lokalisaties
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
