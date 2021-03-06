<template>
  <table class="lines-table" :style="tableStyle">
    <thead>
      <tr>
        <th
          class="table-main-header"
          :style="tableHeaderCellStyle"
          :colspan="linesTableData.columns.length"
        >
          {{ linesTableData.title }}
        </th>
      </tr>
      <tr>
        <th
          v-for="column in linesTableData.columns"
          :key="column"
          :style="tableHeaderCellStyle"
        >
          {{ column }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(rowData, rowIndex) in linesTableData.rows" :key="rowData.id">
        <td
          v-for="(cell, index) in rowData.values"
          :key="index"
          @mouseenter="addHoverClass"
          @mouseleave="removeHoverClass"
          :style="
            selectedPlayerId === cell.playerId
              ? tableDataCellBrightStyle
              : rowIndex % 2 === 0
              ? evenTableRowStyle
              : oddTableRowStyle
          "
          @click="cell.clickCallBack()"
        >
          <div class="lines-data-cell">
            <div class="number">{{ cell.playerNumber }}</div>
            <div class="name">{{ cell.playerName }}</div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { TeamLogosModule } from "../store/modules/team-logos";
import colorUtils from "../utils/color-utils";
import { LinesTableData } from "@/types/data-types/lines-table-data";
import { PlayersModule } from "../store/modules/players";

@Component
export default class LinesTable extends Vue {
  evenRowColor = "";
  oddRowColor = "";

  @Prop({ required: true })
  linesTableData!: LinesTableData[];

  get tableStyle() {
    return {
      color: TeamLogosModule.selectedSecondaryColor
    };
  }

  get tableHeaderCellStyle() {
    return {
      "background-color": TeamLogosModule.selectedPrimaryColor,
      "border-color": TeamLogosModule.selectedSecondaryColor
    };
  }

  get tableDataCellBrightStyle() {
    return {
      "background-color": TeamLogosModule.selectedSecondaryColor,
      "border-color": TeamLogosModule.selectedSecondaryColor,
      color: TeamLogosModule.selectedPrimaryColor
    };
  }

  get evenTableRowStyle() {
    return {
      "background-color": this.evenRowColor,
      "border-color": TeamLogosModule.selectedSecondaryColor
    };
  }
  get oddTableRowStyle() {
    return {
      "background-color": this.oddRowColor,
      "border-color": TeamLogosModule.selectedSecondaryColor
    };
  }

  get selectedPlayerId() {
    return PlayersModule.selectedPlayerId;
  }

  @Watch("linesTableData")
  setTableRowStyle() {
    this.evenRowColor = colorUtils.lightenDarkenColor(
      TeamLogosModule.selectedBackdropColor,
      -10
    );
    this.oddRowColor = colorUtils.lightenDarkenColor(
      TeamLogosModule.selectedBackdropColor,
      10
    );
  }

  addHoverClass(event: MouseEvent) {
    const cellEl: HTMLTableDataCellElement = event.target as HTMLTableDataCellElement;
    let percentChange: number;
    if (colorUtils.colorIsBright(TeamLogosModule.selectedBackdropColor)) {
      percentChange = 85;
    } else {
      percentChange = 115;
    }
    cellEl.style.filter = `brightness(${percentChange}%)`;
  }

  removeHoverClass(event: MouseEvent) {
    const cellEl: HTMLTableDataCellElement = event.target as HTMLTableDataCellElement;
    cellEl.style.filter = "";
  }

  mounted() {
    this.setTableRowStyle();
  }
}
</script>

<style lang="scss" scoped>
.lines-table {
  border-collapse: collapse;
  border-spacing: 0;
  margin: 28px;
  font-weight: 700;
  border-radius: 8px;
  text-align: center;

  thead {
    th {
      text-align: center;
      padding: 8px;
      font-size: 1.2rem;
      border: 1px solid white;

      &.table-main-header {
        font-size: 1.5rem;
      }
    }
  }

  tbody {
    tr {
      td {
        padding: 8px;
        border: 1px solid white;
        text-align: left;
        width: 300px;

        &:hover {
          cursor: pointer;
        }

        .lines-data-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;

          .number {
            font-size: 3rem;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
