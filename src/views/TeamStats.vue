<template>
  <div id="team-stats">
    <AreaChart :chartData="firstRadarChartData" />
    <AreaChart :chartData="ppPkRadarChartData" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { StatsModule } from "../store/modules/stats";
import { TeamsModule } from "../store/modules/teams";
import AreaChart from "@/components/charts/AreaChart.vue";
import { ChartDataBuilder } from "../types/data-types/chart-data-builder";
import { ChartData } from "../types/data-types/chart-data";

@Component({
  components: {
    AreaChart
  }
})
export default class TeamStats extends Vue {
  get tempStatSplits() {
    const teamId = TeamsModule.selectedTeamId;
    return {
      singleSeason: StatsModule.singleSeasonStatsForTeam(teamId),
      ranked: StatsModule.regularSeasonRankingStatsForTeam(teamId)
    };
  }

  get firstRadarChartData() {
    const attributes = [
      "wins",
      "losses",
      "ot",
      "pts",
      "ptPctg",
      "goalsPerGame",
      "goalsAgainstPerGame"
    ];
    const title = "General";
    return this.buildTeamStatsChart(title, attributes);
  }

  get ppPkRadarChartData() {
    const attributes = [
      "powerPlayPercentage",
      "powerPlayGoals",
      "powerPlayGoalsAgainst",
      "powerPlayOpportunities",
      "penaltyKillPercentage"
    ];
    const title = "Power Play & Penalty Kill";
    return this.buildTeamStatsChart(title, attributes);
  }

  buildTeamStatsChart(title: string, attributes: Array<string>) {
    const stats: { singleSeason: object; ranked: object } = this.tempStatSplits;
    const chartBuilder = new ChartDataBuilder();
    chartBuilder
      .setTitle(title)
      .setAttributes(attributes)
      .setYValuesSource(stats.ranked as { [key: string]: string })
      .setYLabelsSource(stats.singleSeason as { [key: string]: string })
      .setUseNhlRanking(true);
    const chartData: ChartData = chartBuilder.buildRadarChartData();
    return chartData;
  }
}
</script>

<style lang="scss">
#team-stats {
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  padding: 8px 20px;
}
</style>
