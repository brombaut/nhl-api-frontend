<template>
  <nav class="menu-pane-options-wrapper">
    <ul>
      <li
        @click="setRoute('/standings')"
        :class="{
          selected: currentRoute === 'standings' || currentRoute === 'root'
        }"
        :style="navItemStyle"
      >
        Standings
      </li>
      <li
        @click="setRoute('/team-stats')"
        :class="{ selected: currentRoute === 'teamStats' }"
        :style="navItemStyle"
      >
        Stats
      </li>
      <li
        @click="setRoute('/roster')"
        :class="{ selected: currentRoute === 'roster' }"
        :style="navItemStyle"
      >
        Roster
      </li>
      <li
        @click="setRoute('/lines')"
        :class="{ selected: currentRoute === 'lines' }"
        :style="navItemStyle"
      >
        Lines
      </li>
      <!-- <li
        @click="setRoute('/special-lines')"
        :class="{ selected: currentRoute === 'specialLines' }"
        :style="navItemStyle"
      >
        PP / PK
      </li> -->
      <a
        class="marginTopAuto"
        :href="teamSiteUrl"
        target="_blank"
        :style="navItemStyle"
      >
        Official Site
      </a>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { TeamsModule } from "../store/modules/teams";
import { TeamLogosModule } from "../store/modules/team-logos";

@Component
export default class MenuPaneNav extends Vue {
  get currentRoute(): string {
    return this.$route.name || "";
  }

  get teamSiteUrl(): string {
    return TeamsModule.selectedTeam.officialSiteUrl;
  }

  get navItemStyle() {
    return {
      color: TeamLogosModule.selectedSecondaryColor
      // "-webkit-text-stroke-width": "1px",
      // "-webkit-text-stroke-color": TeamLogosModule.selectedBackdropColor
    };
  }

  setRoute(newRoutePath: string): void {
    if (newRoutePath === this.$route.path) {
      return;
    }
    this.$router.push(newRoutePath);
  }
}
</script>

<style lang="scss" scoped>
nav {
  margin-top: 68px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;

  ul {
    margin: 32px 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    list-style: none;
    padding-left: 0;
    flex: 1;

    a {
      text-decoration: inherit;
      color: inherit;
      cursor: auto;
    }

    a:visited {
      text-decoration: inherit;
      color: inherit;
      cursor: auto;
    }

    li,
    a {
      font-size: 2.3rem;
      font-weight: 800;
      margin: 8px 8px;
      padding: 4px 12px;
      text-align: left;
      width: calc(100% - 40px);
      border-radius: 8px;
      text-transform: uppercase;
      transition: ease 0.3s background-color;

      &:hover {
        background-color: #8c9096c9;
        cursor: pointer;
      }
    }

    .marginTopAuto {
      margin-top: auto;
    }

    .selected {
      background-color: #8c9096c9;
    }
  }
}
</style>
