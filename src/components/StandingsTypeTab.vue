<template>
  <div
    class="standings-type-tab"
    :style="standingsTypeTabStyle"
    @click="handleTabClick()"
  >
    <span>{{ formatStandingsTypeName(standingsType.name) }}</span>
    <hr :class="hrClass" :style="hrStyle" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { TeamLogosModule } from "../store/modules/team-logos";
import { StandingsType } from "../types/store-types/standings-type";
import { StandingsModule } from "../store/modules/standings";

@Component
export default class StandingsTypeTab extends Vue {
  @Prop({ required: true })
  standingsType!: StandingsType;

  get isSelected(): boolean {
    return (
      StandingsModule.selectedStandingsType?.name === this.standingsType.name
    );
  }

  get standingsTypeTabStyle() {
    return {
      color: TeamLogosModule.selectedSecondaryColor,
      "background-color": TeamLogosModule.selectedPrimaryColor
    };
  }

  get hrClass(): Array<string> {
    const classes = [];
    if (this.isSelected) {
      classes.push("showHr");
    }
    return classes;
  }

  get hrStyle() {
    return {
      "border-color": TeamLogosModule.selectedSecondaryColor
    };
  }

  formatStandingsTypeName(name: string): string {
    switch (name) {
      case "regularSeason":
        return "Regular Season";
      case "wildCard":
        return "Wild Card";
      case "divisionLeaders":
        return "Division Leaders";
      case "wildCardWithLeaders":
        return "Wildcard With Leaders";
      case "preseason":
        return "Preseason";
      case "postseason":
        return "Postseason";
      case "byDivision":
        return "Division";
      case "byConference":
        return "Conference";
      case "byLeague":
        return "League";
      default:
        return "";
    }
  }

  handleTabClick() {
    StandingsModule.selectStandingsType(this.standingsType);
  }
}
</script>

<style lang="scss">
.standings-type-tab {
  padding: 0px 48px;
  padding-top: 20px;
  padding-bottom: 16px;
  font-size: 1.3rem;
  font-weight: bold;

  hr {
    margin-bottom: 0;
    display: none;
    border: 2px solid white;
    border-radius: 2px;
    animation-name: expandIn;
    animation-duration: 0.3s;

    &.showHr {
      display: block;
    }
  }

  &:hover {
    cursor: pointer;

    hr {
      display: block;
    }
  }

  @keyframes expandIn {
    from {
      width: 0;
    }
    to {
      width: calc(100% - 4px);
    }
  }
}
</style>
