export interface EmployeePerksResult {
  perks: string[];
  highlight: string | null;
  isBuitenland: boolean;
  roleTagline: string;
}

export interface RolePerk {
  tagline: string;
  perks: string[];
}

export interface ParkSpecificPerk {
  perks: string[];
  highlight: string;
  buitenland?: boolean;
}

export const rolePerks: Record<string, RolePerk>;
export const parkLifePerks: string[];
export const parkSpecificPerks: Record<string, ParkSpecificPerk>;
export function getEmployeePerks(
  parkId: string,
  vibe: string,
  functieId: string
): EmployeePerksResult;
