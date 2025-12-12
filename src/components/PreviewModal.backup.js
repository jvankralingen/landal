import React from 'react';
import { BRAND, vibeConfigs } from '../data/constants';
import { getParkImage } from '../data/parkData';
import { PauseIcon, LShape } from './BrandAssets';

// Compact bullet list
const BulletList = ({ items, accent, max = 4 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    {items?.slice(0, max).map((item, i) => (
      <div key={i} style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        fontSize: '12px',
        color: BRAND.colors.granite,
        lineHeight: '1.4'
      }}>
        <span style={{
          flexShrink: 0,
          marginTop: '5px',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: accent
        }} />
        <span>{item}</span>
      </div>
    ))}
  </div>
);

const PreviewModal = ({ showPreview, previewPark, onClose }) => {
  if (!showPreview || !previewPark) return null;

  const content = previewPark.content;
  const vibe = vibeConfigs[content?.vibe] || vibeConfigs.familie;
  const image = getParkImage(content?.vibe, previewPark.regionId, previewPark.countryId, previewPark.id);

  const vacancies = content?.vacancies || [];
  const hasActiveVacancies = vacancies.length > 0;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      {/* Mobile device frame */}
      <div style={{
        background: '#1a1a1a',
        borderRadius: '40px',
        padding: '12px',
        boxShadow: '0 25px 80px rgba(0,0,0,0.6)'
      }}>
        {/* Notch */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '28px',
          background: '#1a1a1a',
          borderRadius: '0 0 16px 16px',
          zIndex: 10
        }} />

        {/* Screen */}
        <div style={{
          background: BRAND.colors.sand,
          width: '375px',
          height: '750px',
          borderRadius: '32px',
          overflow: 'hidden',
          fontFamily: BRAND.fonts.body,
          color: BRAND.colors.granite
        }}>
          <div style={{ height: '100%', overflow: 'auto' }}>
            {/* Hero */}
            <div style={{ height: 180, position: 'relative' }}>
              <img src={image} alt={content.parkName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />

              <button onClick={onClose} style={{
                position: 'absolute',
                top: '40px',
                right: '16px',
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                color: BRAND.colors.granite,
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>✕</button>

              <LShape color={BRAND.colors.sand} style={{ bottom: 0, left: 0, width: 50, height: 50, opacity: 1, borderLeftWidth: 25, borderBottomWidth: 25 }} />
            </div>

            <div style={{ padding: '20px' }}>
              {/* ===== BOVEN DE VOUW ===== */}

              {/* Header */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                  <PauseIcon color={BRAND.colors.teal} size={14} />
                  <span style={{ fontFamily: BRAND.fonts.headline, fontSize: 12, color: BRAND.colors.teal }}>landal</span>
                </div>

                <h1 style={{
                  fontSize: '24px',
                  fontWeight: '500',
                  margin: '0 0 2px 0',
                  fontFamily: BRAND.fonts.headline,
                  color: BRAND.colors.granite,
                  lineHeight: 1.1
                }}>
                  {content?.functionTitle || content?.title?.split(' bij ')[0]}
                </h1>
                <p style={{ fontSize: '13px', color: vibe.accent, margin: 0, fontWeight: '600' }}>
                  {content?.parkName}
                </p>
              </div>

              {/* Intro - prominent */}
              <p style={{
                fontSize: '15px',
                color: BRAND.colors.granite,
                lineHeight: '1.6',
                margin: '0 0 16px 0'
              }}>
                {content?.intro}
              </p>

              {/* Quick facts - subtiel inline */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                fontSize: '12px',
                color: '#6b7280',
                marginBottom: '16px',
                paddingBottom: '16px',
                borderBottom: `1px solid ${vibe.accent}20`
              }}>
                {content?.salarisindicatie && <span>{content.salarisindicatie}</span>}
                {content?.niveau && <span>· {content.niveau}</span>}
                {content?.afdeling && <span>· {content.afdeling}</span>}
              </div>

              {/* Vacature CTA - direct zichtbaar als er een is */}
              {hasActiveVacancies && (
                <div style={{ marginBottom: '20px' }}>
                  {vacancies.map((vacancy, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                      borderBottom: index < vacancies.length - 1 ? '1px solid #e5e7eb' : 'none'
                    }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                          <span style={{ fontSize: '13px', fontWeight: '600', color: BRAND.colors.granite }}>
                            {vacancy.type || 'Vacature'}
                          </span>
                        </div>
                        <span style={{ fontSize: '11px', color: '#6b7280' }}>
                          {[vacancy.uren, vacancy.salaris].filter(Boolean).join(' · ')}
                        </span>
                      </div>
                      <button style={{
                        padding: '8px 16px',
                        fontSize: '12px',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        background: BRAND.colors.teal,
                        color: 'white',
                        borderRadius: '6px'
                      }}>
                        Solliciteer
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Geen vacature - compact */}
              {!hasActiveVacancies && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  padding: '12px 0',
                  borderBottom: `1px solid ${vibe.accent}20`
                }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>
                    Geen vacature op dit moment
                  </span>
                  <button style={{
                    padding: '8px 14px',
                    fontSize: '11px',
                    fontWeight: '600',
                    border: `1px solid ${BRAND.colors.teal}`,
                    cursor: 'pointer',
                    background: 'transparent',
                    color: BRAND.colors.teal,
                    borderRadius: '6px'
                  }}>
                    Blijf op de hoogte
                  </button>
                </div>
              )}

              {/* ===== ONDER DE VOUW ===== */}

              {/* Wat doe je */}
              {content?.dailyTasks && (
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '10px', color: vibe.accent, margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
                    Wat je gaat doen
                  </p>
                  <BulletList items={content.dailyTasks} accent={vibe.accent} max={4} />
                </div>
              )}

              {/* Wat zoeken we */}
              {content?.mustHaves && (
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '10px', color: vibe.accent, margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
                    Wat zoeken we
                  </p>
                  <BulletList items={content.mustHaves} accent={vibe.accent} max={4} />
                </div>
              )}

              {/* Wat krijg je */}
              {content?.benefits && (
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '10px', color: vibe.accent, margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
                    Wat krijg je
                  </p>
                  <BulletList items={content.benefits} accent={vibe.accent} max={4} />
                </div>
              )}

              {/* Groei */}
              {content?.nextRoles && content.nextRoles.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '10px', color: vibe.accent, margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
                    Groei naar
                  </p>
                  <p style={{ fontSize: '12px', color: BRAND.colors.granite, margin: 0 }}>
                    {content.nextRoles.slice(0, 3).join(' · ')}
                  </p>
                </div>
              )}

              {/* Park highlights */}
              {content?.highlights && content.highlights.length > 0 && (
                <div style={{
                  background: `${vibe.accent}06`,
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '16px'
                }}>
                  <p style={{ fontSize: '10px', color: vibe.accent, margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
                    {content?.parkName}
                  </p>
                  <p style={{ fontSize: '12px', color: BRAND.colors.granite, margin: 0, lineHeight: '1.5' }}>
                    {content.highlights.slice(0, 4).join(' · ')}
                  </p>
                </div>
              )}

              {/* Footer */}
              <div style={{ textAlign: 'center', paddingTop: '12px', marginTop: '8px', borderTop: `1px solid ${vibe.accent}15` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <PauseIcon color={BRAND.colors.teal} size={12} />
                  <span style={{ fontFamily: BRAND.fonts.headline, fontSize: 11, color: BRAND.colors.teal }}>landal greenparks</span>
                </div>
                {content?.aiGenerated && (
                  <p style={{ fontSize: '9px', color: '#d1d5db', marginTop: '4px', marginBottom: 0 }}>AI-gegenereerd</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
