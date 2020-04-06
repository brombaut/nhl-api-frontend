import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { Roster } from "@/types/store-types/roster";
import { teamsApi } from "@/services/nhl-api-adapter/teams-api";
import { TeamsModule } from "./teams";
import { RosterRelation } from "@/types/store-types/roster-relation";
import { PlayersModule } from "./players";

export interface RostersState {
  rosters: Array<Roster>;
}

@Module({ dynamic: true, store, name: "rosters" })
class Rosters extends VuexModule implements RostersState {
  private _rosters: Array<Roster> = [];

  public get rosters(): Array<Roster> {
    return this._rosters;
  }

  public get teamRoster(): (teamId: number) => Array<RosterRelation> {
    return (teamId: number) =>
      this._rosters.find((roster: Roster) => roster.teamId === teamId)
        ?.rosterRelations || [];
  }

  public get selectedTeamRoster(): Array<RosterRelation> {
    return (
      this._rosters.find(
        (roster: Roster) => roster.teamId === TeamsModule.selectedTeamId
      )?.rosterRelations || []
    );
  }

  @Action
  public async loadTeamRoster(teamId: number): Promise<void> {
    const roster: Roster = await teamsApi.getTeamRoster(teamId);
    roster.rosterRelations.map((rr: RosterRelation) =>
      PlayersModule.loadPlayer(rr.personId)
    );
    this.addRoster(roster);
  }

  @Mutation
  private addRoster(roster: Roster): void {
    this._rosters.push(roster);
  }
}

export const RostersModule = getModule(Rosters);
