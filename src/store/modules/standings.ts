import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { StandingsType } from "@/types/store-types/standings-type";
import { StandingsRecord } from "@/types/store-types/standings";
import { standingsApi } from "@/services/nhl-api-adapter/standings-api";

export interface StandingsState {
  standingsTypes: Array<StandingsType>;
  standings: Array<StandingsRecord>;
}

@Module({ dynamic: true, store, name: "standings" })
class Standings extends VuexModule implements StandingsState {
  private _standingsTypes: Array<StandingsType> = [];
  private _selectedStandingsType = "";
  private _standings: Array<StandingsRecord> = [];

  public get standingsTypes(): Array<StandingsType> {
    return this._standingsTypes;
  }

  public get selectedStandingsType(): StandingsType | null {
    return (
      this._standingsTypes.find(
        (st: StandingsType) => st.name === this._selectedStandingsType
      ) || null
    );
  }

  public get standings(): Array<StandingsRecord> {
    return this._standings;
  }

  public get selectedStandings(): Array<StandingsRecord> {
    return this._standings.filter(
      (sr: StandingsRecord) => sr.standingsType === this._selectedStandingsType
    );
  }

  @Action
  public async loadStandingsTypes(): Promise<void> {
    const standingsTypes: Array<StandingsType> = await standingsApi.getStandingsTypes();
    this.setStandingsTypes(standingsTypes);
    const initialStandingsType = standingsTypes.find(
      (st: StandingsType) => st.name === "byDivision"
    );
    if (initialStandingsType) {
      this.selectStandingsType(initialStandingsType);
    }
  }

  @Action
  public async loadStandingsByType(
    standingsType: StandingsType
  ): Promise<void> {
    const standings: Array<StandingsRecord> = await standingsApi.getStandingsByType(
      standingsType
    );
    standings.forEach((record: StandingsRecord) =>
      this.addStandingsRecord(record)
    );
  }

  @Action
  public selectStandingsType(st: StandingsType): void {
    this.setSelectedStandingsType(st.name);
    if (this.selectedStandings.length === 0) {
      this.loadStandingsByType(st);
    }
  }

  @Mutation
  private setStandingsTypes(st: Array<StandingsType>): void {
    this._standingsTypes = st;
  }

  @Mutation
  private addStandingsRecord(standingsRecord: StandingsRecord): void {
    this._standings.push(standingsRecord);
  }

  @Mutation
  private setSelectedStandingsType(name: string): void {
    this._selectedStandingsType = name;
  }
}

export const StandingsModule = getModule(Standings);
