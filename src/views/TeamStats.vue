<template>
  <div id="team-stats">
    <RadarChart :chartData="firstRadarChartData" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { StatsModule } from "../store/modules/stats";
import { TeamsModule } from "../store/modules/teams";
import RadarChart from "@/components/charts/RadarChart.vue";
import { RadarChartDataBuilder } from "../types/data-types/radar-chart-data-builder";
import { RadarChartData } from "../types/data-types/radar-chart-data";

@Component({
  components: {
    RadarChart
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
      "goalsAgainstPerGame",
      "evGGARatio"
    ];
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

<style lang="scss"></style>
