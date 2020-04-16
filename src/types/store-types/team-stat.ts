import { NhlApiTeamStat } from "../nhl-api-types/nhl-api-stat";
import { TeamStatSplit } from "./team-stat-split";

export class TeamStat {
  private _type: string;
  private _teamId: number;
  private _splits: Array<TeamStatSplit>;

  constructor(teamId: number, nhlApiTeamStat: NhlApiTeamStat) {
    this._teamId = teamId;
    this._type = nhlApiTeamStat.type.displayName;
    this._splits = nhlApiTeamStat.splits.map(split => new TeamStatSplit(split));
  }

  get type() {
    return this._type;
  }

  get teamId() {
    return this._teamId;
  }

  get splits() {
    return this._splits;
  }

  get stats() {
    if (this._splits.length === 0) {
      return {};
    }
    return this._splits[0].stat;
  }
}
