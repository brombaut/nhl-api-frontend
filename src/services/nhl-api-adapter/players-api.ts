import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Api } from "./api";
import { NhlApiResponsePeople } from "@/types/nhl-api-types/nhl-api-response-people";
import { Player } from "@/types/store-types/player";

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
        const player: Player = new Player(nhlApiPeople[0]);
        return player;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }
}

export const playersApi = new PlayersApi();
