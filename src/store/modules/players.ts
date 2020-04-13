import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { Player } from "@/types/store-types/player";
import { playersApi } from "@/services/nhl-api-adapter/players-api";
import { StatsModule } from "./stats";

export interface PlayersState {
  players: Array<Player>;
  selectedPlayerId: number;
}

@Module({ dynamic: true, store, name: "players" })
class Players extends VuexModule implements PlayersState {
  private _players: Array<Player> = [];
  private _selectedPlayerId = 0;

  public get players(): Array<Player> {
    return this._players;
  }

  public get selectedPlayerId() {
    return this._selectedPlayerId;
  }

  @Action
  public async loadPlayer(personId: number): Promise<void> {
    const player: Player = await playersApi.getPlayerById(personId);
    this.addPlayer(player);
  }

  @Action
  public selectPlayerById(playerId: number): void {
    this.setSelectedPlayerId(playerId);
    if (StatsModule.statsForPlayer(playerId).length === 0) {
      StatsModule.loadStatsForPlayer(playerId);
    }
  }

  @Mutation
  private addPlayer(player: Player): void {
    this._players.push(player);
  }

  @Mutation
  private setSelectedPlayerId(playerId: number): void {
    this._selectedPlayerId = playerId;
  }
}

export const PlayersModule = getModule(Players);
