<template>
  <div id="player-details-panel" :style="panelStyle">
    <header v-show="selectedPlayerId" :style="headerStyle">
      <span v-show="selectedPlayerId" class="close" @click="close()">+</span>
      <div class="circle-player-number" :style="circleStyle">
        <div class="player-number">{{ selectedPlayer.primaryNumber }}</div>
      </div>
    </header>
    <div class="details-panel" v-show="selectedPlayerId">
      <h4 class="name">{{ firstName }}<br />{{ lastName }} {{ nameSuffix }}</h4>
      <h4 class="gen-info">
        <div>
          <span class="gen-info-label" :style="genInfoLabelStyle">Age: </span>
          {{ selectedPlayer.currentAge }}
        </div>
        <span class="gen-info-label" :style="genInfoLabelStyle">|</span>
        <div>
          <span class="gen-info-label" :style="genInfoLabelStyle">Height: </span
          >{{ selectedPlayer.height }}
        </div>
        <span class="gen-info-label" :style="genInfoLabelStyle">|</span>
        <div>
          <span class="gen-info-label" :style="genInfoLabelStyle"
            >Weight:
          </span>
          {{ selectedPlayer.weight }}
        </div>
      </h4>
      <h4 class="gen-info">
        <div>
          <span class="gen-info-label" :style="genInfoLabelStyle"
            >Position: </span
          >{{ selectedPlayer.primaryPosition.name }}
        </div>
        <span class="gen-info-label" :style="genInfoLabelStyle">|</span>
        <div>
          <span class="gen-info-label" :style="genInfoLabelStyle"
            >Shoots/Catches: </span
          >{{ selectedPlayer.shootsCatches }}
        </div>
      </h4>
      <h4 class="gen-info">
        <div>
          <span class="gen-info-label" :style="genInfoLabelStyle"
            >Birth Date: </span
          >{{ selectedPlayer.birthDate }}
        </div>
      </h4>
      <h4 class="gen-info">
        <div>
          <span class="gen-info-label" :style="genInfoLabelStyle"
            >Birth Place: </span
          >{{ selectedPlayer.fullBirthPlace }}
        </div>
      </h4>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { TeamLogosModule } from "../store/modules/team-logos";
import { PlayersModule } from "../store/modules/players";
import { TeamsModule } from "../store/modules/teams";
import { Player } from "../types/store-types/player";

@Component
export default class PlayerDetailsPanel extends Vue {
  get panelStyle() {
    return {
      "background-color": TeamLogosModule.selectedPrimaryColor,
      "border-color": TeamLogosModule.selectedSecondaryColor,
      color: TeamLogosModule.selectedSecondaryColor
    };
  }

  get headerStyle() {
    return {
      "background-color": TeamLogosModule.selectedPrimaryColor,
      "border-color": TeamLogosModule.selectedSecondaryColor
    };
  }

  get circleStyle() {
    return {
      "border-color": TeamLogosModule.selectedSecondaryColor,
      "background-color": TeamLogosModule.selectedPrimaryColor,
      color: TeamLogosModule.selectedSecondaryColor,
      "-webkit-text-stroke-width": "3px",
      "-webkit-text-stroke-color": TeamLogosModule.selectedBackdropColor
    };
  }

  get genInfoLabelStyle() {
    return {
      color: TeamLogosModule.selectedBackdropColor
    };
  }

  get selectedPlayerId() {
    return PlayersModule.selectedPlayerId;
  }

  get selectedPlayer() {
    return PlayersModule.selectedPlayer;
  }

  get selectedTeamId() {
    return TeamsModule.selectedTeamId;
  }

  @Watch("selectedPlayerId")
  openClosePanel(playerId: number) {
    if (playerId === 0) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  @Watch("selectedTeamId")
  close() {
    PlayersModule.selectPlayerById(0);
    this.closePanel();
  }

  openPanel() {
    const el: HTMLDivElement = this.$el as HTMLDivElement;
    el.style.width = "320px";
  }

  closePanel() {
    const el: HTMLDivElement = this.$el as HTMLDivElement;
    el.style.width = "0px";
  }

  get firstName() {
    return this.selectedPlayer.firstName;
  }

  get lastName() {
    return this.selectedPlayer.lastName;
  }

  get nameSuffix() {
    if (this.selectedPlayer.captain) {
      return "(C)";
    }
    if (this.selectedPlayer.alternateCaptain) {
      return "(A)";
    }
    return "";
  }

  buildPlayerBirthPlaceString(player: Player) {
    let returnString = "";
    if (player.birthCity) {
      returnString += `${player.birthCity}, `;
    }
    if (player.birthStateProvince) {
      returnString += `${player.birthStateProvince}, `;
    }
    returnString += player.birthCountry;
    return returnString;
  }

  mounted() {
    this.openClosePanel(this.selectedPlayerId);
  }
}
</script>

<style lang="scss">
#player-details-panel {
  width: 0; // 320px;
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

    .close {
      position: absolute;
      right: 12px;
      top: 0px;
      opacity: 0.7;
      transition: 0.2s;
      transform: rotate(45deg);
      color: white;
      font-size: 4rem;

      &:hover {
        opacity: 1;
        cursor: pointer;
        transform: scale(1.1) rotate(45deg);
      }
    }

    .circle-player-number {
      height: 240px;
      width: 240px;
      border: 8px solid #1c2532;
      border-radius: 50%;
      margin: 4px 0px;
      position: absolute;
      bottom: -90px;
      display: flex;
      align-items: cemter;
      justify-content: center;

      .player-number {
        display: flex;
        align-items: center;
        font-size: 160px;
        font-weight: 800;
      }
    }
  }

  .details-panel {
    padding: 40px 4px;
    margin-top: 10px;
    flex: 1;

    .name {
      text-transform: uppercase;
      font-size: 2.3rem;
      font-weight: 800;
    }
    // TODO: Remove
    .gen-info {
      display: flex;
      width: 100%;
      padding: 4px 0px;
      justify-content: space-around;

      .gen-info-label {
        color: #9c9c9c;
        // filter: brightness(50%);
      }
    }
  }
}
</style>
