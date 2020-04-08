<template>
  <div id="standings">
    <StandingsTypeSelector />
    <div class="tables-container">
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
              colspan="11"
            >
              {{ getTableHeader(standings) }}
            </th>
          </tr>
          <tr>
            <th :style="tableHeaderCellStyle">#</th>
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
            v-for="(record, index) in standings.teamRecords"
            :key="record.teamId"
            :style="tableDataRowStyle"
          >
            <td :style="tableDataCellStyle">{{ index + 1 }}</td>
            <td :style="tableDataCellStyle" class="team-name-cell">
              <div class="team-name-container">
                <img :src="imageUrlByTeamId(record.teamId)" />
                <span>{{ teamNameById(record.teamId) }}</span>
              </div>
            </td>
            <td :style="tableDataCellStyle">{{ record.gamesPlayed }}</td>
            <td :style="tableDataCellStyle">{{ record.leagueRecord.wins }}</td>
            <td :style="tableDataCellStyle">
              {{ record.leagueRecord.losses }}
            </td>
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
import StandingsTypeSelector from "@/components/StandingsTypeSelector.vue";
import { ConferencesModule } from "../store/modules/conferences";

@Component({
  components: {
    StandingsTypeSelector
  }
})
export default class Standings extends Vue {
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

  imageUrlByTeamId(teamId: number) {
    const team = TeamsModule.teamById(teamId);
    const teamLogo = TeamLogosModule.teamLogoByAbbreviation(team.abbreviation);
    return require(`../assets/team-logos/${teamLogo.fileName}`);
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

    table {
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
            padding: 8px;
            border: 1px solid white;

            .team-name-container {
              display: flex;
              align-items: center;

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
}
</style>
