export const getTheme = (isDark) => ({
  bg: isDark ? '#101112' : '#f1f3f6',
  bgPane: isDark ? '#1b1d1f' : '#ffffff',
  bgHover: isDark ? '#2a2d31' : '#f3f4f6',
  bgInput: isDark ? '#1b1d1f' : '#ffffff',
  border: isDark ? '#272a2e' : '#e1e4e8',
  text: isDark ? '#fff' : '#1a1a1a',
  textMuted: isDark ? '#8b8f94' : '#6b7280',
  textFaint: isDark ? '#5e6369' : '#9ca3af',
  accent: '#4f8ff7',
  accentHover: '#3a7ce0',
});
