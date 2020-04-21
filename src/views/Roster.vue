<template>
  <div id="roster">
    <div class="tables-container">
      <RosterTable :rosterTableData="forwardsRosterTableData" />
      <RosterTable :rosterTableData="defenseRosterTableData" />
      <RosterTable :rosterTableData="goaliesRosterTableData" />
    </div>
    <PlayerDetailsPanel />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { RostersModule } from "../store/modules/rosters";
import { RosterRelation } from "../types/store-types/roster-relation";
import { PlayersModule } from "../store/modules/players";
import { Player } from "../types/store-types/player";
import { TableDataRow } from "../types/data-types/table-data-row";
import { RosterTableData } from "../types/data-types/roster-table-data";
import PlayerDetailsPanel from "@/components/PlayerDetailsPanel.vue";
import RosterTable from "@/components/RosterTable.vue";

type RosterRowData = RosterRelation & Player;

@Component({
  components: {
    PlayerDetailsPanel,
    RosterTable
  }
})
export default class Roster extends Vue {
  rosterTableColumns: string[] = [
    "Player",
    "#",
    "Pos",
    "S/C",
    "Ht",
    "Wt",
    "Born",
    "Birthplace"
  ];

  get forwardsRosterTableData() {
    const title = "Forwards";
    const forwards: Array<RosterRowData> = this.rosterForwardRowsData;
    const rows: TableDataRow[] = forwards.map(this.buildTableRowValues);
    return new RosterTableData(title, this.rosterTableColumns, rows);
  }

  get defenseRosterTableData() {
    const title = "Defense";
    const defense: Array<RosterRowData> = this.rosterDefenseRowsData;
    const rows: TableDataRow[] = defense.map(this.buildTableRowValues);
    return new RosterTableData(title, this.rosterTableColumns, rows);
  }

  get goaliesRosterTableData() {
    const title = "Goalies";
    const goalies: Array<RosterRowData> = this.rosterGoalieRowsData;
    const rows: TableDataRow[] = goalies.map(this.buildTableRowValues);
    return new RosterTableData(title, this.rosterTableColumns, rows);
  }

  get rosterForwardRowsData() {
    return this.rosterPlayersByType("Forward");
  }

  get rosterDefenseRowsData() {
    return this.rosterPlayersByType("Defenseman");
  }

  get rosterGoalieRowsData() {
    return this.rosterPlayersByType("Goalie");
  }

  rosterPlayersByType(type: string): Array<RosterRowData> {
    const rrs = RostersModule.selectedTeamRosterRelations;
    const rows: Array<RosterRowData> = [];
    try {
      rrs.forEach((rr: RosterRelation) => {
        if (rr.position.type === type) {
          rows.push(this.buildRosterRelationAndPlayerIntersection(rr));
        }
      });
    } catch (err) {
      return rows;
    }
    return rows.sort(this.sortByLastName);
  }

  buildRosterRelationAndPlayerIntersection(rr: RosterRelation): RosterRowData {
    const player = PlayersModule.playerById(rr.personId);
    const rowObj: RosterRowData = { ...rr, ...player };
    return rowObj;
  }

  sortByLastName(a: RosterRowData, b: RosterRowData) {
    const aName = a.lastName;
    const bName = b.lastName;
    if (aName < bName) {
      return -1;
    }
    return 1;
  }

  buildTableRowValues(player: RosterRowData): TableDataRow {
    const values: string[] = [
      player.playerNameWithCaptainSuffix,
      player.jerseyNumber,
      player.position.code,
      player.shootsCatches,
      player.height,
      player.weight.toString(),
      player.birthDate,
      player.fullBirthPlace
    ];
    const clickCallback = () => PlayersModule.selectPlayerById(player.id);
    return new TableDataRow(values, clickCallback);
  }
}
</script>

<style lang="scss">
#roster {
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
