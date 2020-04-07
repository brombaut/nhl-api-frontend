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
    <MenuPaneNav />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { TeamsModule } from "../store/modules/teams";
import { TeamLogosModule } from "../store/modules/team-logos";
import { NullTeam } from "../types/store-types/team";
import MenuPaneNav from "./MenuPaneNav.vue";

@Component({
  components: {
    MenuPaneNav
  }
})
export default class MenuPane extends Vue {
  get selectedTeam() {
    return TeamsModule.selectedTeam instanceof NullTeam
      ? null
      : TeamsModule.selectedTeam;
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
      "background-color": TeamLogosModule.selectedPrimaryColor,
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
  width: 320px;
  background-color: #283243;
  border-right: 8px solid #323e4f;
  border-left: 8px solid #323e4f;
  transition: ease 0.3s;
  padding-top: 0px;
  position: relative;
  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    height: 200px;
    border-bottom: 8px solid white;
    position: relative;
    display: flex;
    justify-content: center;
    transition: ease 0.3s background-color;

    img {
      height: 260px;
      width: 260px;
      border: 4px solid #1c2532;
      border-radius: 50%;
      margin: 4px 0px;
      position: absolute;
      bottom: -100px;
    }

    svg {
      position: absolute;
      bottom: -48px;
      color: black;
      border-radius: 50%;
    }
  }
}
</style>
