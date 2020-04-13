import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Api } from "./api";
import { NhlApiResponseTeams } from "@/types/nhl-api-types/nhl-api-response-teams";
import { NhlApiTeam } from "@/types/nhl-api-types/nhl-api-team";
import { Team, TeamEntity } from "@/types/store-types/team";
import { Roster } from "@/types/store-types/roster";
import { NhlApiResponseRoster } from "@/types/nhl-api-types/nhl-api-response-roster";
import { NhlApiResponseTeamStats } from "@/types/nhl-api-types/nhl-api-response-team-stats";
import { TeamStat } from "@/types/store-types/team-stat";
import { NhlApiTeamStat } from "@/types/nhl-api-types/nhl-api-team-stat";

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
          teams.push(new TeamEntity(nhlApiTeam));
        });
        return teams;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }

  public getTeamRoster(teamId: number): Promise<Roster> {
    return this.get<NhlApiResponseRoster>(`${API_TEAMS}/${teamId}/roster`)
      .then((rosterApiResponse: AxiosResponse<NhlApiResponseRoster>) => {
        const { roster: nhlApiRoster } = rosterApiResponse.data;
        return new Roster(teamId, nhlApiRoster);
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }

  public getTeamStats(teamId: number): Promise<Array<TeamStat>> {
    return this.get<NhlApiResponseTeamStats>(`${API_TEAMS}/${teamId}/stats`)
      .then((teamStatsApiResponse: AxiosResponse<NhlApiResponseTeamStats>) => {
        const { stats: nhlApiTeamStats } = teamStatsApiResponse.data;
        const stats: Array<TeamStat> = nhlApiTeamStats.map(
          (stat: NhlApiTeamStat) => new TeamStat(teamId, stat)
        );
        return stats;
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }
}

export const teamsApi = new TeamsApi();
