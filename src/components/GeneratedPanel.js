import React from 'react';
import { vibeConfigs } from '../data/constants';
import { getParkImage } from '../data/parkData';

const GeneratedPanel = ({
  theme,
  isDark,
  generatedContent,
  onPreview,
  onRemove,
  onClearAll,
}) => {
  const entries = Object.entries(generatedContent);

  if (entries.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        width: '320px',
        minWidth: '320px',
        borderLeft: `1px solid ${theme.border}`,
        background: isDark ? '#18191b' : '#f9fafb',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '16px',
          borderBottom: `1px solid ${theme.border}`,
          background: isDark ? '#1e2023' : '#fff',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#22c55e', fontSize: '14px' }}>✓</span>
            <span
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: theme.text,
              }}
            >
              Gegenereerd
            </span>
          </div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '600',
              color: '#fff',
              background: '#22c55e',
              padding: '2px 8px',
              borderRadius: '10px',
            }}
          >
            {entries.length}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '8px',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              color: theme.textMuted,
              margin: 0,
            }}
          >
            Parken met lokale content
          </p>
          {onClearAll && entries.length > 0 && (
            <button
              onClick={onClearAll}
              style={{
                fontSize: '10px',
                color: '#ef4444',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '2px 6px',
                borderRadius: '4px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = isDark
                  ? 'rgba(239,68,68,0.1)'
                  : 'rgba(239,68,68,0.1)')
              }
              onMouseLeave={(e) => (e.target.style.background = 'transparent')}
            >
              Alles wissen
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '12px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {entries.map(([parkId, content]) => {
            const vibe = vibeConfigs[content.vibe] || vibeConfigs.familie;
            const imageUrl = getParkImage(
              content.vibe,
              content.regionId,
              content.countryId,
              parkId
            );

            return (
              <div
                key={parkId}
                style={{
                  background: theme.bgPane,
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`,
                  overflow: 'hidden',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
              >
                <div
                  style={{
                    height: '80px',
                    background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%), url(${imageUrl}) center/cover`,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '10px',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: vibe.accent,
                      color: '#fff',
                      fontWeight: '600',
                    }}
                  >
                    {vibe.label}
                  </span>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#fff',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    }}
                  >
                    {content.parkName}
                  </div>
                </div>

                <div style={{ padding: '10px' }}>
                  <div
                    style={{
                      fontSize: '11px',
                      color: theme.textMuted,
                      marginBottom: '10px',
                      lineHeight: '1.4',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {content.title}
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => onPreview(parkId)}
                      style={{
                        flex: 1,
                        padding: '6px 10px',
                        borderRadius: '5px',
                        border: 'none',
                        background: vibe.accent,
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>👁️</span> Preview
                    </button>
                    {onRemove && (
                      <button
                        onClick={() => onRemove(parkId)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '5px',
                          border: `1px solid ${theme.border}`,
                          background: 'transparent',
                          color: theme.textMuted,
                          fontSize: '11px',
                          cursor: 'pointer',
                        }}
                        title="Verwijderen"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {entries.length > 0 && (
        <div
          style={{
            padding: '12px',
            borderTop: `1px solid ${theme.border}`,
            background: isDark ? '#1e2023' : '#fff',
          }}
        >
          <button
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: 'none',
              background: '#0097a2',
              color: '#fff',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span>📥</span> Alles exporteren
          </button>
        </div>
      )}
    </div>
  );
};

export default GeneratedPanel;
