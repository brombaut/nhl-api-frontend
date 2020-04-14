<template>
  <div class="radar-chart">
    <apexchart :options="options" :series="series"> </apexchart>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { TeamLogosModule } from "../../store/modules/team-logos";
import { RadarChartData } from "../../types/data-types/radar-chart-data";

@Component
export default class RadarChart extends Vue {
  @Prop({ required: true })
  private chartData!: RadarChartData;

  get options() {
    const options = {
      chart: this.chartOptions,
      title: this.titleOptions,
      colors: [TeamLogosModule.selectedSecondaryColor],
      stroke: this.strokeOptions,
      fill: this.fillOptions,
      plotOptions: this.plotOptions,
      xaxis: this.xAxisOptions,
      yaxis: this.yAxisOptions,
      dataLabels: this.dataLabelsOptions,
      tooltip: this.tooltipOptions
    };
    return options;
  }

  get series() {
    const series = [
      {
        name: "Series 1",
        data: this.chartData.yValues
      }
    ];
    return series;
  }

  get chartOptions() {
    return {
      type: "radar",
      foreColor: TeamLogosModule.selectedSecondaryColor
    };
  }

  get titleOptions() {
    return {
      text: "A Radar Chart"
    };
  }

  get strokeOptions() {
    return {
      show: true,
      width: 2,
      colors: [TeamLogosModule.selectedBackdropColor],
      dashArray: 0
    };
  }

  get fillOptions() {
    return {
      colors: [TeamLogosModule.selectedSecondaryColor],
      opacity: 0.9
    };
  }

  get plotOptions() {
    return {
      radar: {
        polygons: {
          strokeColor: TeamLogosModule.selectedSecondaryColor,
          fill: {
            colors: [TeamLogosModule.selectedPrimaryColor]
          }
        }
      }
    };
  }

  get xAxisOptions() {
    return {
      categories: this.chartData.xLabels,
      labels: {
        show: true,
        style: {
          colors: Array(this.chartData.xLabels.length).fill(
            TeamLogosModule.selectedSecondaryColor
          ),
          fontSize: "18px"
        }
      }
    };
  }

  get yAxisOptions() {
    return {
      show: false,
      tooltip: {
        enabled: false,
        offsetX: 0
      }
    };
  }

  get dataLabelsOptions() {
    return {
      enabled: true,
      background: {
        enabled: true,
        borderRadius: 2,
        foreColor: TeamLogosModule.selectedSecondaryColor,
        borderColor: TeamLogosModule.selectedSecondaryColor,
        opacity: 1
      },
      style: {
        fontSize: "12px",
        colors: Array(this.chartData.yLabels.length).fill(
          TeamLogosModule.selectedBackdropColor
        )
      },
      formatter: (value: any, options: any) => {
        const associatedLabel = this.chartData.yLabels[options.dataPointIndex];
        if (associatedLabel) {
          return associatedLabel;
        }
        return value;
      }
    };
  }

  get tooltipOptions() {
    const tooltip = {
      enabled: false
    };
    return tooltip;
  }
}
</script>

<style lang="scss"></style>
