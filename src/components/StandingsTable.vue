<template>
  <table class="standings-table" :style="tableStyle">
    <thead>
      <tr>
        <th
          class="table-main-header"
          :style="tableHeaderCellStyle"
          colspan="11"
        >
          {{ standingsTableData.title }}
        </th>
      </tr>
      <tr>
        <th
          v-for="column in standingsTableData.columns"
          :key="column"
          :style="tableHeaderCellStyle"
        >
          {{ column }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(rowData, rowIndex) in standingsTableData.rows"
        :key="rowData.id"
        :style="rowIndex % 2 === 0 ? evenTableRowStyle : oddTableRowStyle"
      >
        <td
          v-for="(rowItem, index) in rowData.values"
          :key="index"
          :style="
            standingsTableData.highlightIndexes.includes(index)
              ? tableDataCellBrightStyle
              : tableDataCellStyle
          "
        >
          <div
            v-if="index === standingsTableData.teamNameIndex"
            class="team-name-container"
            :style="teamDataCellStyles(rowData.entityId)"
          >
            <img :src="imageUrlByTeamId(rowData.entityId)" />
            <span>{{ rowItem }}</span>
          </div>
          <span v-else>{{ rowItem }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { StandingsTableData } from "@/types/data-types/standings-table-data";
import { TeamLogosModule } from "../store/modules/team-logos";
import ColorUtils from "@/utils/color-utils";
import { TeamsModule } from "../store/modules/teams";

@Component
export default class StandingsTable extends Vue {
  evenRowColor = "";
  oddRowColor = "";

  @Prop({ required: true })
  standingsTableData!: StandingsTableData;

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

  get tableDataCellBrightStyle() {
    return {
      "background-color": TeamLogosModule.selectedPrimaryColor,
      "border-color": TeamLogosModule.selectedSecondaryColor
    };
  }

  get evenTableRowStyle() {
    return {
      "background-color": this.evenRowColor
    };
  }
  get oddTableRowStyle() {
    return {
      "background-color": this.oddRowColor
    };
  }

  teamDataCellStyles(teamId: number) {
    if (TeamsModule.selectedTeamId === teamId) {
      return this.tableDataCellBrightStyle;
    }
    return this.tableDataCellStyle;
  }

  imageUrlByTeamId(teamId: number) {
    const team = TeamsModule.teamById(teamId);
    const teamLogo = TeamLogosModule.teamLogoByAbbreviation(team.abbreviation);
    return require(`../assets/team-logos/${teamLogo.fileName}`);
  }

  @Watch("standingsTableData")
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

  mounted() {
    this.setTableRowStyle();
  }
}
</script>

<style lang="scss" scoped>
.standings-table {
  border-collapse: collapse;
  border-spacing: 0;
  margin: 28px;
  font-weight: 700;
  width: calc(100% - 56px);
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
        // padding: 8px;
        border: 1px solid white;

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
