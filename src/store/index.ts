import Vue from "vue";
import Vuex from "vuex";
import { TeamsState } from "./modules/teams";
import { DivisionsState } from "./modules/divisions";
import { ConferencesState } from "./modules/conferences";
import { RostersState } from "./modules/rosters";
import { PlayersState } from "./modules/players";
import { StandingsState } from "./modules/standings";
import { TeamLogosState } from "./modules/team-logos";
import { LineCombinationsState } from "./modules/line-combinations";

Vue.use(Vuex);

export interface RootState {
  teams: TeamsState;
  divisions: DivisionsState;
  conferences: ConferencesState;
  rosters: RostersState;
  players: PlayersState;
  standings: StandingsState;
  teamLogos: TeamLogosState;
  lineCombinations: LineCombinationsState;
}

export default new Vuex.Store<RootState>({});
