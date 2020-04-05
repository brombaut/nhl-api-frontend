<template>
  <li class="team-selector-icon">
    <img
      :src="imageUrl()"
      :style="imageComputedStyle"
      v-bind:alt="teamAbbreviation"
      @click="teamIconClicked"
    />
  </li>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { TeamLogo } from "../types/data-types/team-logo";
import { TeamsModule } from "../store/modules/teams";

@Component
export default class TeamSelectorIcon extends Vue {
  @Prop({ required: true })
  teamLogo!: TeamLogo;

  get teamAbbreviation() {
    return this.teamLogo.abbreviation;
  }

  get imageComputedStyle() {
    return {
      "border-color": this.teamLogo.primaryColor
    };
  }

  private imageUrl() {
    return require(`../assets/team-logos/${this.teamLogo.fileName}`);
  }

  teamIconClicked() {
    const team = TeamsModule.teamByAbbreviation(this.teamLogo.abbreviation);
    if (team) {
      TeamsModule.selectTeamById(team.id);
      this.$emit("team-icon-clicked", this.$el);
    }
  }
}
</script>

<style lang="scss">
.team-selector-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 4px 0;

  img {
    height: 68px;
    width: 68px;
    border: 3px solid #1c2532;
    border-radius: 50%;
    margin: 4px 0px;
    transition-duration: 100ms;

    &:hover {
      cursor: pointer;
      border-color: white !important;
      transform: scale(1.05);
    }
  }
}
</style>
