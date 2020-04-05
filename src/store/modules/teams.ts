import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { teamsApi } from "@/services/nhl-api-adapter/teams-api";
import { Team } from "@/types/store-types/team";
import { RostersModule } from "./rosters";

export interface TeamsState {
  teams: Array<Team>;
  selectedTeamId: number;
}

@Module({ dynamic: true, store, name: "teams" })
class Teams extends VuexModule implements TeamsState {
  private _teams: Array<Team> = [];
  private _selectedTeamId = 0;

  public get teams(): Array<Team> {
    return this._teams;
  }

  public get selectedTeamId(): number {
    return this._selectedTeamId;
  }

  public get selectedTeam(): Team | null {
    return (
      this._teams.find((team: Team) => team.id === this._selectedTeamId) || null
    );
  }

  public get teamById() {
    return (id: number) =>
      this._teams.find((team: Team) => team.id === id) || null;
  }

  public get teamByAbbreviation() {
    return (abbv: string) =>
      this._teams.find((team: Team) => team.abbreviation === abbv) || null;
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
  public async loadTeams() {
    const teams = await teamsApi.getTeams();
    this.setTeams(teams);
    if (this.teamsSortedByName.length > 0) {
      const firstTeamId: number = this.teamsSortedByName[0].id;
      this.selectTeamById(firstTeamId);
    }
  }

  @Action
  public selectTeamById(teamId: number) {
    this.setSelectedTeamId(teamId);
    if (!RostersModule.teamRoster(teamId)) {
      RostersModule.loadTeamRoster(teamId);
    }
  }

  @Mutation
  private setTeams(teams: Array<Team>) {
    this._teams = teams;
  }

  @Mutation
  private setSelectedTeamId(teamId: number) {
    this._selectedTeamId = teamId;
  }
}

export const TeamsModule = getModule(Teams);
