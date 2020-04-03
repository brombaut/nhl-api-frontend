<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
// import { standingsApi } from './services/nhl-api-adapter/standings-api';
// import { teamsApi } from "@/services/nhl-api-adapter/teams-api";
// import { Roster } from './types/store-types/roster';
// import { Team } from './types/store-types/team';
// import { playersApi } from "@/services/nhl-api-adapter/players-api";
// import { Player } from "./types/store-types/player";

@Component
export default class App extends Vue {
  mounted() {
    // teamsApi.getTeams().then((response: Array<Team>) => {
    //   console.log(response);
    // });
    // playersApi.getPlayerById(8471233).then((response: Player) => {
    //   console.log(response);
    // });
    // teamsApi.getTeamRoster(1).then((response: Roster) => {
    //   console.log(response);
    // });
    // standingsApi.getRegularSeasonStandings().then((response: any) => {
    //   console.log(response);
    // });
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
