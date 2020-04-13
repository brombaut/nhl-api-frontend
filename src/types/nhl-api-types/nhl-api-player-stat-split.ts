export interface NhlApiPlayerStatSplit {
  season?: string;
  stat: object;
}

/*
{
  "type": {
    "displayName": "statsSingleSeason"
  },
  "splits": [
    {
      "season": "20192020",
      "stat": {
        "timeOnIce": "1179:36",
        "assists": 16,
        "goals": 9,
        "pim": 28,
        "shots": 72,
        "games": 69,
        "hits": 58,
        "powerPlayGoals": 1,
        "powerPlayPoints": 1,
        "powerPlayTimeOnIce": "39:55",
        "evenTimeOnIce": "942:36",
        "penaltyMinutes": "28",
        "faceOffPct": 52.84,
        "shotPct": 12.5,
        "gameWinningGoals": 1,
        "overTimeGoals": 0,
        "shortHandedGoals": 1,
        "shortHandedPoints": 3,
        "shortHandedTimeOnIce": "197:05",
        "blocked": 39,
        "plusMinus": -12,
        "points": 25,
        "shifts": 1476,
        "timeOnIcePerGame": "17:05",
        "evenTimeOnIcePerGame": "13:39",
        "shortHandedTimeOnIcePerGame": "02:51",
        "powerPlayTimeOnIcePerGame": "00:34"
      }
    }
  ]
},
{
  "type": {
    "displayName": "regularSeasonStatRankings"
  },
  "splits": [
    {
      "season": "20192020",
      "stat": {
        "rankPowerPlayGoals": "241st",
        "rankBlockedShots": "273rd",
        "rankAssists": "263rd",
        "rankShotPct": "173rd",
        "rankGoals": "248th",
        "rankHits": "319th",
        "rankPenaltyMinutes": "224th",
        "rankShortHandedGoals": "43rd",
        "rankPlusMinus": "807th",
        "rankShots": "423rd",
        "rankPoints": "277th",
        "rankOvertimeGoals": "121st",
        "rankGamesPlayed": "83rd"
      }
    }
  ]
},
*/
