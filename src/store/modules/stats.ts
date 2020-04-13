import { TeamStat } from "@/types/store-types/team-stat";
import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { teamsApi } from "@/services/nhl-api-adapter/teams-api";

export interface StatsState {
  teamStats: Array<TeamStat>;
}

@Module({ dynamic: true, store, name: "stats" })
class Stats extends VuexModule implements StatsState {
  private _teamStats: Array<TeamStat> = [];

  public get teamStats(): Array<TeamStat> {
    return this._teamStats;
  }

  public get teamStatsForTeam() {
    return (teamId: number) =>
      this._teamStats.filter(
        (teamStat: TeamStat) => teamStat.teamId === teamId
      );
  }

  @Action
  public async loadStatsForTeam(teamId: number): Promise<void> {
    const teamStats: Array<TeamStat> = await teamsApi.getTeamStats(teamId);
    teamStats.map((teamStat: TeamStat) => this.addTeamStat(teamStat));
  }

  @Mutation
  private addTeamStat(teamStat: TeamStat): void {
    this._teamStats.push(teamStat);
  }
}

export const StatsModule = getModule(Stats);
