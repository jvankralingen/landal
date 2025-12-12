import React from 'react';
import { functiefamilies } from '../data/jobProfiles';

const Sidebar = ({ theme, isDark, generatedContent, totalParkCount }) => {
  const menuItems = [
    {
      icon: '📋',
      label: 'Functieprofielen',
      active: true,
      badge: functiefamilies.length,
    },
    { icon: '🏕️', label: 'Parken', badge: `${totalParkCount}+` },
    {
      icon: '📝',
      label: 'Lokalisaties',
      badge: Object.keys(generatedContent).length,
    },
  ];

  return (
    <div
      style={{
        width: '220px',
        borderRight: `1px solid ${theme.border}`,
        background: theme.bgPane,
        overflow: 'auto',
        flexShrink: 0,
      }}
    >
      <div style={{ padding: '12px' }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: '600',
            color: theme.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '12px',
          }}
        >
          Content
        </div>
        {menuItems.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
              background: item.active
                ? isDark
                  ? 'rgba(79,143,247,0.15)'
                  : 'rgba(79,143,247,0.1)'
                : 'transparent',
              color: item.active ? '#4f8ff7' : theme.text,
              fontSize: '13px',
              marginBottom: '2px',
              transition: 'all 0.15s',
            }}
          >
            <span>{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge && (
              <span
                style={{
                  fontSize: '11px',
                  background: item.active
                    ? 'rgba(79,143,247,0.2)'
                    : isDark
                    ? '#2a2d31'
                    : '#e5e7eb',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  color: item.active ? '#4f8ff7' : theme.textMuted,
                }}
              >
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
