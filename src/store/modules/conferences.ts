import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { Conference } from "@/types/store-types/conference";
import { conferencesApi } from "@/services/nhl-api-adapter/conferences-api";

export interface ConferencesState {
  conferences: Array<Conference>;
}

@Module({ dynamic: true, store, name: "conferences" })
class Conferences extends VuexModule implements ConferencesState {
  private _conferences: Array<Conference> = [];

  public get conferences(): Array<Conference> {
    return this._conferences;
  }

  public get conferenceById(): (id: number) => Conference | null {
    return (id: number) =>
      this._conferences.find(
        (conference: Conference) => conference.id === id
      ) || null;
  }

  @Action
  public async loadConferences(): Promise<void> {
    const conferences: Array<Conference> = await conferencesApi.getConferences();
    this.setConferences(conferences);
  }

  @Mutation
  private setConferences(conferences: Array<Conference>): void {
    this._conferences = conferences;
  }
}

export const ConferencesModule = getModule(Conferences);
