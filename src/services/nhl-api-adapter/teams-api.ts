import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Api } from "./api";
import { NhlApiResponseTeams } from "@/types/nhl-api-types/nhl-api-response-teams";
import { NhlApiTeam } from "@/types/nhl-api-types/nhl-api-team";
import { Team } from '@/types/store-types/team';

const API_TEAMS = "https://statsapi.web.nhl.com/api/v1/teams";

class TeamsApi extends Api {
  public constructor(config?: AxiosRequestConfig) {
    super(config);
    this.getTeams = this.getTeams.bind(this);
  }

  public getTeams(): Promise<Array<Team>> {
    return this.get<NhlApiResponseTeams>(API_TEAMS)
      .then((teamsApiResponse: AxiosResponse<NhlApiResponseTeams>) => {
        const { teams: nhlApiTeams } = teamsApiResponse.data;
        const teams: Array<Team> = [];
        nhlApiTeams.forEach((nhlApiTeam: NhlApiTeam) => {
          teams.push(new Team(nhlApiTeam));
        });
        return teams;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }
}

export const teamsApi = new TeamsApi();
