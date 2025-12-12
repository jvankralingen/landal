import React from 'react';

const ParkSelector = ({
  theme,
  isDark,
  selectedParks,
  togglePark,
  toggleCountry,
  toggleRegion,
  selectAllInCountry,
  selectAllInRegion,
  expandedCountries,
  expandedRegions,
  parkSearch,
  parkFilter,
  getFilteredParks,
  parkDatabase,
}) => {
  // LOGICA: Toon de platte lijst als er gezocht wordt OF als er gefilterd wordt op een segment
  const showFlatList = parkSearch !== '' || parkFilter !== 'all';
  const filteredList = getFilteredParks();

  // --- WEERGAVE 1: PLATTE LIJST (Zoeken & Filteren) ---
  if (showFlatList) {
    if (filteredList.length === 0) {
      return (
        <div
          style={{
            padding: '20px',
            textAlign: 'center',
            color: theme.textMuted,
            fontSize: '13px',
          }}
        >
          Geen parken gevonden met deze filters.
        </div>
      );
    }

    return (
      <div>
        <div
          style={{
            fontSize: '12px',
            color: theme.textMuted,
            marginBottom: '12px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{filteredList.length} parken gevonden</span>
          {parkFilter !== 'all' && (
            <span style={{ fontWeight: 600, color: theme.accent }}>
              Gefilterd op: {parkFilter}
            </span>
          )}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '8px',
          }}
        >
          {filteredList.map((park) => (
            <div
              key={park.id}
              onClick={() => togglePark(park.id)}
              style={{
                padding: '10px 12px',
                borderRadius: '6px',
                border: `1px solid ${
                  selectedParks.includes(park.id) ? '#4f8ff7' : theme.border
                }`,
                background: selectedParks.includes(park.id)
                  ? isDark
                    ? 'rgba(79,143,247,0.15)'
                    : 'rgba(79,143,247,0.08)'
                  : theme.bgHover,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px',
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedParks.includes(park.id)}
                  onChange={() => {}}
                  style={{ accentColor: '#4f8ff7' }}
                />
                <span
                  style={{
                    fontSize: '13px',
                    color: theme.text,
                    fontWeight: selectedParks.includes(park.id) ? '500' : '400',
                  }}
                >
                  {park.name}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginLeft: '24px',
                }}
              >
                <span style={{ fontSize: '11px', color: theme.textMuted }}>
                  {park.countryLabel}
                </span>

                {/* Toon de Vibe/Segment tag zodat je ziet waarom dit park er staat */}
                <span
                  style={{
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: isDark ? 'rgba(255,255,255,0.1)' : '#e0e0e0',
                    color: theme.textFaint,
                    textTransform: 'capitalize',
                  }}
                >
                  {park.vibe}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- WEERGAVE 2: ACCORDEON (Standaard overzicht) ---
  return (
    <div
      style={{
        border: `1px solid ${theme.border}`,
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {Object.entries(parkDatabase).map(
        ([countryId, country], countryIndex) => (
          <div key={countryId}>
            <div
              onClick={() => toggleCountry(countryId)}
              style={{
                padding: '12px 16px',
                background: isDark ? '#1e2023' : '#f9fafb',
                borderBottom: `1px solid ${theme.border}`,
                borderTop:
                  countryIndex > 0 ? `1px solid ${theme.border}` : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                userSelect: 'none',
              }}
            >
              <span
                style={{
                  transform: expandedCountries.includes(countryId)
                    ? 'rotate(90deg)'
                    : 'rotate(0)',
                  transition: 'transform 0.15s',
                  fontSize: '10px',
                  color: theme.textMuted,
                }}
              >
                ▶
              </span>
              <span
                style={{
                  fontWeight: '600',
                  fontSize: '14px',
                  color: theme.text,
                  flex: 1,
                }}
              >
                {country.label}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  selectAllInCountry(countryId);
                }}
                style={{
                  background: 'transparent',
                  border: `1px solid ${theme.border}`,
                  color: theme.textMuted,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  cursor: 'pointer',
                }}
              >
                Selecteer alle
              </button>
            </div>
            {expandedCountries.includes(countryId) && (
              <div>
                {Object.entries(country.regions).map(([regionId, region]) => (
                  <div key={regionId}>
                    <div
                      onClick={() => toggleRegion(regionId)}
                      style={{
                        padding: '10px 16px 10px 40px',
                        borderBottom: `1px solid ${theme.border}`,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: theme.bgPane,
                        userSelect: 'none',
                      }}
                    >
                      <span
                        style={{
                          transform: expandedRegions.includes(regionId)
                            ? 'rotate(90deg)'
                            : 'rotate(0)',
                          transition: 'transform 0.15s',
                          fontSize: '9px',
                          color: theme.textMuted,
                        }}
                      >
                        ▶
                      </span>
                      <span
                        style={{ fontSize: '13px', color: theme.text, flex: 1 }}
                      >
                        {region.label}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          selectAllInRegion(region.parks);
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: theme.textMuted,
                          padding: '2px 6px',
                          fontSize: '11px',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                      >
                        alle
                      </button>
                    </div>
                    {expandedRegions.includes(regionId) && (
                      <div
                        style={{
                          padding: '8px 16px 8px 56px',
                          borderBottom: `1px solid ${theme.border}`,
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '6px',
                          background: isDark ? '#101112' : '#f8f9fa',
                        }}
                      >
                        {region.parks.map((park) => (
                          <div
                            key={park.id}
                            onClick={() => togglePark(park.id)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              border: `1px solid ${
                                selectedParks.includes(park.id)
                                  ? '#4f8ff7'
                                  : theme.border
                              }`,
                              background: selectedParks.includes(park.id)
                                ? isDark
                                  ? 'rgba(79,143,247,0.15)'
                                  : 'rgba(79,143,247,0.08)'
                                : theme.bgPane,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '12px',
                              color: selectedParks.includes(park.id)
                                ? '#4f8ff7'
                                : theme.text,
                              transition: 'all 0.15s',
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={selectedParks.includes(park.id)}
                              onChange={() => {}}
                              style={{
                                accentColor: '#4f8ff7',
                                width: '12px',
                                height: '12px',
                              }}
                            />
                            {park.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default ParkSelector;
