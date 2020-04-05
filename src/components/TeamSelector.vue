<template>
  <nav id="team-selector">
    <div class="scrollable">
      <span class="highlight"></span>
      <ul>
        <TeamSelectorIcon
          v-for="team in teamLogos"
          :key="team.abbreviation"
          :teamLogo="team"
          @team-icon-clicked="updateHighlight"
        />
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import TeamSelectorIcon from "@/components/TeamSelectorIcon.vue";
import { TeamLogo } from "../types/data-types/team-logo";
import { TeamLogosModule } from "../store/modules/team-logos";

@Component({
  components: {
    TeamSelectorIcon
  }
})
export default class TeamSelector extends Vue {
  get teamLogos(): Array<TeamLogo> {
    return TeamLogosModule.sortedTeamLogos;
  }

  private updateHighlight(el: HTMLInputElement): void {
    const linkCoords: DOMRect = el.getBoundingClientRect();
    const scrollEl = document.querySelector<HTMLDivElement>(".scrollable");
    const highlight = document.querySelector<HTMLSpanElement>(".highlight");
    if (!scrollEl || !highlight) {
      return;
    }
    const coords = {
      width: linkCoords.width,
      height: linkCoords.height,
      top: linkCoords.top + scrollEl.scrollTop,
      left: linkCoords.left + scrollEl.scrollLeft
    };
    highlight.style.width = `${linkCoords.width + 16}px`;
    highlight.style.height = `${linkCoords.height + 8}px`;
    highlight.style.transform = `translate(${coords.left - 8}px, ${coords.top -
      4}px)`;
  }
}
</script>

<style lang="scss">
#team-selector {
  background-color: #283243;
  border-right: 1px solid #323e4f;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 0px);
  width: 132px;

  .scrollable {
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    position: relative;

    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      list-style: none;
      padding-left: 0;
    }

    .highlight {
      transition: all 0.2s;
      position: absolute;
      top: 0;
      background: #8c9096;
      left: 0;
      z-index: 0;
      border-radius: 40px;
      display: block;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
