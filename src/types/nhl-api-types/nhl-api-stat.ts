import { NhlApiTeamStatSplit } from "./nhl-api-team-stat-split";
import { NhlApiPlayerStatSplit } from "./nhl-api-player-stat-split";

export interface NhlApiStat {
  type: {
    displayName: string;
  };
}

export interface NhlApiTeamStat extends NhlApiStat {
  splits: Array<NhlApiTeamStatSplit>;
}

export interface NhlApiPlayerStat extends NhlApiStat {
  splits: Array<NhlApiPlayerStatSplit>;
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
