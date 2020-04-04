import Vue from "vue";
import Vuex from "vuex";
import { TeamsState } from "./modules/teams";

Vue.use(Vuex);

export interface RootState {
  teams: TeamsState;
}

export default new Vuex.Store<RootState>({});
