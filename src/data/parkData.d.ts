export interface ParkDbPark {
  id: string;
  name: string;
  vibe: string;
  tags?: string[];
  employeePerks?: string[];
}

export interface ParkDbRegion {
  label: string;
  parks: ParkDbPark[];
}

export interface ParkDbCountry {
  label: string;
  regions: Record<string, ParkDbRegion>;
}

export const parkDatabase: Record<string, ParkDbCountry>;
