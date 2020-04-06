import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { Division } from "@/types/store-types/division";
import { divisionsApi } from "@/services/nhl-api-adapter/divisions-api";

export interface DivisionsState {
  divisions: Array<Division>;
}

@Module({ dynamic: true, store, name: "divisions" })
class Divisions extends VuexModule implements DivisionsState {
  private _divisions: Array<Division> = [];

  public get divisions(): Array<Division> {
    return this._divisions;
  }

  public get divisionById(): (id: number) => Division | null {
    return (id: number) =>
      this._divisions.find((division: Division) => division.id === id) || null;
  }

  @Action
  public async loadDivisions(): Promise<void> {
    const divisions: Array<Division> = await divisionsApi.getDivisions();
    this.setDivisions(divisions);
  }

  @Mutation
  private setDivisions(divisions: Array<Division>): void {
    this._divisions = divisions;
  }
}

export const DivisionsModule = getModule(Divisions);
