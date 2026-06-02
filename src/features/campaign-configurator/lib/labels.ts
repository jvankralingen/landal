import type { Contract, Doelgroep, Role, Trim } from '../types';

export const TRIM_LABELS: Record<Trim, string> = {
  eb: 'Employer Branding',
  park: 'Park-campagne',
  regio: 'Regio-campagne',
  rol: 'Rol-campagne',
  contract: 'Contract-campagne',
};

export const TRIM_DESCRIPTIONS: Record<Trim, string> = {
  eb: 'Werken bij Landal · voor iedereen',
  park: '1 park · alle rollen',
  regio: 'Meerdere parken · regio',
  rol: '1 rol · breed inzetbaar',
  contract: 'Vakantiekracht / stage / vast',
};

export const ROLE_LABELS: Record<Role, string> = {
  'horeca-bediening': 'Horeca · Bediening',
  'horeca-keuken': 'Horeca · Keuken',
  'front-office': 'Front Office',
  'fun-entertainment': 'Fun & Entertainment',
  techniek: 'Techniek',
  zwembad: 'Zwembad',
  retail: 'Retail',
  housekeeping: 'Housekeeping',
  parkmanagement: 'Parkmanagement',
  hoofdkantoor: 'Hoofdkantoor',
  overig: 'Overig',
};

export const CONTRACT_LABELS: Record<Contract, string> = {
  stage: 'Stage',
  bijbaan: 'Bijbaan',
  vakantiebaan: 'Vakantiebaan',
  vast: 'Vast',
};

export const DOELGROEP_LABELS: Record<Doelgroep, string> = {
  iedereen: 'Iedereen · alle leeftijden',
  tieners: 'Tieners · 16-19',
  studenten: 'Studenten · 18-25',
  starters: 'Starters · 22-30',
  professionals: 'Professionals · 30+',
  senior: 'Senior · 35+',
};

export const DOELGROEP_TONE: Record<Doelgroep, string> = {
  iedereen: 'gastvrij · samen · veelzijdig',
  tieners: 'speels · chill · sociaal',
  studenten: 'avontuur · sociaal · zomerverhaal',
  starters: 'groei · zelfstandig · ontdekken',
  professionals: 'expertise · impact · loopbaan',
  senior: 'verantwoordelijkheid · vakmanschap · stabiel',
};
