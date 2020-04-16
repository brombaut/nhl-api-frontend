<template>
  <div class="radar-chart">
    <apexchart :options="options" :series="series" height="350" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { TeamLogosModule } from "../../store/modules/team-logos";
import { ChartData } from "../../types/data-types/chart-data";

@Component
export default class AreaChart extends Vue {
  @Prop({ required: true })
  private chartData!: ChartData;

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
      title: {
        text: this.chartData.title,
        align: "center",
        margin: 0,
        offsetX: 0,
        offsetY: 8,
        floating: false,
        style: {
          fontSize: "30px",
          fontWeight: "bold",
          color: TeamLogosModule.selectedPrimaryColor
        }
      },
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
      stroke: {
        curve: "straight"
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
          offsetX: 10,
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
          align: "left",
          minWidth: 0,
          maxWidth: 10,
          style: {
            colors: Array(this.chartData.yLabels.length).fill(
              TeamLogosModule.selectedSecondaryColor
            ),
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label"
          },
          offsetX: 100,
          offsetY: 0,
          rotate: 0,
          formatter: (value: number) => {
            return 31 - value;
          }
        }
      },
      xaxis: {
        labels: {
          show: true,
          align: "right",
          style: {
            fontWeight: "bold",
            fontSize: "16px",
            cssClass: "apexcharts-yaxis-label"
          }
        },
        tooltip: {
          enabled: false
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
        formatter: (value: number, options: { [key: string]: number }) => {
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
            formatter: (seriesName: string) => {
              return seriesName;
            }
          }
        }
      }
    };
    return options;
  }

  get series() {
    const series = [
      {
        data: this.chartData.yValues,
        name: "NHL Rank",
        type: "column"
      }
    ];
    return series;
  }
}
</script>

<style lang="scss"></style>
