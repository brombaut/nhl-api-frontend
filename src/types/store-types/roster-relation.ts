import { NhlApiRosterRelation } from "../nhl-api-types/nhl-api-roster-relation";

export class RosterRelation {
  personId: number;
  position: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };
  jerseyNumber: string;

  constructor(nhlApiRosterRelation: NhlApiRosterRelation) {
    this.personId = nhlApiRosterRelation.person.id;
    this.position = nhlApiRosterRelation.position;
    this.jerseyNumber = nhlApiRosterRelation.jerseyNumber;
  }
}
