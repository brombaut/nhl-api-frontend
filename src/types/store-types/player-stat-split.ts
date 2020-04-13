import { NhlApiPlayerStatSplit } from "../nhl-api-types/nhl-api-player-stat-split";

export class PlayerStatSplit {
  stat: object;
  season?: string;

  constructor(nhlApiPlayerStatSplit: NhlApiPlayerStatSplit) {
    this.stat = { ...nhlApiPlayerStatSplit.stat };
    if (nhlApiPlayerStatSplit.season) {
      this.season = nhlApiPlayerStatSplit.season;
    }
  }
}
