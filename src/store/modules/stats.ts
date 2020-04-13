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
import { PlayerStat } from "@/types/store-types/player-stat";
import { playersApi } from "@/services/nhl-api-adapter/players-api";

export interface StatsState {
  teamsStats: Array<TeamStat>;
  playersStats: Array<PlayerStat>;
}

@Module({ dynamic: true, store, name: "stats" })
class Stats extends VuexModule implements StatsState {
  private _teamsStats: Array<TeamStat> = [];
  private _playersStats: Array<PlayerStat> = [];

  public get teamsStats(): Array<TeamStat> {
    return this._teamsStats;
  }

  public get playersStats(): Array<PlayerStat> {
    return this._playersStats;
  }

  public get statsForTeam() {
    return (teamId: number) =>
      this._teamsStats.filter(
        (teamStat: TeamStat) => teamStat.teamId === teamId
      );
  }

  public get statsForPlayer() {
    return (playerId: number) =>
      this._playersStats.filter(
        (playerStat: PlayerStat) => playerStat.playerId === playerId
      );
  }

  @Action
  public async loadStatsForTeam(teamId: number): Promise<void> {
    const teamStats: Array<TeamStat> = await teamsApi.getTeamStats(teamId);
    teamStats.map((teamStat: TeamStat) => this.addTeamStat(teamStat));
  }

  @Action
  public async loadStatsForPlayer(playerId: number): Promise<void> {
    const playerStats: Array<PlayerStat> = await playersApi.getPlayerStats(
      playerId,
      "statsSingleSeason"
    );
    // TODO: Also load in regularSeasonStatRankings async
    playerStats.map((playerStat: PlayerStat) => this.addPlayerStat(playerStat));
  }

  @Mutation
  private addTeamStat(teamStat: TeamStat): void {
    this._teamsStats.push(teamStat);
  }

  @Mutation
  private addPlayerStat(playerStat: PlayerStat): void {
    this._playersStats.push(playerStat);
  }
}

export const StatsModule = getModule(Stats);
