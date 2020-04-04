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
import { getModule } from "vuex-module-decorators";
import Teams from "./store/modules/teams";

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
    // TeamsModule.loadTeams();
    // const teamsModule = getModule(Teams);
    // console.log(getModule);
    const teamsModule = getModule(Teams);
    console.log(teamsModule);
    teamsModule.loadTeams();
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
