import { NhlApiResponse } from './nhl-api-response';
import { NhlApiStandings } from './nhl-api-standings';

export interface NhlApiResponseStandings extends NhlApiResponse {
  records: Array<NhlApiStandings>;
}
