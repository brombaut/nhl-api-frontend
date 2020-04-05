<template>
  <div id="menu-pane" :style="menuPaneStyle">
    <header :style="headerStyle">
      <img
        v-if="selectedTeam"
        :src="imageUrl()"
        v-bind:alt="selectedTeam.abbreviation"
        :style="imageStyle"
      />
    </header>
    <nav class="menu-pane-options-wrapper">
      <ul></ul>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { TeamsModule } from "../store/modules/teams";
import { TeamLogosModule } from "../store/modules/team-logos";

@Component
export default class MenuPane extends Vue {
  get selectedTeam() {
    return TeamsModule.selectedTeam;
  }

  get headerStyle() {
    return {
      "background-color": TeamLogosModule.selectedPrimaryColor,
      "border-color": TeamLogosModule.selectedSecondaryColor
    };
  }

  get imageStyle() {
    return {
      "border-color": TeamLogosModule.selectedPrimaryColor
    };
  }

  get menuPaneStyle() {
    return {
      "background-color": TeamLogosModule.selectedBackdropColor,
      color: TeamLogosModule.selectedPrimaryColor,
      "border-color": TeamLogosModule.selectedSecondaryColor
    };
  }

  private imageUrl() {
    const fileName = TeamLogosModule.selectedFilename;
    if (fileName) {
      return require(`../assets/team-logos/${fileName}`);
    }
    return "";
  }
}
</script>

<style lang="scss">
#menu-pane {
  width: 360px;
  background-color: #283243;
  border-right: 8px solid #323e4f;
  border-left: 8px solid #323e4f;
  transition: 0.4s;
  padding-top: 0px;
  position: relative;

  header {
    width: 100%;
    height: 200px;
    border-bottom: 8px solid white;
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    transition: 0.3s background-color;

    img {
      height: 240px;
      width: 240px;
      border: 4px solid #1c2532;
      border-radius: 50%;
      margin: 4px 0px;
      transition-duration: 100ms;
      position: absolute;
      bottom: -80px;
    }

    svg {
      position: absolute;
      bottom: -48px;
      color: black;
      border-radius: 50%;
    }
  }

  nav {
    margin-top: 60px;
    width: 100%;

    ul {
      // margin: 16px 0px;
      // display: flex;
      // flex-direction: column;
      // align-items: flex-start;
      // list-style: none;
      // padding-left: 0;
      // width: 100%;

      // li {
      //   font-size: 1rem;
      //   transition: 0.3s;
      //   margin: 8px 8px;
      //   padding: 8px;
      //   text-align: left;
      //   width: calc(100% - 32px);
      //   border-radius: 8px;
      //   text-transform: uppercase;
      //   text-overflow: nowrap;

      //   &:hover {
      //     background-color: #6b7d96;
      //     cursor: pointer;
      //   }
      // }

      // .selected {
      //   background-color: #566479;
      // }
    }
  }
}
</style>
