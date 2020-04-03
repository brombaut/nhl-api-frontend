import { RosterRelation } from './roster-relation';
import { NhlApiRosterRelation } from '../nhl-api-types/nhl-api-roster-relation';

export class Roster {
  teamId: number;
  rosterRelations: Array<RosterRelation>;

  constructor(teamId: number, nhlApiRosterRelations: Array<NhlApiRosterRelation>) {
    this.teamId = teamId;
    this.rosterRelations = nhlApiRosterRelations.map((nhlApiRR: NhlApiRosterRelation) => new RosterRelation(nhlApiRR));
  }
}