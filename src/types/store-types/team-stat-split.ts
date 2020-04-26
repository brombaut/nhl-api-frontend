import { NhlApiTeamStatSplit } from "../nhl-api-types/nhl-api-team-stat-split";
import { TeamStatSplitEntity } from "./team-stat-split-entity";

export class TeamStatSplit {
  private _stat: TeamStatSplitEntity;
  private _teamId: number;

  constructor(nhlApiTeamStatSplit: NhlApiTeamStatSplit) {
    this._stat = { ...nhlApiTeamStatSplit.stat };
    this._teamId = nhlApiTeamStatSplit.team.id;
  }

  get teamId() {
    return this._teamId;
  }

  get stat() {
    return this._stat;
  }
}
