import React from 'react';
import { vibeConfigs } from '../data/constants';

const GeneratedResults = ({ theme, isDark, generatedContent, onPreview }) => {
  if (Object.keys(generatedContent).length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: '24px', padding: '0 20px 20px' }}>
      <div
        style={{
          fontSize: '13px',
          fontWeight: '600',
          color: theme.text,
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ color: '#22c55e' }}>✓</span>Gegenereerde lokalisaties
        <span
          style={{
            fontSize: '11px',
            fontWeight: '400',
            color: theme.textMuted,
            background: isDark ? '#2a2d31' : '#e5e7eb',
            padding: '2px 8px',
            borderRadius: '4px',
          }}
        >
          {Object.keys(generatedContent).length}
        </span>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '12px',
        }}
      >
        {Object.entries(generatedContent).map(([parkId, content]) => {
          const vibe = vibeConfigs[content.vibe] || vibeConfigs.familie;
          return (
            <div
              key={parkId}
              style={{
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                overflow: 'hidden',
                background: theme.bgPane,
              }}
            >
              <div
                style={{
                  height: '6px',
                  background: vibe.accent,
                }}
              />
              <div style={{ padding: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: vibe.accent,
                      color: '#fff',
                      fontWeight: '600',
                    }}
                  >
                    {vibe.label}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: theme.text,
                    marginBottom: '4px',
                  }}
                >
                  {content.parkName}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: theme.textMuted,
                    marginBottom: '12px',
                    lineHeight: '1.5',
                  }}
                >
                  {content.title}
                </div>
                <button
                  onClick={() => onPreview(parkId)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '6px',
                    border: `1px solid ${theme.border}`,
                    background: 'transparent',
                    color: theme.text,
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <span>👁️</span> Preview bekijken
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GeneratedResults;
