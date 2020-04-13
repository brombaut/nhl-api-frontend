import { NhlApiResponse } from "./nhl-api-response";
import { NhlApiStat } from "./nhl-api-stat";

export interface NhlApiResponseStats extends NhlApiResponse {
  stats: Array<NhlApiStat>;
}
