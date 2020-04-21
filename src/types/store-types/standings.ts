import { NhlApiStandings } from "../nhl-api-types/nhl-api-standings";
import { StandingsTeamRecord } from "./stadings-team-record";

export class StandingsRecord {
  id: string;
  standingsType: string;
  league: {
    id: number;
    name: string;
    link: string;
  };
  divisionId?: number;
  conferenceId?: number;
  teamRecords: Array<StandingsTeamRecord>;

  constructor(nhlApiStandings: NhlApiStandings) {
    this.standingsType = nhlApiStandings.standingsType;
    this.league = nhlApiStandings.league;
    if (nhlApiStandings.division) {
      this.divisionId = nhlApiStandings.division.id;
    }
    if (nhlApiStandings.conference) {
      this.conferenceId = nhlApiStandings.conference.id;
    }
    this.teamRecords = nhlApiStandings.teamRecords.map(
      teamRec => new StandingsTeamRecord(teamRec)
    );
    this.id = this.teamRecords
      .map((tr: StandingsTeamRecord) => tr.teamId)
      .join()
      .replace(/\s/g, "");
  }
}
