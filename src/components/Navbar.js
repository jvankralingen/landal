import React from 'react';

const TABS = [
  { id: 'content', label: 'Content' },
  { id: 'structure', label: 'Structure' },
  { id: 'media', label: 'Media' },
  { id: 'vision', label: 'Vision' },
];

const Navbar = ({ theme, isDark, activeTab, setActiveTab, toggleTheme }) => {
  return (
    <div
      style={{
        height: '49px',
        background: theme.bgPane,
        borderBottom: `1px solid ${theme.border}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '8px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          background: 'linear-gradient(135deg, #4f8ff7 0%, #34d399 100%)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          color: 'white',
          fontSize: '14px',
        }}
      >
        L
      </div>
      <button
        style={{
          background: 'transparent',
          border: 'none',
          color: theme.text,
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '6px 8px',
          borderRadius: '4px',
        }}
      >
        Landal Werkenbij{' '}
        <span style={{ fontSize: '10px', opacity: 0.5 }}>▼</span>
      </button>
      <div style={{ display: 'flex', marginLeft: '16px', height: '100%' }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeTab === tab.id ? theme.text : theme.textMuted,
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              padding: '0 12px',
              height: '100%',
              borderBottom:
                activeTab === tab.id
                  ? '2px solid #4f8ff7'
                  : '2px solid transparent',
              transition: 'all 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <button
        onClick={toggleTheme}
        style={{
          background: isDark ? '#2a2d31' : '#f3f4f6',
          border: `1px solid ${theme.border}`,
          color: theme.textMuted,
          fontSize: '12px',
          fontWeight: '500',
          cursor: 'pointer',
          padding: '6px 12px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.15s',
        }}
      >
        {isDark ? '☀️' : '🌙'} {isDark ? 'Light' : 'Dark'}
      </button>
    </div>
  );
};

export default Navbar;
