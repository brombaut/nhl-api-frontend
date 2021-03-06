<template>
  <table class="roster-table" :style="tableStyle">
    <thead>
      <tr>
        <th
          class="table-main-header"
          :style="tableHeaderCellStyle"
          :colspan="rosterTableData.columns.length"
        >
          {{ rosterTableData.title }}
        </th>
      </tr>
      <tr>
        <th
          v-for="column in rosterTableData.columns"
          :key="column"
          :style="tableHeaderCellStyle"
        >
          {{ column }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(rowData, rowIndex) in rosterTableData.rows"
        :key="rowData.id"
        @mouseenter="addHoverClass"
        @mouseleave="removeHoverClass"
        :style="
          selectedPlayerId === rowData.entityId
            ? tableRowBrightStyle
            : rowIndex % 2 === 0
            ? evenTableRowStyle
            : oddTableRowStyle
        "
        @click="rowData.clickCallBack()"
      >
        <td
          v-for="(rowItem, index) in rowData.values"
          :key="index"
          :style="tableDataCellStyle"
        >
          {{ rowItem }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { RosterTableData } from "@/types/data-types/roster-table-data";
import { TeamLogosModule } from "../store/modules/team-logos";
import ColorUtils from "@/utils/color-utils";
import { PlayersModule } from "../store/modules/players";

@Component
export default class RosterTable extends Vue {
  evenRowColor = "";
  oddRowColor = "";

  @Prop({ required: true })
  rosterTableData!: RosterTableData;

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

  get tableDataCellStyle() {
    return {
      "border-color": TeamLogosModule.selectedSecondaryColor
    };
  }

  get tableRowBrightStyle() {
    return {
      "background-color": TeamLogosModule.selectedSecondaryColor,
      "border-color": TeamLogosModule.selectedPrimaryColor,
      color: TeamLogosModule.selectedPrimaryColor
    };
  }

  get evenTableRowStyle() {
    return {
      "background-color": this.evenRowColor,
      color: TeamLogosModule.selectedSecondaryColor
    };
  }
  get oddTableRowStyle() {
    return {
      "background-color": this.oddRowColor,
      color: TeamLogosModule.selectedSecondaryColor
    };
  }

  get selectedPlayerId() {
    return PlayersModule.selectedPlayerId;
  }

  @Watch("rosterTableData")
  setTableRowStyle() {
    this.evenRowColor = ColorUtils.lightenDarkenColor(
      TeamLogosModule.selectedBackdropColor,
      -10
    );
    this.oddRowColor = ColorUtils.lightenDarkenColor(
      TeamLogosModule.selectedBackdropColor,
      10
    );
  }

  addHoverClass(event: MouseEvent) {
    const rowEl: HTMLTableRowElement = event.target as HTMLTableRowElement;
    let percentChange: number;
    if (ColorUtils.colorIsBright(TeamLogosModule.selectedBackdropColor)) {
      percentChange = 85;
    } else {
      percentChange = 115;
    }
    rowEl.style.filter = `brightness(${percentChange}%)`;
  }

  removeHoverClass(event: MouseEvent) {
    const rowEl: HTMLTableRowElement = event.target as HTMLTableRowElement;
    rowEl.style.filter = "";
  }

  mounted() {
    this.setTableRowStyle();
  }
}
</script>

<style lang="scss" scoped>
.roster-table {
  border-collapse: collapse;
  border-spacing: 0;
  margin: 28px;
  font-weight: 700;
  border-radius: 8px;
  text-align: center;
  width: 100%;

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
      &:hover {
        cursor: pointer;
      }
      td {
        padding: 8px;
        text-align: left;

        &.team-name-cell {
          padding: 0;
        }

        .team-name-container {
          display: flex;
          align-items: center;
          padding: 8px;

          img {
            height: 40px;
            width: 40px;
            border-radius: 50%;
            margin: 0 8px;
          }
        }
      }
    }
  }
}
</style>
