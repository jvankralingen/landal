import { roles } from '../data/roles';
import type { CountryKey, RoleId } from '../types';

export const ROLE_LABELS: Record<RoleId, string> = Object.fromEntries(
  Object.entries(roles).map(([id, def]) => [id, def.label])
) as Record<RoleId, string>;

export const COUNTRY_LABELS: Record<CountryKey, string> = {
  nederland: 'Nederland',
  belgie: 'België',
  duitsland: 'Duitsland',
  denemarken: 'Denemarken',
  oostenrijk: 'Oostenrijk',
  zwitserland: 'Zwitserland',
  tsjechie: 'Tsjechië',
  engeland: 'Verenigd Koninkrijk',
};
