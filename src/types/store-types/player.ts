import { NhlApiPerson } from "../nhl-api-types/nhl-api-person";

export interface Player {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  primaryNumber: string;
  birthDate: string;
  currentAge: string;
  birthCity: string;
  birthStateProvince: string;
  birthCountry: string;
  nationality: string;
  height: string;
  weight: number;
  active: boolean;
  alternateCaptain: boolean;
  captain: boolean;
  rookie: boolean;
  shootsCatches: string;
  currentTeamId: number;
  primaryPosition: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };
}

export class PlayerEntity implements Player {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  primaryNumber: string;
  birthDate: string;
  currentAge: string;
  birthCity: string;
  birthStateProvince: string;
  birthCountry: string;
  nationality: string;
  height: string;
  weight: number;
  active: boolean;
  alternateCaptain: boolean;
  captain: boolean;
  rookie: boolean;
  shootsCatches: string;
  currentTeamId: number;
  primaryPosition: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  };

  constructor(nhlApiPerson: NhlApiPerson) {
    this.id = nhlApiPerson.id;
    this.fullName = nhlApiPerson.fullName;
    this.link = nhlApiPerson.link;
    this.firstName = nhlApiPerson.firstName;
    this.lastName = nhlApiPerson.lastName;
    this.primaryNumber = nhlApiPerson.primaryNumber;
    this.birthDate = nhlApiPerson.birthDate;
    this.currentAge = nhlApiPerson.currentAge;
    this.birthCity = nhlApiPerson.birthCity;
    this.birthStateProvince = nhlApiPerson.birthStateProvince;
    this.birthCountry = nhlApiPerson.birthCountry;
    this.nationality = nhlApiPerson.nationality;
    this.height = nhlApiPerson.height;
    this.weight = nhlApiPerson.weight;
    this.active = nhlApiPerson.active;
    this.alternateCaptain = nhlApiPerson.alternateCaptain;
    this.captain = nhlApiPerson.captain;
    this.rookie = nhlApiPerson.rookie;
    this.shootsCatches = nhlApiPerson.shootsCatches;
    this.currentTeamId = nhlApiPerson.currentTeam.id;
    this.primaryPosition = nhlApiPerson.primaryPosition;
  }
}

export class NullPlayer implements Player {
  id = 0;
  fullName = "";
  link = "";
  firstName = "";
  lastName = "";
  primaryNumber = "";
  birthDate = "";
  currentAge = "";
  birthCity = "";
  birthStateProvince = "";
  birthCountry = "";
  nationality = "";
  height = "";
  weight = 0;
  active = false;
  alternateCaptain = false;
  captain = false;
  rookie = false;
  shootsCatches = "";
  currentTeamId = 0;
  primaryPosition: {
    code: string;
    name: string;
    type: string;
    abbreviation: string;
  } = {
    code: "",
    name: "",
    type: "",
    abbreviation: ""
  };
}
