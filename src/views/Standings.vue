<template>
  <div id="standings">
    <div>Standings</div>
    <table
      v-for="(standings, index) in standingsTableData"
      :key="index"
      :style="tableStyle"
    >
      <thead>
        <tr>
          <th
            class="table-main-header"
            :style="tableHeaderCellStyle"
            colspan="10"
          >
            {{ getTableHeader(standings) }}
          </th>
        </tr>
        <tr>
          <th :style="tableHeaderCellStyle">Team</th>
          <th :style="tableHeaderCellStyle">GP</th>
          <th :style="tableHeaderCellStyle">W</th>
          <th :style="tableHeaderCellStyle">L</th>
          <th :style="tableHeaderCellStyle">OT</th>
          <th :style="tableHeaderCellStyle">PTS</th>
          <th :style="tableHeaderCellStyle">RW</th>
          <th :style="tableHeaderCellStyle">ROW</th>
          <th :style="tableHeaderCellStyle">GF</th>
          <th :style="tableHeaderCellStyle">GA</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="record in standings.teamRecords"
          :key="record.teamId"
          :style="tableDataRowStyle"
        >
          <td :style="tableDataCellStyle">{{ teamNameById(record.teamId) }}</td>
          <td :style="tableDataCellStyle">{{ record.gamesPlayed }}</td>
          <td :style="tableDataCellStyle">{{ record.leagueRecord.wins }}</td>
          <td :style="tableDataCellStyle">{{ record.leagueRecord.losses }}</td>
          <td :style="tableDataCellStyle">{{ record.leagueRecord.ot }}</td>
          <td :style="tableDataCellStyle">{{ record.points }}</td>
          <td :style="tableDataCellStyle">{{ record.regulationWins }}</td>
          <td :style="tableDataCellStyle">{{ record.row }}</td>
          <td :style="tableDataCellStyle">{{ record.goalsScored }}</td>
          <td :style="tableDataCellStyle">{{ record.goalsAgainst }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { StandingsModule } from "../store/modules/standings";
import { TeamLogosModule } from "../store/modules/team-logos";
import { TeamsModule } from "../store/modules/teams";
import { StandingsRecord } from "../types/store-types/standings";
import { DivisionsModule } from "../store/modules/divisions";

@Component
export default class Standings extends Vue {
  getTableHeader(standingsObj: StandingsRecord) {
    if (standingsObj.divisionId) {
      return DivisionsModule.divisionById(standingsObj.divisionId)?.name;
    }
    // TODO: This
  }

  get standingsTableData() {
    return StandingsModule.selectedStandings;
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

  get tableDataRowStyle() {
    return {
      "border-color": TeamLogosModule.selectedPrimaryColor
    };
  }

  get tableDataCellStyle() {
    return {
      "border-color": TeamLogosModule.selectedSecondaryColor
    };
  }

  teamNameById(teamId: number): string {
    return TeamsModule.teamById(teamId).shortName;
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
  padding: 20px;

  table {
    border-spacing: 0;
    margin: 20px;
    font-weight: 700;
    width: 100%;
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
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 8px;
          border: 1px solid white;
        }
      }
    }
  }
}
</style>
