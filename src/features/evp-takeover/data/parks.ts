import { parkDatabase } from '../../../data/parkData';
import type { CountryKey, Vibe, WorldPark } from '../types';

interface RawPark {
  id: string;
  name: string;
  vibe: string;
  tags?: string[];
  employeePerks?: string[];
}

interface RawRegion {
  label: string;
  parks: RawPark[];
}

interface RawCountry {
  label: string;
  regions: Record<string, RawRegion>;
}

const db = parkDatabase as unknown as Record<string, RawCountry>;

export const allWorldParks: WorldPark[] = Object.entries(db).flatMap(
  ([countryKey, country]) =>
    Object.entries(country.regions || {}).flatMap(([regionKey, region]) =>
      (region.parks || []).map<WorldPark>((p) => ({
        id: p.id,
        name: p.name,
        vibe: p.vibe as Vibe,
        tags: p.tags ?? [],
        employeePerks: p.employeePerks ?? [],
        country: countryKey as CountryKey,
        countryLabel: country.label,
        region: regionKey,
        regionLabel: region.label,
      }))
    )
);

export const parkById = new Map<string, WorldPark>(
  allWorldParks.map((p) => [p.id, p])
);
