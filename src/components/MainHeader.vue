<template>
  <header class="header">
    <h1 :style="headerStyle">
      {{ teamName }}
    </h1>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { TeamsModule } from "../store/modules/teams";
import teamLogos from "@/data/team-logos";

@Component
export default class MainHeader extends Vue {
  get teamName() {
    if (!TeamsModule.selectedTeam) {
      return "";
    }
    return TeamsModule.selectedTeam.name;
  }

  get headerStyle() {
    return {
      color: this.teamPrimaryColor,
      "border-color": this.teamSecondaryColor,
      "-webkit-text-stroke-color": this.teamSecondaryColor
    };
  }

  get teamPrimaryColor() {
    if (!TeamsModule.selectedTeam) {
      return "white";
    }
    const selectedAbbreviation = TeamsModule.selectedTeam.abbreviation;
    const teamLogoObj = teamLogos.find(t => {
      return t.abbreviation === selectedAbbreviation;
    });
    if (!teamLogoObj) {
      return "white";
    }
    return teamLogoObj.primaryColor;
  }

  get teamSecondaryColor() {
    if (!TeamsModule.selectedTeam) {
      return "white";
    }
    const selectedAbbreviation = TeamsModule.selectedTeam.abbreviation;
    const teamLogoObj = teamLogos.find(t => {
      return t.abbreviation === selectedAbbreviation;
    });
    if (!teamLogoObj) {
      return "white";
    }
    return teamLogoObj.secondaryColor;
  }
}
</script>

<style lang="scss">
.header {
  h1 {
    font-size: 5rem;
    text-transform: uppercase;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    margin-top: 8px;
    margin-bottom: 8px;
    font-family: "Anton", sans-serif;
    height: 142px;
    border-bottom: 4px solid white;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
