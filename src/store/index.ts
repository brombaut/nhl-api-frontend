import Vue from "vue";
import Vuex from "vuex";
import { TeamsState } from "./modules/teams";
import { DivisionsState } from "./modules/divisions";
import { ConferencesState } from "./modules/conferences";
import { RostersState } from "./modules/rosters";

Vue.use(Vuex);

export interface RootState {
  teams: TeamsState;
  divisions: DivisionsState;
  conferences: ConferencesState;
  rosters: RostersState;
}

export default new Vuex.Store<RootState>({});
