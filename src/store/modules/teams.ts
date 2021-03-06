import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { teamsApi } from "@/services/nhl-api-adapter/teams-api";
import { Team, NullTeam } from "@/types/store-types/team";
import { RostersModule } from "./rosters";
import { StatsModule } from "./stats";
import { PlayersModule } from "./players";

export interface TeamsState {
  teams: Array<Team>;
  selectedTeamId: number;
  myTeamId: number;
}

@Module({ dynamic: true, store, name: "teams" })
class Teams extends VuexModule implements TeamsState {
  private _teams: Array<Team> = [];
  private _selectedTeamId = 0;
  private _myTeamId = 0;

  public get teams(): Array<Team> {
    return this._teams;
  }

  public get selectedTeamId(): number {
    return this._selectedTeamId;
  }

  public get myTeamId(): number {
    return this._myTeamId;
  }

  public get selectedTeam(): Team {
    return (
      this._teams.find((team: Team) => team.id === this._selectedTeamId) ||
      new NullTeam()
    );
  }

  public get teamById(): (id: number) => Team {
    return (id: number) =>
      this._teams.find((team: Team) => team.id === id) || new NullTeam();
  }

  public get teamByAbbreviation(): (abbv: string) => Team {
    return (abbv: string) =>
      this._teams.find((team: Team) => team.abbreviation === abbv) ||
      new NullTeam();
  }

  public get teamsSortedByName(): Array<Team> {
    return this._teams.sort((teamA: Team, teamB: Team) => {
      if (teamA.name > teamB.name) {
        return 1;
      }
      return -1;
    });
  }

  @Action
  public async loadTeams(): Promise<void> {
    const teams = await teamsApi.getTeams();
    this.setTeams(teams);
    if (this.teamsSortedByName.length > 0) {
      const localStorageMyTeamId = Number(
        window.localStorage.getItem("myTeamId")
      );
      const localStorageTeamId = Number(
        window.localStorage.getItem("selectedTeamId")
      );
      if (localStorageMyTeamId) {
        this.selectTeamById(localStorageMyTeamId);
        this.selectMyTeamId(localStorageMyTeamId);
      } else if (localStorageTeamId) {
        this.selectTeamById(localStorageTeamId);
      } else {
        const firstTeamId: number = this.teamsSortedByName[0].id;
        this.selectTeamById(firstTeamId);
      }
    }
    teams.map((team: Team) => StatsModule.loadStatsForTeam(team.id));
  }

  @Action
  public selectTeamById(teamId: number): void {
    if (teamId === this.selectedTeamId) {
      return;
    }
    PlayersModule.selectPlayerById(0);
    this.setSelectedTeamId(teamId);
    window.localStorage.setItem("selectedTeamId", teamId.toString());
    if (RostersModule.teamRoster(teamId).length === 0) {
      RostersModule.loadTeamRoster(teamId);
    }
    if (StatsModule.statsForTeam(teamId).length === 0) {
      StatsModule.loadStatsForTeam(teamId);
    }
  }

  @Action
  public selectMyTeamId(teamId: number): void {
    window.localStorage.setItem("myTeamId", teamId.toString());
    this.setMyTeamId(teamId);
  }

  @Mutation
  private setTeams(teams: Array<Team>): void {
    this._teams = teams;
  }

  @Mutation
  private setSelectedTeamId(teamId: number): void {
    this._selectedTeamId = teamId;
  }

  @Mutation
  private setMyTeamId(teamId: number): void {
    this._myTeamId = teamId;
  }
}

export const TeamsModule = getModule(Teams);
