import { NhlApiConference } from '../nhl-api-types/nhl-api-conference';

export class Conference {
  id: number;
  name: string;
  link: string;
  abbreviation: string;
  shortName: string;
  active: boolean;

  constructor(nhlApiConference: NhlApiConference) {
    this.id = nhlApiConference.id;
    this.name = nhlApiConference.name;
    this.link = nhlApiConference.link;
    this.abbreviation = nhlApiConference.abbreviation;
    this.shortName = nhlApiConference.shortName;
    this.active = nhlApiConference.active;
  }
}