import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Api } from "./api";
import { NhlApiResponsePeople } from "@/types/nhl-api-types/nhl-api-response-people";
import { Player, PlayerEntity } from "@/types/store-types/player";
import { PlayerStat } from "@/types/store-types/player-stat";
import { NhlApiResponseStats } from "@/types/nhl-api-types/nhl-api-response-stats";
import {
  NhlApiStat,
  NhlApiPlayerStat
} from "@/types/nhl-api-types/nhl-api-stat";

const API_PEOPLE = "https://statsapi.web.nhl.com/api/v1/people";

class PlayersApi extends Api {
  public constructor(config?: AxiosRequestConfig) {
    super(config);
    this.getPlayerById = this.getPlayerById.bind(this);
  }

  public getPlayerById(playerId: number): Promise<Player> {
    return this.get<NhlApiResponsePeople>(`${API_PEOPLE}/${playerId}`)
      .then((peopleApiResponse: AxiosResponse<NhlApiResponsePeople>) => {
        const { people: nhlApiPeople } = peopleApiResponse.data;
        const player: Player = new PlayerEntity(nhlApiPeople[0]);
        return player;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }

  public getPlayerStats(
    playerId: number,
    statType: string
  ): Promise<Array<PlayerStat>> {
    return this.get<NhlApiResponseStats>(
      `${API_PEOPLE}/${playerId}/stats/?stats=${statType}`
    )
      .then((playerStatsApiResponse: AxiosResponse<NhlApiResponseStats>) => {
        const { stats: nhlApiPlayerStats } = playerStatsApiResponse.data;
        const stats: Array<PlayerStat> = nhlApiPlayerStats.map(
          (stat: NhlApiStat) =>
            new PlayerStat(playerId, stat as NhlApiPlayerStat)
        );
        return stats;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }
}

export const playersApi = new PlayersApi();
