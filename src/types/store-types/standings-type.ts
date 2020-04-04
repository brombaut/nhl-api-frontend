import { NhlApiStandingsType } from "../nhl-api-types/nhl-api-standings-type";

export class StandingsType {
  name: string;
  description: string;

  constructor(nhlApiStandingsType: NhlApiStandingsType) {
    this.name = nhlApiStandingsType.name;
    this.description = nhlApiStandingsType.description;
  }
}
