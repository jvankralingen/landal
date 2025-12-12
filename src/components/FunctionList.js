import React from 'react';
import { functiefamilies } from '../data/jobProfiles';

const FunctionList = ({
  theme,
  isDark,
  selectedFunctie,
  generatedContent,
  onFunctieSelect,
}) => {
  return (
    <div
      style={{
        width: '280px',
        borderRight: `1px solid ${theme.border}`,
        background: theme.bgPane,
        overflow: 'auto',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: '12px',
          borderBottom: `1px solid ${theme.border}`,
          position: 'sticky',
          top: 0,
          background: theme.bgPane,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
          }}
        >
          <span style={{ fontSize: '14px' }}>📋</span>
          <span
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: theme.text,
            }}
          >
            Functieprofielen
          </span>
          <span
            style={{
              fontSize: '11px',
              background: isDark ? '#2a2d31' : '#e5e7eb',
              padding: '2px 6px',
              borderRadius: '4px',
              color: theme.textMuted,
            }}
          >
            {functiefamilies.length}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: isDark ? '#101112' : '#f3f4f6',
            borderRadius: '6px',
            padding: '8px 10px',
            gap: '8px',
          }}
        >
          <span style={{ color: theme.textMuted, fontSize: '13px' }}>🔍</span>
          <input
            type="text"
            placeholder="Zoek functieprofiel..."
            style={{
              background: 'transparent',
              border: 'none',
              color: theme.text,
              fontSize: '13px',
              outline: 'none',
              width: '100%',
            }}
          />
        </div>
      </div>
      <div style={{ padding: '8px' }}>
        {functiefamilies.map((functie) => (
          <div
            key={functie.id}
            onClick={() => onFunctieSelect(functie)}
            style={{
              padding: '12px',
              borderRadius: '6px',
              cursor: 'pointer',
              background:
                selectedFunctie.id === functie.id
                  ? isDark
                    ? 'rgba(79,143,247,0.15)'
                    : 'rgba(79,143,247,0.1)'
                  : 'transparent',
              borderLeft:
                selectedFunctie.id === functie.id
                  ? '3px solid #4f8ff7'
                  : '3px solid transparent',
              marginBottom: '4px',
              transition: 'all 0.15s',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '4px',
              }}
            >
              <span style={{ fontSize: '18px' }}>{functie.icon}</span>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color:
                    selectedFunctie.id === functie.id ? '#4f8ff7' : theme.text,
                }}
              >
                {functie.title}
              </span>
            </div>
            <div
              style={{
                fontSize: '11px',
                color: theme.textMuted,
                marginLeft: '28px',
              }}
            >
              {
                Object.keys(generatedContent).filter((k) =>
                  generatedContent[k].title.includes(functie.title)
                ).length
              }{' '}
              lokalisaties
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunctionList;
