<template>
  <div id="lines">
    <div class="tables-container">
      <LinesTable :linesTableData="forwardLinesTableData" />
      <LinesTable :linesTableData="defenseLinesTableData" />
      <LinesTable :linesTableData="goalieLinesTableData" />
    </div>
    <PlayerDetailsPanel />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { LinesTableData } from "../types/data-types/lines-table-data";
import LinesTable from "@/components/LinesTable.vue";
import PlayerDetailsPanel from "@/components/PlayerDetailsPanel.vue";
import { LineCombinationsModule } from "../store/modules/line-combinations";
import { TeamsModule } from "../store/modules/teams";
import { LineCombination } from "../types/store-types/line-combination";
import { Player, NullPlayer } from "../types/store-types/player";
import { PlayersModule } from "../store/modules/players";
import { ForwardAbbreviation } from "../types/data-types/forward-abbreviation";
import { DefenseAbbreviation } from "../types/data-types/defense-abbreviation";
import { GoalieAbbreviation } from "../types/data-types/goalie-abbreviation";
import { LinesTableDataCell } from "../types/data-types/lines-table-data-cell";
import { TableDataRow } from "../types/data-types/table-data-row";
import App from "@/App.vue";
import { TableDataCell } from "../types/data-types/table-data-cell";

@Component({
  components: {
    PlayerDetailsPanel,
    LinesTable
  }
})
export default class Lines extends Vue {
  mounted() {
    this.loadingFinished(this.forwardLinesTableData);
  }

  @Watch("forwardLinesTableData")
  loadingFinished(tableData: LinesTableData) {
    const parentElem = this.$parent as App;
    if (tableData && !this.noDataInTableRows(tableData)) {
      parentElem.removeViewLoadingOverlay();
    } else {
      parentElem.showViewLoadingOverlay();
    }
  }

  noDataInTableRows(tableData: LinesTableData) {
    return tableData.rows.every((row: TableDataRow) => {
      return row.values.every((dataCell: string | TableDataCell) => {
        const lineTableDataCell: LinesTableDataCell = dataCell as LinesTableDataCell;
        return !lineTableDataCell.playerNumber && !lineTableDataCell.playerName;
      });
    });
  }

  get forwardLinesTableData(): LinesTableData {
    const lineCount = 4;
    const title = "Forwards";
    const columns = [
      ForwardAbbreviation.LW,
      ForwardAbbreviation.C,
      ForwardAbbreviation.RW
    ];
    return this.buildLinesTableData(title, columns, lineCount);
  }

  get defenseLinesTableData(): LinesTableData {
    const lineCount = 3;
    const title = "Defense";
    const columns = [DefenseAbbreviation.LD, DefenseAbbreviation.RD];
    return this.buildLinesTableData(title, columns, lineCount);
  }

  get goalieLinesTableData(): LinesTableData {
    const lineCount = 2;
    const title = "Goalies";
    const columns = [GoalieAbbreviation.G];
    return this.buildLinesTableData(title, columns, lineCount);
  }

  buildLinesTableData(title: string, columns: string[], lineCount: number) {
    const lines: LineCombination[] = LineCombinationsModule.teamLines(
      TeamsModule.selectedTeamId
    );
    const rows: TableDataRow[] = [];
    for (let i = 1; i <= lineCount; ++i) {
      const lineCells: LinesTableDataCell[] = [];
      for (let j = 0; j < columns.length; ++j) {
        const player = this.getPlayerForPosition(`${columns[j]}${i}`, lines);
        lineCells.push(this.buildLinesDataCell(player));
      }
      const rowClickCallback = () => {
        return;
      };
      const rowId = `${title}_${i}_${JSON.stringify(lineCells)}`;
      rows.push(new TableDataRow(lineCells, rowClickCallback, 0, rowId));
    }
    return new LinesTableData(title, columns, rows);
  }

  getPlayerForPosition(
    position: string,
    lineCombos: LineCombination[]
  ): Player {
    const lc = lineCombos.find(
      (lc: LineCombination) => lc.position === position
    );
    if (!lc) {
      return new NullPlayer();
    }
    return PlayersModule.playerById(lc.playerId);
  }

  buildLinesDataCell(player: Player) {
    const clickCallback = () => PlayersModule.selectPlayerById(player.id);
    return new LinesTableDataCell(
      player.primaryNumber,
      player.fullName,
      clickCallback,
      player.id
    );
  }
}
</script>

<style lang="scss">
#lines {
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  overflow-x: hidden;

  .tables-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
    padding: 0 20px;
  }
}
</style>
