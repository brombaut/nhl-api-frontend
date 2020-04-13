import { NhlApiTeamLink } from "./nhl-api-team-link";

export interface NhlApiTeamStatSplit {
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
  team: NhlApiTeamLink;
}

/*
        {
          "stat": {
            "wins": "29th",
            "losses": "23rd",
            "ot": "3rd",
            "pts": "25th",
            "ptPctg": "25th",
            "goalsPerGame": "24th",
            "goalsAgainstPerGame": "29th",
            "evGGARatio": "29th",
            "powerPlayPercentage": "21st",
            "powerPlayGoals": "18th",
            "powerPlayGoalsAgainst": "14th",
            "powerPlayOpportunities": "3rd",
            "penaltyKillOpportunities": "24th",
            "penaltyKillPercentage": "7th",
            "shotsPerGame": "22nd",
            "shotsAllowed": "26th",
            "winScoreFirst": "29th",
            "winOppScoreFirst": "10th",
            "winLeadFirstPer": "30th",
            "winLeadSecondPer": "28th",
            "winOutshootOpp": "24th",
            "winOutshotByOpp": "24th",
            "faceOffsTaken": "16th",
            "faceOffsWon": "27th",
            "faceOffsLost": "30th",
            "faceOffWinPercentage": "29th",
            "savePctRank": "20th",
            "shootingPctRank": "22nd"
          },
          "team": {
            "id": 1,
            "name": "New Jersey Devils",
            "link": "/api/v1/teams/1"
          }
        }

        */
