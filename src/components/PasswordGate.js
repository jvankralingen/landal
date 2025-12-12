import React, { useState } from 'react';
import { BRAND } from '../data/constants';

const PasswordGate = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'lukelovesbollo') {
      localStorage.setItem('landal_auth', 'true');
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: BRAND.colors.sand,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: BRAND.fonts.body,
    }}>
      <div style={{
        background: 'white',
        padding: '48px',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '360px',
      }}>
        <h1 style={{
          fontFamily: BRAND.fonts.headline,
          fontSize: '24px',
          fontWeight: '400',
          color: BRAND.colors.granite,
          margin: '0 0 8px 0',
          textAlign: 'center',
        }}>
          Landal Werkenbij
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: '0 0 32px 0',
          textAlign: 'center',
        }}>
          Content Generator
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wachtwoord"
            autoFocus
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14px',
              border: `1px solid ${error ? '#ef4444' : '#e5e7eb'}`,
              borderRadius: '8px',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
          />
          {error && (
            <p style={{
              fontSize: '13px',
              color: '#ef4444',
              margin: '8px 0 0 0',
            }}>
              Onjuist wachtwoord
            </p>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '16px',
              background: BRAND.colors.teal,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Doorgaan
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordGate;
