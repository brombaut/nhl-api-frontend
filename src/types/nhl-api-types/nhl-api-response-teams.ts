import { NhlApiTeam } from "./nhl-api-team";
import { NhlApiResponse } from './nhl-api-response';

export interface NhlApiResponseTeams extends NhlApiResponse {
  teams: Array<NhlApiTeam>;
}
