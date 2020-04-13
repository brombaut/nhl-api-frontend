import { NhlApiTeamStat } from "../nhl-api-types/nhl-api-team-stat";
import { TeamStatSplit } from "./team-stat-split";

export class TeamStat {
  type: string;
  teamId: number;
  splits: Array<TeamStatSplit>;

  constructor(teamId: number, nhlApiTeamStat: NhlApiTeamStat) {
    this.teamId = teamId;
    this.type = nhlApiTeamStat.type.displayName;
    this.splits = nhlApiTeamStat.splits.map(split => new TeamStatSplit(split));
  }
}
