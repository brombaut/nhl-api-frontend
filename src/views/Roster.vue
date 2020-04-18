<template>
  <div id="roster">
    <table :style="tableStyle">
      <thead>
        <tr>
          <th
            class="table-main-header"
            :style="tableHeaderCellStyle"
            colspan="11"
          >
            Forwards
          </th>
        </tr>
        <tr>
          <th :style="tableHeaderCellStyle">Player</th>
          <th :style="tableHeaderCellStyle">#</th>
          <th :style="tableHeaderCellStyle">Pos</th>
          <th :style="tableHeaderCellStyle">S/C</th>
          <th :style="tableHeaderCellStyle">Ht</th>
          <th :style="tableHeaderCellStyle">Wt</th>
          <th :style="tableHeaderCellStyle">Born</th>
          <th :style="tableHeaderCellStyle">Birthplace</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(rowData, rowIndex) in rosterForwardRowsData"
          :key="rowData.personId"
          :style="rowIndex % 2 === 0 ? evenTableRowStyle : oddTableRowStyle"
        >
          <td :style="tableDataCellStyle">{{ buildPlayerName(rowData) }}</td>
          <td :style="tableDataCellStyle">{{ rowData.jerseyNumber }}</td>
          <td :style="tableDataCellStyle">{{ rowData.position.code }}</td>
          <td :style="tableDataCellStyle">{{ rowData.shootsCatches }}</td>
          <td :style="tableDataCellStyle">{{ rowData.height }}</td>
          <td :style="tableDataCellStyle">{{ rowData.weight }}</td>
          <td :style="tableDataCellStyle">{{ rowData.birthDate }}</td>
          <td :style="tableDataCellStyle">{{ buildPlayerBirthPlaceString(rowData) }}</td>
        </tr>
      </tbody>
    </table>

    <table :style="tableStyle">
      <thead>
        <tr>
          <th
            class="table-main-header"
            :style="tableHeaderCellStyle"
            colspan="11"
          >
            Defense
          </th>
        </tr>
        <tr>
          <th :style="tableHeaderCellStyle">Player</th>
          <th :style="tableHeaderCellStyle">#</th>
          <th :style="tableHeaderCellStyle">Pos</th>
          <th :style="tableHeaderCellStyle">S/C</th>
          <th :style="tableHeaderCellStyle">Ht</th>
          <th :style="tableHeaderCellStyle">Wt</th>
          <th :style="tableHeaderCellStyle">Born</th>
          <th :style="tableHeaderCellStyle">Birthplace</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(rowData, rowIndex) in rosterDefenseRowsData"
          :key="rowData.personId"
          :style="rowIndex % 2 === 0 ? evenTableRowStyle : oddTableRowStyle"
        >
          <td :style="tableDataCellStyle">{{ buildPlayerName(rowData) }}</td>
          <td :style="tableDataCellStyle">{{ rowData.jerseyNumber }}</td>
          <td :style="tableDataCellStyle">{{ rowData.position.code }}</td>
          <td :style="tableDataCellStyle">{{ rowData.shootsCatches }}</td>
          <td :style="tableDataCellStyle">{{ rowData.height }}</td>
          <td :style="tableDataCellStyle">{{ rowData.weight }}</td>
          <td :style="tableDataCellStyle">{{ rowData.birthDate }}</td>
          <td :style="tableDataCellStyle">{{ buildPlayerBirthPlaceString(rowData) }}</td>
        </tr>
      </tbody>
    </table>

    <table :style="tableStyle">
      <thead>
        <tr>
          <th
            class="table-main-header"
            :style="tableHeaderCellStyle"
            colspan="11"
          >
            Goalies
          </th>
        </tr>
        <tr>
          <th :style="tableHeaderCellStyle">Player</th>
          <th :style="tableHeaderCellStyle">#</th>
          <th :style="tableHeaderCellStyle">Pos</th>
          <th :style="tableHeaderCellStyle">S/C</th>
          <th :style="tableHeaderCellStyle">Ht</th>
          <th :style="tableHeaderCellStyle">Wt</th>
          <th :style="tableHeaderCellStyle">Born</th>
          <th :style="tableHeaderCellStyle">Birthplace</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(rowData, rowIndex) in rosterGoalieRowsData"
          :key="rowData.personId"
          :style="rowIndex % 2 === 0 ? evenTableRowStyle : oddTableRowStyle"
        >
          <td :style="tableDataCellStyle">{{ buildPlayerName(rowData) }}</td>
          <td :style="tableDataCellStyle">{{ rowData.jerseyNumber }}</td>
          <td :style="tableDataCellStyle">{{ rowData.position.code }}</td>
          <td :style="tableDataCellStyle">{{ rowData.shootsCatches }}</td>
          <td :style="tableDataCellStyle">{{ rowData.height }}</td>
          <td :style="tableDataCellStyle">{{ rowData.weight }}</td>
          <td :style="tableDataCellStyle">{{ rowData.birthDate }}</td>
          <td :style="tableDataCellStyle">{{ buildPlayerBirthPlaceString(rowData) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { TeamsModule } from "../store/modules/teams";
import { TeamLogosModule } from "../store/modules/team-logos";
import ColorUtils from "@/utils/color-utils";
import { RostersModule } from "../store/modules/rosters";
import { RosterRelation } from "../types/store-types/roster-relation";
import { PlayersModule } from "../store/modules/players";

@Component
export default class Roster extends Vue {
  evenRowColor = "";
  oddRowColor = "";

  get rosterTableHeader() {
    return TeamsModule.selectedTeam.name;
  }

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

  get selectedTeamId() {
    return TeamsModule.selectedTeamId;
  }

  get teamRosterRelations() {
    return RostersModule.selectedTeamRosterRelations;
  }

  get rosterForwardRowsData() {
    const rrs = this.teamRosterRelations;
    const rows: any[] = [];
    try {
      rrs.forEach((rr: RosterRelation) => {
        if (!(rr.position.type === "Forward")) {
          return;
        }
        const player = PlayersModule.playerById(rr.personId);
        const rowObj = { ...rr, ...player };
        rows.push(rowObj);
      });
    } catch (err) {
      return rows;
    }
    return rows.sort(this.sortByPosition);
  }

  get rosterDefenseRowsData() {
    const rrs = this.teamRosterRelations;
    const rows: any[] = [];
    try {
      rrs.forEach((rr: RosterRelation) => {
        if (!(rr.position.type === "Defenseman")) {
          return;
        }
        const player = PlayersModule.playerById(rr.personId);
        const rowObj = { ...rr, ...player };
        rows.push(rowObj);
      });
    } catch (err) {
      return rows;
    }
    return rows.sort(this.sortByPosition);
  }

  get rosterGoalieRowsData() {
    const rrs = this.teamRosterRelations;
    const rows: any[] = [];
    try {
      rrs.forEach((rr: RosterRelation) => {
        if (!(rr.position.type === "Goalie")) {
          return;
        }
        const player = PlayersModule.playerById(rr.personId);
        const rowObj = { ...rr, ...player };
        rows.push(rowObj);
      });
    } catch (err) {
      return rows;
    }
    return rows.sort(this.sortByPosition);
  }

  teamDataCellStyles(teamId: number) {
    if (TeamsModule.selectedTeamId === teamId) {
      return this.tableDataCellBrightStyle;
    }
    return this.tableDataCellStyle;
  }

  @Watch("selectedTeamId")
  handleNewTeamSelected() {
    this.setTableRowStyle();
  }

  handleNewStanginsTypeSelected() {
    this.setTableRowStyle();
  }

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

  buildPlayerName(rowData: any) {
    const returnVal = rowData.fullName;
    if (rowData.captain) {
      return `${returnVal} (C)`;
    }
    if (rowData.alternateCaptain) {
      return `${returnVal} (A)`;
    }
    return returnVal;
  }

  buildPlayerBirthPlaceString(rowData: any) {
    let returnString = '';
    if (rowData.birthCity) {
      returnString += `${rowData.birthCity}, `;
    }
    if (rowData.birthStateProvince) {
      returnString += `${rowData.birthStateProvince}, `;
    }
    returnString += rowData.birthCountry;
    return returnString;
  }

  sortByPosition(a: any, b: any) {
    enum PositionCode {
      C = 1,
      L,
      R,
      D,
      G
    }
    const aCode = PositionCode[a.position.code];
    const bCode = PositionCode[b.position.code];
    if (aCode < bCode) {
      return -1;
    }
    return 1;
  }

  mounted() {
    this.handleNewTeamSelected();
  }
}
</script>

<style lang="scss">
#roster {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  padding: 0 20px;

  table {
    border-collapse: collapse;
    border-spacing: 0;
    margin: 28px;
    font-weight: 700;
    width: calc(100% - 56px);
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
        td {
          padding: 8px;
          border: 1px solid white;
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
}
</style>
