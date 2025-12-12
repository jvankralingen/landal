import React, { useState, useEffect } from 'react';
import { useAppState } from './hooks/useAppState';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FunctionList from './components/FunctionList';
import EditorHeader from './components/EditorHeader';
import BasicInfoForm from './components/BasicInfoForm';
import LocalizationGenerator from './components/LocalizationGenerator';
import GeneratedPanel from './components/GeneratedPanel';
import PreviewModal from './components/PreviewModal';
import PasswordGate from './components/PasswordGate';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('landal_auth') === 'true'
  );
  const {
    isDark,
    theme,
    toggleTheme,
    activeTab,
    setActiveTab,
    selectedFunctie,
    beschrijving,
    setBeschrijving,
    handleFunctieSelect,
    selectedParks,
    parkSearch,
    setParkSearch,
    parkFilter,
    setParkFilter,
    expandedCountries,
    expandedRegions,
    toggleCountry,
    toggleRegion,
    togglePark,
    selectAllInCountry,
    selectAllInRegion,
    getFilteredParks,
    totalParkCount,
    generatedContent,
    isGenerating,
    generationProgress,
    handleGenerate,
    useAI,
    setUseAI,
    aiAvailable,
    showPreview,
    previewPark,
    openPreview,
    closePreview,
    removeGeneratedContent,
    clearAllGeneratedContent,
  } = useAppState();

  if (!isAuthenticated) {
    return <PasswordGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.bg,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: theme.text,
        transition: 'background 0.3s, color 0.3s',
      }}
    >
      <Navbar
        theme={theme}
        isDark={isDark}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleTheme={toggleTheme}
      />

      <div style={{ display: 'flex', height: 'calc(100vh - 49px)' }}>
        <Sidebar
          theme={theme}
          isDark={isDark}
          generatedContent={generatedContent}
          totalParkCount={totalParkCount}
        />

        <FunctionList
          theme={theme}
          isDark={isDark}
          selectedFunctie={selectedFunctie}
          generatedContent={generatedContent}
          onFunctieSelect={handleFunctieSelect}
        />

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <EditorHeader
            theme={theme}
            isDark={isDark}
            selectedFunctie={selectedFunctie}
            generatedContent={generatedContent}
          />

          <div
            style={{
              flex: 1,
              overflow: 'auto',
              padding: '24px',
              background: theme.bg,
            }}
          >
            <div style={{ maxWidth: '900px' }}>
              <BasicInfoForm
                theme={theme}
                isDark={isDark}
                selectedFunctie={selectedFunctie}
                beschrijving={beschrijving}
                onBeschrijvingChange={setBeschrijving}
              />

              <div
                style={{
                  background: theme.bgPane,
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '16px 20px',
                    borderBottom: `1px solid ${theme.border}`,
                    background: isDark ? '#1e2023' : '#f9fafb',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          margin: 0,
                          color: theme.text,
                        }}
                      >
                        Park Lokalisaties
                      </h2>
                      <p
                        style={{
                          fontSize: '12px',
                          color: theme.textMuted,
                          margin: '4px 0 0 0',
                        }}
                      >
                        Genereer unieke content per park afgestemd op de lokale
                        sfeer
                      </p>
                    </div>
                    <div style={{ fontSize: '12px', color: theme.textMuted }}>
                      {selectedParks.length} van {totalParkCount}+ geselecteerd
                    </div>
                  </div>
                </div>

                <LocalizationGenerator
                  theme={theme}
                  isDark={isDark}
                  selectedParks={selectedParks}
                  totalParkCount={totalParkCount}
                  isGenerating={isGenerating}
                  generationProgress={generationProgress}
                  onGenerate={handleGenerate}
                  parkSearch={parkSearch}
                  onParkSearchChange={setParkSearch}
                  parkFilter={parkFilter}
                  onParkFilterChange={setParkFilter}
                  togglePark={togglePark}
                  toggleCountry={toggleCountry}
                  toggleRegion={toggleRegion}
                  selectAllInCountry={selectAllInCountry}
                  selectAllInRegion={selectAllInRegion}
                  expandedCountries={expandedCountries}
                  expandedRegions={expandedRegions}
                  getFilteredParks={getFilteredParks}
                  useAI={useAI}
                  onUseAIChange={setUseAI}
                  aiAvailable={aiAvailable}
                />
              </div>
            </div>
          </div>
        </div>

        <GeneratedPanel
          theme={theme}
          isDark={isDark}
          generatedContent={generatedContent}
          onPreview={openPreview}
          onRemove={removeGeneratedContent}
          onClearAll={clearAllGeneratedContent}
        />
      </div>

      <PreviewModal
        showPreview={showPreview}
        previewPark={previewPark}
        onClose={closePreview}
      />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Nunito:wght@400;700&family=Merriweather:wght@400;700&family=Hatton:wght@500;700&family=Inter:wght@400;500;600&display=swap');
        html, body { margin: 0; padding: 0; background: ${theme.bg}; }
      `}</style>
    </div>
  );
}
