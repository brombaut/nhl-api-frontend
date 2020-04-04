import { NhlApiTeamLink } from "./nhl-api-team-link";

export interface NhlApiStandingsTeamRecord {
  team: NhlApiTeamLink;
  leagueRecord: {
    wins: number;
    losses: number;
    ot: number;
    type: string;
  };
  regulationWins: number;
  goalsAgainst: number;
  goalsScored: number;
  points: number;
  divisionRank: string;
  divisionL10Rank: string;
  divisionRoadRank: string;
  divisionHomeRank: string;
  conferenceRank: string;
  conferenceL10Rank: string;
  conferenceRoadRank: string;
  conferenceHomeRank: string;
  leagueRank: string;
  leagueL10Rank: string;
  leagueRoadRank: string;
  leagueHomeRank: string;
  wildCardRank: string;
  row: number;
  gamesPlayed: number;
  streak: {
    streakType: string;
    streakNumber: number;
    streakCode: string;
  };
  lastUpdated: Date;
}
