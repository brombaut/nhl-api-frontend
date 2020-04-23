import { PositionAbbreviation } from "../scraper-types/position-abbreviation";

export class LineCombination {
  playerId: number;
  teamId: number;
  position: PositionAbbreviation;

  constructor(
    playerId: number,
    teamId: number,
    position: PositionAbbreviation
  ) {
    this.playerId = playerId;
    this.teamId = teamId;
    this.position = position;
  }
}
