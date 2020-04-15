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
import RadarChart from "@/components/charts/RadarChart.vue";
import AreaChart from "@/components/charts/AreaChart.vue";
import { RadarChartDataBuilder } from "../types/data-types/radar-chart-data-builder";
import { RadarChartData } from "../types/data-types/radar-chart-data";

@Component({
  components: {
    RadarChart,
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
    return this.buildTeamStatsChart(attributes);
  }

  get ppPkRadarChartData() {
    const attributes = [
      "powerPlayPercentage",
      "powerPlayGoals",
      "powerPlayGoalsAgainst",
      "powerPlayOpportunities",
      "penaltyKillPercentage"
    ];
    return this.buildTeamStatsChart(attributes);
  }

  buildTeamStatsChart(attributes: Array<string>) {
    const stats: { singleSeason: object; ranked: object } = this.tempStatSplits;
    const chartBuilder = new RadarChartDataBuilder();
    chartBuilder
      .setAttributes(attributes)
      .setYValuesSource(stats.ranked)
      .setYLabelsSource(stats.singleSeason)
      .setUseNhlRanking(true);
    const chartData: RadarChartData = chartBuilder.buildRadarChartData();
    return chartData;
  }
}
</script>

<style lang="scss">
#team-stats {
  display: flex;
  flex-direction: column;
  overflow-x: auto;
}
</style>
