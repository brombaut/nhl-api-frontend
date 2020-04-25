import { MyMap } from "@/types/data-types/map";
import { StatLookup } from "@/types/data-types/stat-lookup";

const statsLookupTable: MyMap<StatLookup> = {
  wins: {
    label: "Wins",
    abbreviation: "W"
  },
  losses: {
    label: "Losses",
    abbreviation: "L"
  },
  ot: {
    label: "Overtime Losses",
    abbreviation: "OTL"
  },
  pts: {
    label: "Points",
    abbreviation: "PTS"
  },
  ptPctg: {
    label: "Point Percentage",
    abbreviation: "PPT"
  },
  goalsPerGame: {
    label: "Goals/Game",
    abbreviation: "GPG"
  },
  evGGARatio: {
    label: "evGGARatio",
    abbreviation: "evGGARatio"
  },
  goalsAgainstPerGame: {
    label: "Goals Against/Game",
    abbreviation: "GAA"
  },
  powerPlayPercentage: {
    label: "Power Play Percentage",
    abbreviation: "PP%"
  },
  powerPlayGoals: {
    label: "Power Play Goals",
    abbreviation: "PPG"
  },
  powerPlayGoalsAgainst: {
    label: "Power Play Goals Against",
    abbreviation: "PP GA"
  },
  powerPlayOpportunities: {
    label: "Power Play Opportunities",
    abbreviation: "PP OPP"
  },
  penaltyKillOpportunities: {
    label: "Penalty Kill Opportunities",
    abbreviation: "PK OPP"
  },
  penaltyKillPercentage: {
    label: "Penalty Kill Percentage",
    abbreviation: "PK %"
  },
  winScoreFirst: {
    label: "Scoring First",
    abbreviation: "WSF"
  },
  winOppScoreFirst: {
    label: "Opponent Scoring First",
    abbreviation: "WOSF"
  },
  winLeadFirstPer: {
    label: "Leading 1st Period",
    abbreviation: "LFP"
  },
  winLeadSecondPer: {
    label: "Leading 2nd Period",
    abbreviation: ""
  },
  winOutshootOpp: {
    label: "Outshooting Opponent",
    abbreviation: ""
  },
  winOutshotByOpp: {
    label: "Outshot by Opponent",
    abbreviation: ""
  },

  shotsPerGame: {
    label: "Shots/Game",
    abbreviation: "S/G"
  },
  shootingPct: {
    label: "Shooting %",
    abbreviation: ""
  },
  shotsAllowed: {
    label: "Shots Allowed",
    abbreviation: ""
  },
  savePct: {
    label: "Save %",
    abbreviation: ""
  },
  faceOffsTaken: {
    label: "Faceoffs Taken",
    abbreviation: ""
  },
  faceOffsWon: {
    label: "Faceoffs Won",
    abbreviation: ""
  },
  faceOffsLost: {
    label: "Faceoffs Lost",
    abbreviation: ""
  },
  faceOffWinPercentage: {
    label: "Faceoff %",
    abbreviation: ""
  }
};

export default statsLookupTable;
