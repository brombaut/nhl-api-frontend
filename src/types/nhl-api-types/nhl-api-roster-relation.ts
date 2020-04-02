import { NhlApiPersonLink } from './nhl-api-person-link';

export interface NhlApiRosterRelation {
  person: NhlApiPersonLink;
  position: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  }
  jerseyNumber: string;
}
