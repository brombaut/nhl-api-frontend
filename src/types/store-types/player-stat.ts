import { NhlApiPlayerStat } from "../nhl-api-types/nhl-api-stat";
import { PlayerStatSplit } from "./player-stat-split";

export class PlayerStat {
  type: string;
  playerId: number;
  splits: Array<PlayerStatSplit>;

  constructor(playerId: number, nhlApiPlayerStat: NhlApiPlayerStat) {
    this.playerId = playerId;
    this.type = nhlApiPlayerStat.type.displayName;
    this.splits = nhlApiPlayerStat.splits.map(
      split => new PlayerStatSplit(split)
    );
  }
}
