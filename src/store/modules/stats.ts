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
import { TeamStatSplit } from "@/types/store-types/team-stat-split";
import { TeamStatSplitEntity } from "@/types/store-types/team-stat-split-entity";

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

  public get teamStatSplitsForType(): (
    teamId: number,
    statType: string
  ) => TeamStatSplitEntity {
    return (teamId: number, statType: string) => {
      const teamStats: Array<TeamStat> = this.statsForTeam(teamId);
      const teamStatsForType = teamStats.find(
        (teamStat: TeamStat) => teamStat.type === statType
      );
      if (!teamStatsForType) {
        return {};
      }
      let statSplits: TeamStatSplitEntity = {};
      teamStatsForType.splits.forEach((split: TeamStatSplit) => {
        statSplits = { ...statSplits, ...split.stat };
      });
      return statSplits;
    };
  }

  public get singleSeasonStatsForTeam(): (
    teamId: number
  ) => TeamStatSplitEntity {
    return (teamId: number) => {
      return this.teamStatSplitsForType(teamId, "statsSingleSeason");
    };
  }

  public get regularSeasonRankingStatsForTeam(): (
    teamId: number
  ) => TeamStatSplitEntity {
    return (teamId: number) => {
      return this.teamStatSplitsForType(teamId, "regularSeasonStatRankings");
    };
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
  public loadStatsForPlayer(playerId: number): void {
    playersApi
      .getPlayerStats(playerId, "statsSingleSeason")
      .then((playerStats: Array<PlayerStat>) => {
        playerStats.map((playerStat: PlayerStat) =>
          this.addPlayerStat(playerStat)
        );
      });
    playersApi
      .getPlayerStats(playerId, "regularSeasonStatRankings")
      .then((playerStats: Array<PlayerStat>) => {
        playerStats.map((playerStat: PlayerStat) =>
          this.addPlayerStat(playerStat)
        );
      });
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
