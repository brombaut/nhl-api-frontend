import { NhlApiResponse } from "./nhl-api-response";
import { NhlApiTeamStat } from "./nhl-api-team-stat";

export interface NhlApiResponseTeamStats extends NhlApiResponse {
  stats: Array<NhlApiTeamStat>;
}
