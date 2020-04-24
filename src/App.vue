<template>
  <div id="app">
    <link
      href="https://fonts.googleapis.com/css?family=Lato"
      rel="stylesheet"
    />
    <TeamSelector />
    <MenuPane />
    <main :style="mainStyles">
      <!-- <MainHeader /> -->
      <router-view />
    </main>
    <div id="app-loading-modal">
      <div class="square one"></div>
      <div class="square two"></div>
      <div class="square three"></div>
      <div class="square four"></div>
    </div>
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

  hideLoading() {
    const elem: HTMLDivElement = document.querySelector(
      "#app-loading-modal"
    ) as HTMLDivElement;
    elem.style.opacity = "0";
    setTimeout(() => {
      elem.parentNode?.removeChild(elem);
    }, 1000);
  }

  mounted() {
    this.loadInitialData();
    setTimeout(this.hideLoading, 2000);
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

  #app-loading-modal {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 99;
    background-color: $neutral-dark;
    display: flex;
    align-items: center;
    justify-content: center;
    transition-property: opacity;
    transition-duration: 1s;

    .square {
      width: 20px;
      height: 10px;
      margin: 10px;
      position: relative;
      background-color: $loading-square-1;
      animation-name: loading;
      opacity: 1;
      animation-duration: 0.8s;
      animation-delay: 0s;
      animation-iteration-count: infinite;
    }

    .two {
      background-color: $loading-square-2;
      animation-delay: -0.5s;
    }
    .three {
      background-color: $loading-square-3;
      animation-delay: -0.6s;
    }
    .four {
      background-color: $loading-square-4;
      animation-delay: -0.3s;
    }

    @keyframes loading {
      0% {
        height: 10px;
      }
      10% {
        height: 11px;
      }
      15% {
        height: 12px;
      }
      20% {
        height: 13px;
      }
      25% {
        height: 14px;
      }
      30% {
        height: 15px;
      }
      35% {
        height: 16px;
      }
      40% {
        height: 17px;
      }
      45% {
        height: 18px;
      }
      50% {
        height: 19px;
      }
      55% {
        height: 20px;
      }
      60% {
        height: 21px;
      }
      65% {
        height: 22px;
      }
      70% {
        height: 23px;
      }
      75% {
        height: 24px;
      }
      80% {
        height: 25px;
      }
      85% {
        height: 26px;
      }
      90% {
        height: 27px;
      }
      95% {
        height: 28px;
      }
      100% {
        height: 29px;
      }
    }
  }
}
</style>
