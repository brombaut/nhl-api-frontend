import { NhlApiPlayerStatSplit } from "../nhl-api-types/nhl-api-player-stat-split";
import { MyMap } from "../data-types/map";

export class PlayerStatSplit {
  stat: MyMap<string | number>;
  season?: string;

  constructor(nhlApiPlayerStatSplit: NhlApiPlayerStatSplit) {
    this.stat = { ...nhlApiPlayerStatSplit.stat };
    if (nhlApiPlayerStatSplit.season) {
      this.season = nhlApiPlayerStatSplit.season;
    }
  }
}
