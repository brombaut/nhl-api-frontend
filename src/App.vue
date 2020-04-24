<template>
  <div id="app">
    <link
      href="https://fonts.googleapis.com/css?family=Lato"
      rel="stylesheet"
    />
    <TeamSelector />
    <MenuPane />
    <main :style="mainStyles">
      <router-view />
      <LoadingOverlay ref="viewLoadingOverlay" :useTeamColors="true" />
    </main>
    <LoadingOverlay ref="mainLoadingOverlay" :useTeamColors="false" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { TeamsModule } from "./store/modules/teams";
import { DivisionsModule } from "./store/modules/divisions";
import { ConferencesModule } from "./store/modules/conferences";
import { StandingsModule } from "./store/modules/standings";
import TeamSelector from "@/components/TeamSelector.vue";
import MenuPane from "@/components/MenuPane.vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import { TeamLogosModule } from "./store/modules/team-logos";
import { TeamLogo } from "./types/data-types/team-logo";

@Component({
  components: {
    TeamSelector,
    MenuPane,
    LoadingOverlay
  }
})
export default class App extends Vue {
  private get mainStyles() {
    return {
      "background-color": TeamLogosModule.selectedBackdropColor
    };
  }

  loadInitialData(): void {
    ConferencesModule.loadConferences();
    DivisionsModule.loadDivisions();
    TeamsModule.loadTeams();
    StandingsModule.loadStandingsTypes();
  }

  requireImages() {
    TeamLogosModule.teamLogos.map((teamLogo: TeamLogo) => {
      require(`./assets/team-logos/${teamLogo.fileName}`);
    });
  }

  removeAppLoadingOverlay() {
    const overlay = this.$refs.mainLoadingOverlay as LoadingOverlay;
    overlay.removeLoadingOverlay();
  }

  public removeViewLoadingOverlay() {
    const overlay = this.$refs.viewLoadingOverlay as LoadingOverlay;
    overlay.removeLoadingOverlay();
  }

  public showViewLoadingOverlay() {
    const overlay = this.$refs.viewLoadingOverlay as LoadingOverlay;
    overlay.addLoadingOverlay();
  }

  mounted() {
    this.loadInitialData();
    this.requireImages();
    setTimeout(this.removeAppLoadingOverlay, 1000);
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

#app {
  font-family: "Lato", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #1c2532;
  height: 100%;
  width: 100%;
  display: flex;
  user-select: none;
  position: relative;

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    transition: 0.3s background-color;
    position: relative;
  }

  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #1c253270;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: darken(#1c2532, 5%);
  }
}
</style>
