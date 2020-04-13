import { NhlApiTeamStatSplit } from "../nhl-api-types/nhl-api-team-stat-split";

export class TeamStatSplit {
  stat: {
    wins: number | string;
    losses: number | string;
    ot: number | string;
    pts: number | string;
    ptPctg: number | string;
    goalsPerGame: number | string;
    goalsAgainstPerGame: number | string;
    evGGARatio: number | string;
    powerPlayPercentage: number | string;
    powerPlayGoals: number | string;
    powerPlayGoalsAgainst: number | string;
    powerPlayOpportunities: number | string;
    penaltyKillOpportunities: number | string;
    penaltyKillPercentage: number | string;
    shotsPerGame: number | string;
    shotsAllowed: number | string;
    winScoreFirst: number | string;
    winOppScoreFirst: number | string;
    winLeadFirstPer: number | string;
    winLeadSecondPer: number | string;
    winOutshootOpp: number | string;
    winOutshotByOpp: number | string;
    faceOffsTaken: number | string;
    faceOffsWon: number | string;
    faceOffsLost: number | string;
    faceOffWinPercentage: number | string;
    shootingPctg?: number;
    shootingPctRank?: string;
    savePctg?: number;
    savePctRank?: string;
  };
  teamId: number;

  constructor(nhlApiTeamStatSplit: NhlApiTeamStatSplit) {
    this.stat = { ...nhlApiTeamStatSplit.stat };
    this.teamId = nhlApiTeamStatSplit.team.id;
  }
}
