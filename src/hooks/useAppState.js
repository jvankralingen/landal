import { useState, useMemo, useCallback } from 'react';
import { functiefamilies } from '../data/jobProfiles';
import { parkDatabase, getAllParks } from '../data/parkData';
import { generateLocalization } from '../utils/localization';
import { generateAIContentBatch, isAIAvailable } from '../services/aiContentService';
import { getTheme } from '../theme';

export const useAppState = () => {
  const [isDark, setIsDark] = useState(false);
  const [selectedFunctie, setSelectedFunctie] = useState(functiefamilies[0]);
  const [beschrijving, setBeschrijving] = useState(functiefamilies[0].description);
  const [selectedParks, setSelectedParks] = useState([]);
  const [generatedContent, setGeneratedContent] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0, parkName: '', status: '', subProgress: 0 });
  const [useAI, setUseAI] = useState(isAIAvailable());
  const [activeTab, setActiveTab] = useState('content');
  const [showPreview, setShowPreview] = useState(false);
  const [previewPark, setPreviewPark] = useState(null);
  const [expandedCountries, setExpandedCountries] = useState(['nederland']);
  const [expandedRegions, setExpandedRegions] = useState(['gelderland', 'drenthe']);
  const [parkSearch, setParkSearch] = useState('');
  const [parkFilter, setParkFilter] = useState('all');

  const allParks = useMemo(() => getAllParks(), []);
  const totalParkCount = allParks.length;
  const theme = useMemo(() => getTheme(isDark), [isDark]);

  const toggleTheme = useCallback(() => setIsDark((prev) => !prev), []);

  const handleGenerate = useCallback(async () => {
    if (selectedParks.length === 0) return;

    setIsGenerating(true);
    setGenerationProgress({ current: 0, total: selectedParks.length, parkName: '', status: '', subProgress: 0 });

    const parksToGenerate = selectedParks
      .map((parkId) => allParks.find((p) => p.id === parkId))
      .filter(Boolean);

    if (useAI && isAIAvailable()) {
      // AI-gebaseerde generatie
      try {
        await generateAIContentBatch(
          selectedFunctie,
          parksToGenerate,
          (current, total, parkName, status, subProgress) => {
            setGenerationProgress({ current, total, parkName, status: status || '', subProgress: subProgress || 0 });
          },
          (parkId, content) => {
            // Update UI direct zodra een park klaar is
            setGeneratedContent((prev) => ({ ...prev, [parkId]: content }));
          },
          beschrijving
        );
      } catch (error) {
        console.error('AI generation failed:', error);
        // Fallback naar template-gebaseerde generatie
        const newContent = { ...generatedContent };
        parksToGenerate.forEach((park) => {
          newContent[park.id] = generateLocalization(selectedFunctie, park, beschrijving);
        });
        setGeneratedContent(newContent);
      }
    } else {
      // Template-gebaseerde generatie (originele methode)
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newContent = { ...generatedContent };
      parksToGenerate.forEach((park, index) => {
        newContent[park.id] = generateLocalization(selectedFunctie, park, beschrijving);
        setGenerationProgress({ current: index + 1, total: parksToGenerate.length, parkName: park.name, status: 'Verwerkt' });
      });
      setGeneratedContent(newContent);
    }

    setIsGenerating(false);
    setGenerationProgress({ current: 0, total: 0, parkName: '', status: '', subProgress: 0 });
  }, [selectedParks, generatedContent, allParks, selectedFunctie, beschrijving, useAI]);

  const handleFunctieSelect = useCallback((functie) => {
    setSelectedFunctie(functie);
    setBeschrijving(functie.description);
    setGeneratedContent({});
    setSelectedParks([]);
  }, []);

  const toggleCountry = useCallback(
    (id) =>
      setExpandedCountries((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      ),
    []
  );

  const toggleRegion = useCallback(
    (id) =>
      setExpandedRegions((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      ),
    []
  );

  const togglePark = useCallback(
    (id) =>
      setSelectedParks((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      ),
    []
  );

  const selectAllInRegion = useCallback((regionParks) => {
    const ids = regionParks.map((p) => p.id);
    setSelectedParks((prev) => {
      const all = ids.every((id) => prev.includes(id));
      return all
        ? prev.filter((id) => !ids.includes(id))
        : [...new Set([...prev, ...ids])];
    });
  }, []);

  const selectAllInCountry = useCallback((countryId) => {
    const ids = [];
    Object.values(parkDatabase[countryId].regions).forEach((r) =>
      r.parks.forEach((p) => ids.push(p.id))
    );
    setSelectedParks((prev) => {
      const all = ids.every((id) => prev.includes(id));
      return all
        ? prev.filter((id) => !ids.includes(id))
        : [...new Set([...prev, ...ids])];
    });
  }, []);

  const getFilteredParks = useCallback(() => {
    let filtered = allParks;
    if (parkSearch) {
      const s = parkSearch.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.countryLabel.toLowerCase().includes(s)
      );
    }
    if (parkFilter === 'selected') {
      filtered = filtered.filter((p) => selectedParks.includes(p.id));
    } else if (parkFilter !== 'all') {
      filtered = filtered.filter((p) => p.vibe === parkFilter);
    }
    return filtered;
  }, [allParks, parkSearch, parkFilter, selectedParks]);

  const openPreview = useCallback(
    (parkId) => {
      const park = allParks.find((p) => p.id === parkId);
      const content =
        generatedContent[parkId] || generateLocalization(selectedFunctie, park, beschrijving);
      setPreviewPark({ ...park, content });
      setShowPreview(true);
    },
    [allParks, generatedContent, selectedFunctie, beschrijving]
  );

  const closePreview = useCallback(() => setShowPreview(false), []);

  const removeGeneratedContent = useCallback((parkId) => {
    setGeneratedContent((prev) => {
      const newContent = { ...prev };
      delete newContent[parkId];
      return newContent;
    });
  }, []);

  const clearAllGeneratedContent = useCallback(() => {
    setGeneratedContent({});
  }, []);

  return {
    // Theme
    isDark,
    theme,
    toggleTheme,

    // Tabs
    activeTab,
    setActiveTab,

    // Function selection
    selectedFunctie,
    beschrijving,
    setBeschrijving,
    handleFunctieSelect,

    // Park selection
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
    allParks,
    totalParkCount,

    // Generation
    generatedContent,
    isGenerating,
    generationProgress,
    handleGenerate,
    useAI,
    setUseAI,
    aiAvailable: isAIAvailable(),

    // Preview
    showPreview,
    previewPark,
    openPreview,
    closePreview,

    // Remove content
    removeGeneratedContent,
    clearAllGeneratedContent,
  };
};
