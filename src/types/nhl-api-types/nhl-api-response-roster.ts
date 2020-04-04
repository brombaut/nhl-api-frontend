import { NhlApiResponse } from "./nhl-api-response";
import { NhlApiRosterRelation } from "./nhl-api-roster-relation";

export interface NhlApiResponseRoster extends NhlApiResponse {
  roster: Array<NhlApiRosterRelation>;
}
