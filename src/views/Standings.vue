<template>
  <div id="standings">
    <StandingsTypeSelector />
    <div class="tables-container">
      <StandingsTable
        v-for="tableData in standingsTableData"
        :key="tableData.id"
        :standingsTableData="tableData"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { StandingsModule } from "../store/modules/standings";
import { TeamLogosModule } from "../store/modules/team-logos";
import { TeamsModule } from "../store/modules/teams";
import { StandingsRecord } from "../types/store-types/standings";
import { DivisionsModule } from "../store/modules/divisions";
import StandingsTypeSelector from "@/components/StandingsTypeSelector.vue";
import { ConferencesModule } from "../store/modules/conferences";
import { StandingsTeamRecord } from "../types/store-types/stadings-team-record";
import StandingsTable from "@/components/StandingsTable.vue";
import { StandingsTableData } from "../types/data-types/standings-table-data";
import { TableDataRow } from "../types/data-types/table-data-row";
import App from "@/App.vue";

@Component({
  components: {
    StandingsTypeSelector,
    StandingsTable
  }
})
export default class Standings extends Vue {
  readonly standingsTableColumns: string[] = [
    "#",
    "Team",
    "GP",
    "W",
    "L",
    "OT",
    "PTS",
    "RW",
    "ROW",
    "GF",
    "GA"
  ];
  readonly teamNameColumnInde = 1;
  readonly baseHighlightIndexes: number[] = [0];

  mounted() {
    this.loadingFinished(this.standingsTableData);
  }

  @Watch("standingsTableData")
  loadingFinished(tableData: StandingsTableData[]) {
    const parentElem = this.$parent as App;
    if (tableData && tableData.length > 0) {
      parentElem.removeViewLoadingOverlay();
    } else {
      parentElem.removeViewLoadingOverlay();
    }
  }

  get selectedStandings() {
    return StandingsModule.selectedStandings;
  }

  get standingsTableData(): StandingsTableData[] {
    const sortedRecords: Array<StandingsRecord> = this.sortStandingsRecords(
      this.selectedStandings
    );
    const standingsTables: StandingsTableData[] = sortedRecords.map(
      this.buildStandingsTableData
    );
    return standingsTables;
  }

  sortStandingsRecords(standingsRecords: StandingsRecord[]) {
    const copiedRecords = [...standingsRecords];
    const sortedRecords: Array<StandingsRecord> = [];
    const selectedTeamId = TeamsModule.selectedTeamId;
    for (let i = 0; i < copiedRecords.length; ++i) {
      const recordContainsTeamId: boolean = copiedRecords[i].teamRecords.some(
        (teamRec: StandingsTeamRecord) => {
          return teamRec.teamId === selectedTeamId;
        }
      );
      if (recordContainsTeamId) {
        sortedRecords.push(copiedRecords[i]);
        copiedRecords.splice(i, 1);
        break;
      }
    }
    sortedRecords.push(...copiedRecords);
    return sortedRecords;
  }

  buildStandingsTableData(
    standingsRecord: StandingsRecord
  ): StandingsTableData {
    const title = this.getTableHeader(standingsRecord);
    const teamRecords: StandingsTeamRecord[] = standingsRecord.teamRecords;
    const rows: TableDataRow[] = teamRecords.map(this.buildTableRowValues);
    return new StandingsTableData(
      title,
      this.standingsTableColumns,
      rows,
      this.teamNameColumnInde,
      this.baseHighlightIndexes
    );
  }

  buildTableRowValues(
    teamRecord: StandingsTeamRecord,
    index: number
  ): TableDataRow {
    const values: string[] = [
      (index + 1).toString(),
      this.teamNameById(teamRecord.teamId),
      teamRecord.gamesPlayed.toString(),
      teamRecord.leagueRecord.wins.toString(),
      teamRecord.leagueRecord.losses.toString(),
      teamRecord.leagueRecord.ot.toString(),
      teamRecord.points.toString(),
      teamRecord.regulationWins.toString(),
      teamRecord.row.toString(),
      teamRecord.goalsScored.toString(),
      teamRecord.goalsAgainst.toString()
    ];
    const clickCallback = () => {
      return;
    };
    const rowId = index.toString() + TeamLogosModule.logoHash;
    return new TableDataRow(values, clickCallback, teamRecord.teamId, rowId);
  }

  teamNameById(teamId: number): string {
    return TeamsModule.teamById(teamId).shortName;
  }

  getTableHeader(standingsObj: StandingsRecord): string {
    if (standingsObj.divisionId) {
      return DivisionsModule.divisionById(standingsObj.divisionId)?.name || "";
    }
    if (standingsObj.conferenceId) {
      return (
        ConferencesModule.conferenceById(standingsObj.conferenceId)?.name || ""
      );
    }
    return standingsObj.league.name;
  }
}
</script>

<style lang="scss" scoped>
#standings {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  padding: 0 20px;

  .tables-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-top: 80px;
  }
}
</style>
