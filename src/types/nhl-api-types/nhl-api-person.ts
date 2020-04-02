import { NhlApiTeamLink } from './nhl-api-team-link';

export interface NhlApiPerson {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  primaryNumber: string;
  birthDate: string;
  currentAge: string;
  birthCity: string;
  birthStateProvince: string;
  birthCountry: string;
  nationality: string;
  height: string;
  weight: number;
  active: boolean;
  alternateCaptain: boolean;
  captain: boolean;
  rookie: boolean;
  shootsCatches: string;
  currentTeam: NhlApiTeamLink;
  primaryPosition: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  }
}
