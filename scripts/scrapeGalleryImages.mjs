/**
 * Scraper voor Landal park galerij afbeeldingen
 *
 * Dit script haalt de 3 card-gallery afbeeldingen op van elke parkpagina
 * en genereert een JavaScript object dat je kunt toevoegen aan parkImageUrls.js
 *
 * Gebruik: node scripts/scrapeGalleryImages.mjs
 */

import { parkPageUrls } from '../src/data/parkImageUrls.js';

// Regex om afbeelding content IDs uit de card-gallery items te halen
// De items hebben een "image" veld: "image":"https://mss-p-014-delivery.stylelabs.cloud/api/public/content/8519462-3x2?t=w600"
const GALLERY_SECTION_REGEX = /"card-gallery"\s*:\s*\{[\s\S]*?"items"\s*:\s*\[([\s\S]*?)\]\s*\}/;
const IMAGE_URL_REGEX = /\/content\/(\d+)-\d+x\d+/g;

// Rate limiting - wacht tussen requests om de server niet te overbelasten
const DELAY_MS = 300;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchParkPage(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error(`  Fout bij ophalen: ${error.message}`);
    return null;
  }
}

function extractGalleryImageIds(html) {
  const imageIds = [];

  // Zoek de card-gallery sectie - de items array bevat objecten met "image" URLs
  // De structuur is: "card-gallery":{"responsivePrefix":"...","items":[{"image":"URL",...},{"image":"URL",...}]}
  const galleryStart = html.indexOf('"card-gallery"');
  if (galleryStart === -1) return imageIds;

  // Zoek het einde van de card-gallery object (vind de bijbehorende sluit-accolade)
  let depth = 0;
  let inGallery = false;
  let galleryEnd = galleryStart;

  for (let i = galleryStart; i < html.length && i < galleryStart + 10000; i++) {
    if (html[i] === '{') {
      depth++;
      inGallery = true;
    } else if (html[i] === '}') {
      depth--;
      if (inGallery && depth === 0) {
        galleryEnd = i + 1;
        break;
      }
    }
  }

  const gallerySection = html.slice(galleryStart, galleryEnd);

  // Zoek alle "image":"URL" patterns in de gallery sectie
  const imageMatches = gallerySection.matchAll(/"image"\s*:\s*"([^"]+)"/g);
  for (const match of imageMatches) {
    const url = match[1];
    // Extract content ID uit URL: .../content/8519462-3x2?t=w600
    const idMatch = url.match(/\/content\/(\d+)-/);
    if (idMatch && !imageIds.includes(idMatch[1])) {
      imageIds.push(idMatch[1]);
    }
  }

  // Retourneer max 3 unieke IDs
  return imageIds.slice(0, 3);
}

async function scrapeAllParks() {
  const results = {};
  const parkIds = Object.keys(parkPageUrls);
  const total = parkIds.length;

  console.log(`\nStart scraping van ${total} parken...\n`);

  for (let i = 0; i < parkIds.length; i++) {
    const parkId = parkIds[i];
    const url = parkPageUrls[parkId];

    // Skip URLs die geen standaard parkpagina zijn
    if (!url.includes('landal.nl/parken/')) {
      console.log(`[${i + 1}/${total}] ${parkId}: Overgeslagen (geen standaard URL)`);
      results[parkId] = [];
      continue;
    }

    console.log(`[${i + 1}/${total}] ${parkId}: Ophalen...`);

    const html = await fetchParkPage(url);

    if (html) {
      const imageIds = extractGalleryImageIds(html);
      results[parkId] = imageIds;
      console.log(`  ✓ ${imageIds.length} afbeeldingen gevonden: ${imageIds.join(', ')}`);
    } else {
      results[parkId] = [];
      console.log(`  ✗ Geen afbeeldingen gevonden`);
    }

    // Rate limiting
    if (i < parkIds.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  return results;
}

function generateOutput(results) {
  const lines = ['// Galerij afbeeldingen per park (content IDs)', 'export const parkGalleryImages = {'];

  for (const [parkId, imageIds] of Object.entries(results)) {
    if (imageIds.length > 0) {
      const idsStr = imageIds.map(id => `'${id}'`).join(', ');
      lines.push(`  ${parkId}: [${idsStr}],`);
    }
  }

  lines.push('};');
  lines.push('');
  lines.push('// Helper functie om volledige URLs te genereren');
  lines.push("// Formaten: '3x2', '4x5', '16x9', '1x1'");
  lines.push("// Breedtes: 400, 600, 800, 1024, 1280, 1920");
  lines.push("export const getGalleryImageUrl = (contentId, format = '3x2', width = 800) => {");
  lines.push('  return `https://mss-p-014-delivery.stylelabs.cloud/api/public/content/${contentId}-${format}?t=w${width}`;');
  lines.push('};');

  return lines.join('\n');
}

async function main() {
  console.log('='.repeat(60));
  console.log('Landal Park Galerij Afbeeldingen Scraper');
  console.log('='.repeat(60));

  const results = await scrapeAllParks();

  const parksWithImages = Object.values(results).filter(ids => ids.length > 0).length;
  const totalImages = Object.values(results).reduce((sum, ids) => sum + ids.length, 0);

  console.log('\n' + '='.repeat(60));
  console.log('Resultaten:');
  console.log(`  Parken met afbeeldingen: ${parksWithImages}`);
  console.log(`  Totaal aantal afbeeldingen: ${totalImages}`);
  console.log('='.repeat(60));

  const output = generateOutput(results);

  console.log('\n--- OUTPUT (kopieer naar parkImageUrls.js) ---\n');
  console.log(output);
  console.log('\n--- EINDE OUTPUT ---');
}

main().catch(console.error);
