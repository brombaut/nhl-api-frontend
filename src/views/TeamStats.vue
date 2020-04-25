<template>
  <div id="team-stats">
    <AreaChart :chartData="generalAttributesChartData" />
    <AreaChart :chartData="ppPkChartData" />
    <AreaChart :chartData="winningStatsChartData" />
    <AreaChart :chartData="shootingStatsChartData" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { StatsModule } from "../store/modules/stats";
import { TeamsModule } from "../store/modules/teams";
import AreaChart from "@/components/charts/AreaChart.vue";
import { ChartDataBuilder } from "../types/data-types/chart-data-builder";
import { ChartData } from "../types/data-types/chart-data";
import App from "@/App.vue";

@Component({
  components: {
    AreaChart
  }
})
export default class TeamStats extends Vue {
  mounted() {
    this.loadingFinished(this.tempStatSplits);
  }

  @Watch("tempStatSplits")
  loadingFinished(statsSplits: { singleSeason: object; ranked: object }) {
    const parentElem = this.$parent as App;
    const loading =
      Object.keys(statsSplits.singleSeason).length === 0 &&
      statsSplits.singleSeason.constructor === Object &&
      Object.keys(statsSplits.ranked).length === 0 &&
      statsSplits.ranked.constructor === Object;
    if (!loading) {
      parentElem.removeViewLoadingOverlay();
    } else {
      parentElem.showViewLoadingOverlay();
    }
  }

  get tempStatSplits() {
    const teamId = TeamsModule.selectedTeamId;
    return {
      singleSeason: StatsModule.singleSeasonStatsForTeam(teamId),
      ranked: StatsModule.regularSeasonRankingStatsForTeam(teamId)
    };
  }

  get generalAttributesChartData() {
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

  get ppPkChartData() {
    const attributes = [
      "powerPlayPercentage",
      "powerPlayGoals",
      "powerPlayGoalsAgainst",
      "powerPlayOpportunities",
      "penaltyKillPercentage"
    ];
    const title = "Special Teams";
    return this.buildTeamStatsChart(title, attributes);
  }

  get winningStatsChartData() {
    const attributes = [
      "winScoreFirst",
      "winOppScoreFirst",
      "winLeadFirstPer",
      "winLeadSecondPer",
      "winOutshootOpp",
      "winOutshotByOpp"
    ];
    const title = "Winning Stats";
    return this.buildTeamStatsChart(title, attributes);
  }

  get shootingStatsChartData() {
    const attributes = [
      "shotsPerGame",
      // "shootingPct",
      "shotsAllowed",
      // "savePct",
      "faceOffsTaken",
      "faceOffsWon",
      "faceOffsLost",
      "faceOffWinPercentage"
    ];
    const title = "Shooting & Faceoffs";
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
