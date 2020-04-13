import { NhlApiTeamStatSplit } from "./nhl-api-team-stat-split";

export interface NhlApiTeamStat {
  type: {
    displayName: string;
  };
  splits: Array<NhlApiTeamStatSplit>;
}

/*
    {
      "type": {
        "displayName": "regularSeasonStatRankings"
      },
      "splits": [
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
      ]
    }
    */
