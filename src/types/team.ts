import { Venue } from "./venue";
import { Division } from "./division";
import { Conference } from "./conference";
import { Franchise } from "./franchise";

export interface Team {
  id: number;
  name: string;
  link: string;
  venue: Venue;
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  division: Division;
  conference: Conference;
  franchise: Franchise;
  shortName: string;
  officialSiteUrl: string;
  franchiseId: number;
  active: boolean;
}

/*
{
  "id": 1,
  "name": "New Jersey Devils",
  "link": "/api/v1/teams/1",
  "venue": {
    "name": "Prudential Center",
    "link": "/api/v1/venues/null",
    "city": "Newark",
    "timeZone": {
      "id": "America/New_York",
      "offset": -4,
      "tz": "EDT"
    }
  },
  "abbreviation": "NJD",
  "teamName": "Devils",
  "locationName": "New Jersey",
  "firstYearOfPlay": "1982",
  "division": {
    "id": 18,
    "name": "Metropolitan",
    "nameShort": "Metro",
    "link": "/api/v1/divisions/18",
    "abbreviation": "M"
  },
  "conference": {
    "id": 6,
    "name": "Eastern",
    "link": "/api/v1/conferences/6"
  },
  "franchise": {
    "franchiseId": 23,
    "teamName": "Devils",
    "link": "/api/v1/franchises/23"
  },
  "shortName": "New Jersey",
  "officialSiteUrl": "http://www.newjerseydevils.com/",
  "franchiseId": 23,
  "active": true
}
*/
