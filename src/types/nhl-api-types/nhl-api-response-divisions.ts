import { NhlApiResponse } from './nhl-api-response';
import { NhlApiDivision } from './nhl-api-division';

export interface NhlApiResponseDivisionss extends NhlApiResponse {
  divisions: Array<NhlApiDivision>;
}
