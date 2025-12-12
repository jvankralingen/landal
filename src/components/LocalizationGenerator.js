import React from 'react';
import { parkDatabase } from '../data/parkData';
import ParkSelector from './ParkSelector';

const LocalizationGenerator = ({
  theme,
  isDark,
  selectedParks,
  totalParkCount,
  isGenerating,
  generationProgress,
  onGenerate,
  parkSearch,
  onParkSearchChange,
  parkFilter,
  onParkFilterChange,
  togglePark,
  toggleCountry,
  toggleRegion,
  selectAllInCountry,
  selectAllInRegion,
  expandedCountries,
  expandedRegions,
  getFilteredParks,
  useAI,
  onUseAIChange,
  aiAvailable,
}) => {
  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(79,143,247,0.15) 100%)'
            : 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(79,143,247,0.08) 100%)',
          border: `1px solid ${
            isDark ? 'rgba(124,58,237,0.3)' : 'rgba(124,58,237,0.2)'
          }`,
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #7c3aed 0%, #4f8ff7 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}
          >
            ✨
          </div>
          <div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: theme.text,
                marginBottom: '2px',
              }}
            >
              Localised Content Generator
            </div>
            <div style={{ fontSize: '12px', color: theme.textMuted }}>
              Genereer authentieke, park-specifieke functieprofielen
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <button
            onClick={onGenerate}
            disabled={selectedParks.length === 0 || isGenerating}
            style={{
              background:
                selectedParks.length === 0
                  ? isDark
                    ? '#2a2d31'
                    : '#e5e7eb'
                  : 'linear-gradient(135deg, #7c3aed 0%, #4f8ff7 50%, #06b6d4 100%)',
              border: 'none',
              color: selectedParks.length === 0 ? theme.textMuted : 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: selectedParks.length === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow:
                selectedParks.length > 0
                  ? '0 4px 14px rgba(124,58,237,0.35)'
                  : 'none',
              transition: 'all 0.2s',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {isGenerating ? (
              <>
                <span
                  className="spinner"
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }}
                ></span>
                {generationProgress.total > 0
                  ? `${generationProgress.current}/${generationProgress.total}`
                  : 'Genereren...'}
              </>
            ) : (
              <>
                <span style={{ fontSize: '16px' }}>✨</span>Genereer{useAI ? ' met AI' : ''}
                <span
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    marginLeft: '4px',
                  }}
                >
                  {selectedParks.length}
                </span>
              </>
            )}
          </button>
          {selectedParks.length === 0 && (
            <span style={{ fontSize: '12px', color: theme.textMuted }}>
              Selecteer eerst parken hieronder
            </span>
          )}
        </div>

        {/* AI Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '16px',
            padding: '12px',
            background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)',
            borderRadius: '8px',
          }}
        >
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: aiAvailable ? 'pointer' : 'not-allowed',
              opacity: aiAvailable ? 1 : 0.5,
            }}
          >
            <input
              type="checkbox"
              checked={useAI && aiAvailable}
              onChange={(e) => onUseAIChange(e.target.checked)}
              disabled={!aiAvailable}
              style={{ width: '16px', height: '16px', cursor: aiAvailable ? 'pointer' : 'not-allowed' }}
            />
            <span style={{ fontSize: '13px', fontWeight: '500', color: theme.text }}>
              Gebruik Claude AI voor natuurlijke teksten
            </span>
          </label>
          {!aiAvailable && (
            <span style={{ fontSize: '11px', color: theme.textMuted }}>
              (API key niet geconfigureerd)
            </span>
          )}
          {useAI && aiAvailable && (
            <span
              style={{
                fontSize: '10px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #4f8ff7 100%)',
                color: 'white',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: '600',
              }}
            >
              AI
            </span>
          )}
        </div>

        {/* Progress indicator during generation */}
        {isGenerating && generationProgress.total > 0 && (
          <div style={{ marginTop: '12px' }}>
            <div
              style={{
                height: '4px',
                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${((generationProgress.current + (generationProgress.subProgress || 0)) / generationProgress.total) * 100}%`,
                  background: 'linear-gradient(90deg, #7c3aed 0%, #4f8ff7 100%)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
            {generationProgress.parkName && (
              <div style={{ fontSize: '11px', color: theme.textMuted, marginTop: '6px' }}>
                <span style={{ fontWeight: '500' }}>{generationProgress.parkName}</span>
                {generationProgress.status && (
                  <span style={{ marginLeft: '8px', color: useAI ? '#7c3aed' : theme.textMuted }}>
                    — {generationProgress.status}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            flex: '1 1 250px',
            display: 'flex',
            alignItems: 'center',
            background: isDark ? '#101112' : '#f3f4f6',
            borderRadius: '6px',
            padding: '8px 12px',
            gap: '8px',
          }}
        >
          <span style={{ color: theme.textMuted }}>🔍</span>
          <input
            type="text"
            placeholder="Zoek parken, landen, regio's..."
            value={parkSearch}
            onChange={(e) => onParkSearchChange(e.target.value)}
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
        <select
          value={parkFilter}
          onChange={(e) => onParkFilterChange(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: `1px solid ${theme.border}`,
            background: theme.bgInput,
            color: theme.text,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          <option value="all">Alle parken</option>
          <option value="selected">Geselecteerd ({selectedParks.length})</option>
          <optgroup label="Filter op sfeer">
            <option value="luxe">🌟 Luxe & Premium</option>
            <option value="kinderen">🎈 Kindvriendelijk</option>
            <option value="natuur">🌲 Natuur & Rust</option>
            <option value="strand">🏖️ Strand & Zee</option>
            <option value="actief">⚡ Actief & Avontuur</option>
            <option value="wellness">💆 Wellness</option>
            <option value="familie">👨‍👩‍👧‍👦 Familie</option>
          </optgroup>
        </select>
      </div>

      {/* Park Selector */}
      <ParkSelector
        theme={theme}
        isDark={isDark}
        selectedParks={selectedParks}
        togglePark={togglePark}
        toggleCountry={toggleCountry}
        toggleRegion={toggleRegion}
        selectAllInCountry={selectAllInCountry}
        selectAllInRegion={selectAllInRegion}
        expandedCountries={expandedCountries}
        expandedRegions={expandedRegions}
        parkSearch={parkSearch}
        parkFilter={parkFilter}
        getFilteredParks={getFilteredParks}
        parkDatabase={parkDatabase}
      />
    </div>
  );
};

export default LocalizationGenerator;
