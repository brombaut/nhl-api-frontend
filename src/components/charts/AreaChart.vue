<template>
  <div class="radar-chart">
    <apexchart :options="options" :series="series" height="350" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { TeamLogosModule } from "../../store/modules/team-logos";
import { RadarChartData } from "../../types/data-types/radar-chart-data";

@Component
export default class AreaChart extends Vue {
  @Prop({ required: true })
  private chartData!: RadarChartData;

  mounted() {
    this.showChartData();
  }

  @Watch("chartData")
  showChartData() {
    console.log(this.chartData);
  }

  get options() {
    const options = {
      labels: this.chartData.xLabels,
      chart: {
        type: "area",
        height: 350,
        width: "100%",
        foreColor: TeamLogosModule.selectedSecondaryColor,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 1000,
          animateGradually: {
            enabled: true,
            delay: 500
          },
          dynamicAnimation: {
            enabled: true,
            speed: 500
          }
        }
      },
      colors: [TeamLogosModule.selectedPrimaryColor],
      fill: {
        colors: [TeamLogosModule.selectedPrimaryColor],
        opacity: 0.8,
        type: "solid"
      },
      yaxis: {
        opposite: true,
        tickAmount: 6,
        min: 0,
        max: 30,
        title: {
          text: "NHL Rank",
          rotate: 90,
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: "20px",
            fontWeight: 600,
            cssClass: "apexcharts-yaxis-title"
          }
        },
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [],
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label"
          },
          offsetX: -12,
          offsetY: 0,
          rotate: 0,
          formatter: (value: number) => {
            return 31 - value;
          }
        }
      },
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          borderRadius: 2,
          foreColor: TeamLogosModule.selectedSecondaryColor,
          borderColor: TeamLogosModule.selectedSecondaryColor,
          opacity: 1
        },
        style: {
          colors: Array(this.chartData.yLabels.length).fill(
            TeamLogosModule.selectedBackdropColor
          )
        },
        formatter: (value: any, options: any) => {
          const associatedLabel = this.chartData.yLabels[
            options.dataPointIndex
          ];
          if (associatedLabel) {
            return associatedLabel;
          }
          return value;
        }
      },
      markers: {
        size: 3
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        custom: undefined,
        fillSeriesColor: false,
        theme: "dark",
        style: {
          fontColor: TeamLogosModule.selectedPrimaryColor
        },
        x: {
          show: true
        },
        y: {
          formatter: undefined,
          title: {
            formatter: (seriesName: any) => seriesName
          }
        }
        // marker: {
        //   show: false,
        // },
      }
    };
    return options;
  }

  get series() {
    const series = [{ data: this.chartData.yValues }];
    return series;
  }
}
</script>

<style lang="scss">
.radar-chart {
  // height: 400px;
}
</style>
