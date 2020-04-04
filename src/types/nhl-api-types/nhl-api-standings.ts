import { NhlApiDivisionLink } from "./nhl-api-division-link";
import { NhlApiConferenceLink } from "./nhl-api-conference-link";
import { NhlApiStandingsTeamRecord } from "./nhl-api-standings-team-record";

export interface NhlApiStandings {
  standingsType: string;
  league: {
    id: number;
    name: string;
    link: string;
  };
  division?: NhlApiDivisionLink;
  conference?: NhlApiConferenceLink;
  teamRecords: Array<NhlApiStandingsTeamRecord>;
}
