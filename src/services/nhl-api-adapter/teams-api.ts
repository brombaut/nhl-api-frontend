import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Api } from "./api";
import { TeamsApiResponse } from "@/types/teams-api-response";
import { Team } from "@/types/team";

const API_TEAMS = "https://statsapi.web.nhl.com/api/v1/teams";

class TeamsApi extends Api {
  public constructor(config?: AxiosRequestConfig) {
    super(config);
    this.getTeams = this.getTeams.bind(this);
  }

  public getTeams(): Promise<Array<Team>> {
    return this.get<TeamsApiResponse>(API_TEAMS)
      .then((teamsApiResponse: AxiosResponse<TeamsApiResponse>) => {
        const { teams } = teamsApiResponse.data;
        return teams;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }
}

export const teamsApi = new TeamsApi();
