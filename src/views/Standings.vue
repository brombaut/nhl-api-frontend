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
            v-for="(record, rowIndex) in standings.teamRecords"
            :key="record.teamId"
            :style="rowIndex % 2 === 0 ? evenTableRowStyle : oddTableRowStyle"
          >
            <td :style="tableDataCellBrightStyle">{{ rowIndex + 1 }}</td>
            <td :style="tableDataCellStyle" class="team-name-cell">
              <div
                class="team-name-container"
                :style="teamDataCellStyles(record.teamId)"
              >
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
import { Component, Watch } from "vue-property-decorator";
import { StandingsModule } from "../store/modules/standings";
import { TeamLogosModule } from "../store/modules/team-logos";
import { TeamsModule } from "../store/modules/teams";
import { StandingsRecord } from "../types/store-types/standings";
import { DivisionsModule } from "../store/modules/divisions";
import StandingsTypeSelector from "@/components/StandingsTypeSelector.vue";
import { ConferencesModule } from "../store/modules/conferences";
import { StandingsTeamRecord } from "../types/store-types/stadings-team-record";
import ColorUtils from "@/utils/color-utils";

@Component({
  components: {
    StandingsTypeSelector
  }
})
export default class Standings extends Vue {
  evenRowColor = "";
  oddRowColor = "";

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
    const sortedRecords: Array<StandingsRecord> = [];
    const standingsRecords = [...StandingsModule.selectedStandings];
    const selectedTeamId = TeamsModule.selectedTeamId;
    for (let i = 0; i < standingsRecords.length; ++i) {
      const recordContainsTeamId: boolean = standingsRecords[
        i
      ].teamRecords.some((teamRec: StandingsTeamRecord) => {
        return teamRec.teamId === selectedTeamId;
      });
      if (recordContainsTeamId) {
        sortedRecords.push(standingsRecords[i]);
        standingsRecords.splice(i, 1);
        break;
      }
    }
    sortedRecords.push(...standingsRecords);
    return sortedRecords;
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

  teamDataCellStyles(teamId: number) {
    if (TeamsModule.selectedTeamId === teamId) {
      return this.tableDataCellBrightStyle;
    }
    return this.tableDataCellStyle;
  }

  teamNameById(teamId: number): string {
    return TeamsModule.teamById(teamId).shortName;
  }

  imageUrlByTeamId(teamId: number) {
    const team = TeamsModule.teamById(teamId);
    const teamLogo = TeamLogosModule.teamLogoByAbbreviation(team.abbreviation);
    return require(`../assets/team-logos/${teamLogo.fileName}`);
  }

  get selectedTeamId() {
    return TeamsModule.selectedTeamId;
  }

  @Watch("selectedTeamId")
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
}
</style>
