import { NhlApiStandingsTeamRecord } from '../nhl-api-types/nhl-api-standings-team-record';

export class StandingsTeamRecord {
  teamId: number;
  leagueRecord: {
    wins: number;
    losses: number;
    ot: number;
    type: string;
  }
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

  constructor(nhlApiStandingsTeamRecord: NhlApiStandingsTeamRecord) {
    this.teamId = nhlApiStandingsTeamRecord.team.id;
    this.leagueRecord = nhlApiStandingsTeamRecord.leagueRecord;
    this.regulationWins = nhlApiStandingsTeamRecord.regulationWins;
    this.goalsAgainst = nhlApiStandingsTeamRecord.goalsAgainst;
    this.goalsScored = nhlApiStandingsTeamRecord.goalsScored;
    this.points = nhlApiStandingsTeamRecord.points;
    this.divisionRank = nhlApiStandingsTeamRecord.divisionRank;
    this.divisionL10Rank = nhlApiStandingsTeamRecord.divisionL10Rank;
    this.divisionRoadRank = nhlApiStandingsTeamRecord.divisionRoadRank;
    this.divisionHomeRank = nhlApiStandingsTeamRecord.divisionHomeRank;
    this.conferenceRank = nhlApiStandingsTeamRecord.conferenceRank;
    this.conferenceL10Rank = nhlApiStandingsTeamRecord.conferenceL10Rank;
    this.conferenceRoadRank = nhlApiStandingsTeamRecord.conferenceRoadRank;
    this.conferenceHomeRank = nhlApiStandingsTeamRecord.conferenceHomeRank;
    this.leagueRank = nhlApiStandingsTeamRecord.leagueRank;
    this.leagueL10Rank = nhlApiStandingsTeamRecord.leagueL10Rank;
    this.leagueRoadRank = nhlApiStandingsTeamRecord.leagueRoadRank;
    this.leagueHomeRank = nhlApiStandingsTeamRecord.leagueHomeRank;
    this.wildCardRank = nhlApiStandingsTeamRecord.wildCardRank;
    this.row = nhlApiStandingsTeamRecord.row;
    this.gamesPlayed = nhlApiStandingsTeamRecord.gamesPlayed;
    this.streak = nhlApiStandingsTeamRecord.streak;
    this.lastUpdated = nhlApiStandingsTeamRecord.lastUpdated;
  }
}