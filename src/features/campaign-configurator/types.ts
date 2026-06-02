export type Trim = 'eb' | 'park' | 'regio' | 'rol' | 'contract';

export type Contract = 'stage' | 'bijbaan' | 'vakantiebaan' | 'vast';

export type Role =
  | 'horeca-bediening'
  | 'horeca-keuken'
  | 'front-office'
  | 'fun-entertainment'
  | 'techniek'
  | 'zwembad'
  | 'retail'
  | 'housekeeping'
  | 'parkmanagement'
  | 'hoofdkantoor'
  | 'overig';

export type Doelgroep =
  | 'iedereen'
  | 'tieners'
  | 'studenten'
  | 'starters'
  | 'professionals'
  | 'senior';

export interface Vacancy {
  kind: 'vacancy';
  url: string;
  lastmod: string;
  country: string;
  slug: string;
  jobId: string;
  role: Role;
  contract: Contract;
  title: string | null;
  park: string | null;
  parkId: string | null;
  locality: string | null;
  region: string | null;
  street: string | null;
  postalCode: string | null;
  addressCountry: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryUnit: string | null;
  datePosted: string | null;
  descriptionSnippet: string | null;
}

export interface InventoryRow {
  Provincie: string | null;
  Park: string | null;
  Afdeling: string | null;
  Subafdeling: string | null;
  Aantal: string | null;
  Dienstverband: string | null;
}

export interface CampaignState {
  trim: Trim;
  regions: string[];
  roles: Role[];
  contracts: Contract[];
  parks: string[];
  worlds: string[];
  doelgroep: Doelgroep;
  energie: number;
  premium: number;
  heroOverride: string | null;
  subOverride: string | null;
}
