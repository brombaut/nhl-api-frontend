import { NhlApiConferenceLink } from "./nhl-api-conference-link";
import { NhlApiDivisionLink } from "./nhl-api-division-link";

export interface NhlApiTeam {
  id: number;
  name: string;
  link: string;
  venue: {
    name: string;
    link: string;
    city: string;
    timeZone: {
      id: string;
      offset: number;
      tz: string;
    };
  };
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  division: NhlApiDivisionLink;
  conference: NhlApiConferenceLink;
  franchise: {
    franchiseId: number;
    teamName: number;
    link: string;
  };
  shortName: string;
  officialSiteUrl: string;
  franchiseId: number;
  active: boolean;
}
