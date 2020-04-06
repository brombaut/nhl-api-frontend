<template>
  <div id="app">
    <TeamSelector />
    <MenuPane />
    <main :style="mainStyles">
      <!-- <MainHeader /> -->
      <router-view />
    </main>
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
import { TeamLogosModule } from "./store/modules/team-logos";

@Component({
  components: {
    TeamSelector,
    MenuPane
  }
})
export default class App extends Vue {
  private get mainStyles() {
    return {
      "background-color": TeamLogosModule.selectedBackdropColor
    };
  }

  public loadInitialData(): void {
    ConferencesModule.loadConferences();
    DivisionsModule.loadDivisions();
    TeamsModule.loadTeams();
    StandingsModule.loadStandingsTypes();
  }

  mounted() {
    this.loadInitialData();
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #1c2532;
  height: 100%;
  width: 100%;
  display: flex;

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    transition: 0.3s background-color;
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
