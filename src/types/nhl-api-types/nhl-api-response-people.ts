import { NhlApiResponse } from "./nhl-api-response";
import { NhlApiPerson } from "./nhl-api-person";

export interface NhlApiResponsePeople extends NhlApiResponse {
  people: Array<NhlApiPerson>;
}
