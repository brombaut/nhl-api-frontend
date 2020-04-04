import { NhlApiTeam } from "../nhl-api-types/nhl-api-team";

export class Team {
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
  divisionId: number;
  conferenceId: number;
  franchise: {
    franchiseId: number;
    teamName: number;
    link: string;
  };
  shortName: string;
  officialSiteUrl: string;
  active: boolean;
  constructor(nhlApiTeam: NhlApiTeam) {
    this.id = nhlApiTeam.id;
    this.name = nhlApiTeam.name;
    this.link = nhlApiTeam.link;
    this.venue = nhlApiTeam.venue;
    this.abbreviation = nhlApiTeam.abbreviation;
    this.teamName = nhlApiTeam.teamName;
    this.locationName = nhlApiTeam.locationName;
    this.firstYearOfPlay = nhlApiTeam.firstYearOfPlay;
    this.divisionId = nhlApiTeam.division.id;
    this.conferenceId = nhlApiTeam.conference.id;
    this.franchise = nhlApiTeam.franchise;
    this.shortName = nhlApiTeam.shortName;
    this.officialSiteUrl = nhlApiTeam.officialSiteUrl;
    this.active = nhlApiTeam.active;
  }
}
