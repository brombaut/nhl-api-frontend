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

  @Mutation
  private setTeams(teams: Array<Team>) {
    this._teams = teams;
  }

  @Mutation
  private setSelectedTeamId(teamId: number) {
    this._selectedTeamId = teamId;
  }

  @Action
  public async loadTeams() {
    const teams = await teamsApi.getTeams();
    this.setTeams(teams);
  }

  @Action
  public selectTeamById(teamId: number) {
    this.setSelectedTeamId(teamId);
  }
}

export const TeamsModule = getModule(Teams);
