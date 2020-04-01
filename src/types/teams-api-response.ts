import { Team } from "./team";

export interface TeamsApiResponse {
  copyright: string;
  teams: Array<Team>;
}
