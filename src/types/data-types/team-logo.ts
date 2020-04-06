export interface TeamLogo {
  fileName: string;
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
  backdropColor: string;
}

export class NullTeamLogo implements TeamLogo {
  fileName: string;
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
  backdropColor: string;

  constructor() {
    this.fileName = "";
    this.abbreviation = "";
    this.primaryColor = "";
    this.secondaryColor = "";
    this.backdropColor = "#283243";
  }
}
