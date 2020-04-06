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

export interface PlayersState {
  players: Array<Player>;
}

@Module({ dynamic: true, store, name: "players" })
class Players extends VuexModule implements PlayersState {
  private _players: Array<Player> = [];

  public get players(): Array<Player> {
    return this._players;
  }

  @Action
  public async loadPlayer(personId: number): Promise<void> {
    const player: Player = await playersApi.getPlayerById(personId);
    this.addPlayer(player);
  }

  @Mutation
  private addPlayer(player: Player): void {
    this._players.push(player);
  }
}

export const PlayersModule = getModule(Players);
