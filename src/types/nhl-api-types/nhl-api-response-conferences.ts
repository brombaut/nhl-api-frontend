import { NhlApiResponse } from './nhl-api-response';
import { NhlApiConference } from './nhl-api-conference';

export interface NhlApiResponseConferences extends NhlApiResponse {
  conferences: Array<NhlApiConference>;
}
