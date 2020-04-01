import { TimeZone } from "./time-zone";

export interface Venue {
  name: string;
  link: string;
  city: string;
  timeZone: TimeZone;
}

/*
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
*/
