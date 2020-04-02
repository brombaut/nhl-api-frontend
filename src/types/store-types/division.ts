import { NhlApiDivision } from '../nhl-api-types/nhl-api-division';

export class Division {
  id: number;
  name: string;
  nameShort: string;
  link: string;
  abbreviation: string;
  conferenceId: number;
  active: boolean;

  constructor(nhlApiDivision: NhlApiDivision) {
    this.id = nhlApiDivision.id;
    this.name = nhlApiDivision.name;
    this.nameShort = nhlApiDivision.nameShort;
    this.link = nhlApiDivision.link;
    this.abbreviation = nhlApiDivision.abbreviation;
    this.conferenceId = nhlApiDivision.conference.id;
    this.active = nhlApiDivision.active;
  }
}