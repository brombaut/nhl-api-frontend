import { NhlApiConferenceLink } from "./nhl-api-conference-link";

export interface NhlApiDivision {
  id: number;
  name: string;
  nameShort: string;
  link: string;
  abbreviation: string;
  conference: NhlApiConferenceLink;
  active: boolean;
}
