import React from 'react';

const EditorHeader = ({ theme, isDark, selectedFunctie, generatedContent }) => {
  const lokalisatieCount = Object.keys(generatedContent).filter((k) =>
    generatedContent[k].title.includes(selectedFunctie.title)
  ).length;

  return (
    <div
      style={{
        padding: '16px 24px',
        borderBottom: `1px solid ${theme.border}`,
        background: theme.bgPane,
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <span style={{ fontSize: '24px' }}>{selectedFunctie.icon}</span>
      <div style={{ flex: 1 }}>
        <h1
          style={{
            fontSize: '18px',
            fontWeight: '600',
            margin: 0,
            color: theme.text,
          }}
        >
          {selectedFunctie.title}
        </h1>
        <div
          style={{
            fontSize: '12px',
            color: theme.textMuted,
            marginTop: '2px',
          }}
        >
          Functiefamilie · Basis + {lokalisatieCount} lokalisaties
        </div>
      </div>
      <button
        style={{
          background: isDark ? '#2a2d31' : '#f3f4f6',
          border: `1px solid ${theme.border}`,
          color: theme.text,
          padding: '8px 16px',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span style={{ color: '#22c55e' }}>●</span> Gepubliceerd
      </button>
    </div>
  );
};

export default EditorHeader;
