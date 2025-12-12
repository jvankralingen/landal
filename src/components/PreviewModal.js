import React from 'react';
import { BRAND, vibeConfigs } from '../data/constants';
import { getParkImage } from '../data/parkData';
import { PauseIcon, LandalLogo } from './BrandAssets';
import { getEmployeePerks } from '../data/employeePerks';

// Tag component voor highlights
const Tag = ({ children, light }) => (
  <span style={{
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '400',
    background: light ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.1)',
    color: light ? 'white' : 'rgba(0,0,0,0.7)',
    marginRight: '8px',
    marginBottom: '8px',
  }}>
    {children}
  </span>
);

// Compact bullet list voor details
const BulletList = ({ items, max = 4 }) => (
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
          background: BRAND.colors.teal
        }} />
        <span>{item}</span>
      </div>
    ))}
  </div>
);

// Perk item component - met checkmark
const PerkItem = ({ children, light }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: light ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.95)',
    marginBottom: '6px',
  }}>
    <span style={{
      color: light ? BRAND.colors.teal : 'rgba(255,255,255,0.9)',
      fontSize: '14px',
      fontWeight: '600',
    }}>✓</span>
    <span>{children}</span>
  </div>
);

const PreviewModal = ({ showPreview, previewPark, onClose }) => {
  if (!showPreview || !previewPark) return null;

  const content = previewPark.content;
  const vibe = vibeConfigs[content?.vibe] || vibeConfigs.familie;
  const image = getParkImage(content?.vibe, previewPark.regionId, previewPark.countryId, previewPark.id);

  // Haal employee perks op voor dit park + functie
  const employeePerks = getEmployeePerks(
    content?.parkId || previewPark.id,
    content?.vibe || previewPark.vibe,
    content?.functieId || 'horeca'
  );

  // Bepaal of we lichte of donkere tekst nodig hebben op basis van de accent kleur
  const isLightBg = content?.vibe === 'familie'; // Geel heeft donkere tekst nodig
  const heroTextColor = isLightBg ? BRAND.colors.granite : 'white';
  const heroMutedColor = isLightBg ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)';

  // Tags voor in de hero - nu niet meer nodig, vervangen door perks
  const tags = [];
  if (content?.niveau) {
    tags.push(content.niveau);
  }
  if (content?.uren) {
    tags.push(content.uren);
  }

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
      {/* Mobile device frame - kleur past bij vibe */}
      <div style={{
        background: '#1a1a1a',
        borderRadius: '40px',
        padding: '4px',
        boxShadow: '0 25px 80px rgba(0,0,0,0.6)'
      }}>
        {/* Screen */}
        <div style={{
          background: BRAND.colors.sand,
          width: '375px',
          height: '750px',
          borderRadius: '32px',
          overflow: 'hidden',
          fontFamily: BRAND.fonts.body,
        }}>
          <div style={{ height: '100%', overflow: 'auto' }}>

            {/* ===== GEKLEURDE HERO SECTIE ===== */}
            <div style={{
              background: vibe.accent,
              padding: '24px 10px 30px 10px',
              position: 'relative',
            }}>
              {/* Header bar - zwevend wit met huisstijl kleur */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                background: 'white',
                padding: '10px 16px',
                borderRadius: '8px',
              }}>
                <LandalLogo color={BRAND.colors.teal} width={80} height={30} />
                <button onClick={onClose} style={{
                  background: 'transparent',
                  border: 'none',
                  color: BRAND.colors.teal,
                  fontSize: '22px',
                  cursor: 'pointer',
                  padding: '4px',
                  lineHeight: 1,
                }}>
                  ≡
                </button>
              </div>

              {/* Afbeelding - portrait/rechthoekig */}
              <div style={{
                marginBottom: '24px',
                marginLeft: '5px',
                marginRight: '5px',
                paddingTop: '110%',
                position: 'relative',
              }}>
                <img
                  src={image}
                  alt={content.parkName}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                  }}
                />
              </div>

              {/* Park name */}
              <p style={{
                fontSize: '14px',
                color: heroMutedColor,
                margin: '0 5px 8px 5px',
                fontWeight: '400',
                textAlign: 'center',
              }}>
                {content?.parkName}
              </p>

              {/* Function title */}
              <h1 style={{
                fontSize: '28px',
                fontWeight: '400',
                margin: '0 5px 12px 5px',
                fontFamily: BRAND.fonts.headline,
                color: heroTextColor,
                lineHeight: 1.2,
                textAlign: 'center',
              }}>
                {content?.functionTitle || content?.title?.split(' bij ')[0]}
              </h1>

              {/* Intro - tussen functietitel en perks */}
              {(content?.intro || content?.roleDescription) && (
                <p style={{
                  fontSize: '13px',
                  color: heroMutedColor,
                  lineHeight: '1.5',
                  margin: '0 15px 16px 15px',
                  textAlign: 'center',
                }}>
                  {content?.intro || content?.roleDescription}
                </p>
              )}

              {/* Employee Perks */}
              <div style={{
                marginBottom: '20px',
                marginLeft: '15px',
                marginRight: '15px',
                padding: '16px',
                background: isLightBg ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
              }}>
                {employeePerks.highlight && (
                  <p style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: heroMutedColor,
                    margin: '0 0 10px 0',
                    fontWeight: '600',
                  }}>
                    {employeePerks.highlight}
                  </p>
                )}
                {employeePerks.perks.slice(0, 4).map((perk, i) => (
                  <PerkItem key={i} light={isLightBg}>{perk}</PerkItem>
                ))}
              </div>

              {/* Tags - alleen nog uren/niveau */}
              {tags.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}>
                  {tags.slice(0, 4).map((tag, i) => (
                    <Tag key={i} light={!isLightBg}>{tag}</Tag>
                  ))}
                </div>
              )}

              {/* Buitenland indicator */}
              {employeePerks.isBuitenland && (
                <p style={{
                  fontSize: '12px',
                  color: heroMutedColor,
                  textAlign: 'center',
                  margin: '0 15px 8px 15px',
                  fontStyle: 'italic',
                }}>
                  Werken vanuit Nederland op een buitenlandse locatie
                </p>
              )}
            </div>

            {/* ===== CONTENT SECTIE (scrollbaar) ===== */}
            <div style={{
              padding: '24px 15px',
              background: BRAND.colors.sand,
              color: BRAND.colors.granite,
            }}>
              {/* Quick facts */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '12px',
                color: '#6b7280',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(0,0,0,0.08)'
              }}>
                {content?.salarisindicatie && <span>{content.salarisindicatie}</span>}
                {content?.niveau && <span>· {content.niveau}</span>}
                {content?.afdeling && <span>· {content.afdeling}</span>}
              </div>

              {/* Wat je gaat doen */}
              {content?.dailyTasks && (
                <div style={{ marginBottom: '20px' }}>
                  <p style={{
                    fontSize: '11px',
                    color: BRAND.colors.teal,
                    margin: '0 0 8px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: '600'
                  }}>
                    Wat je gaat doen
                  </p>
                  <BulletList items={content.dailyTasks} max={4} />
                </div>
              )}

              {/* Wat zoeken we */}
              {content?.mustHaves && (
                <div style={{ marginBottom: '20px' }}>
                  <p style={{
                    fontSize: '11px',
                    color: BRAND.colors.teal,
                    margin: '0 0 8px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: '600'
                  }}>
                    Wat zoeken we
                  </p>
                  <BulletList items={content.mustHaves} max={4} />
                </div>
              )}

              {/* Wat krijg je */}
              {content?.benefits && (
                <div style={{ marginBottom: '20px' }}>
                  <p style={{
                    fontSize: '11px',
                    color: BRAND.colors.teal,
                    margin: '0 0 8px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: '600'
                  }}>
                    Wat krijg je
                  </p>
                  <BulletList items={content.benefits} max={4} />
                </div>
              )}

              {/* Groei */}
              {content?.nextRoles && content.nextRoles.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <p style={{
                    fontSize: '11px',
                    color: BRAND.colors.teal,
                    margin: '0 0 8px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: '600'
                  }}>
                    Groei naar
                  </p>
                  <p style={{ fontSize: '12px', color: BRAND.colors.granite, margin: 0 }}>
                    {content.nextRoles.slice(0, 3).join(' · ')}
                  </p>
                </div>
              )}

              {/* Footer */}
              <div style={{
                textAlign: 'center',
                paddingTop: '16px',
                marginTop: '12px',
                borderTop: '1px solid rgba(0,0,0,0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LandalLogo color={BRAND.colors.teal} width={60} height={22} />
                </div>
                {content?.aiGenerated && (
                  <p style={{ fontSize: '9px', color: '#d1d5db', marginTop: '4px', marginBottom: 0 }}>
                    AI-gegenereerd
                  </p>
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
