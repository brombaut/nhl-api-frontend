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
      <PlayerDetailsInfoRow :pairs="rowInfo1" />
      <PlayerDetailsInfoRow :pairs="rowInfo2" />
      <PlayerDetailsInfoRow :pairs="rowInfo3" />
      <PlayerDetailsInfoRow :pairs="rowInfo4" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { TeamLogosModule } from "../store/modules/team-logos";
import { PlayersModule } from "../store/modules/players";
import { TeamsModule } from "../store/modules/teams";
import PlayerDetailsInfoRow from "@/components/PlayerDetailsInfoRow.vue";
import { LabelValuePair } from "../types/data-types/label-value-pair";

@Component({
  components: {
    PlayerDetailsInfoRow
  }
})
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

  get selectedPlayerId() {
    return PlayersModule.selectedPlayerId;
  }

  get selectedPlayer() {
    return PlayersModule.selectedPlayer;
  }

  get selectedTeamId() {
    return TeamsModule.selectedTeamId;
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

  get rowInfo1(): LabelValuePair[] {
    const labelValues: LabelValuePair[] = [
      new LabelValuePair("Age", this.selectedPlayer.currentAge),
      new LabelValuePair("Height", this.selectedPlayer.height),
      new LabelValuePair("Weight", this.selectedPlayer.weight.toString())
    ];
    return labelValues;
  }

  get rowInfo2(): LabelValuePair[] {
    const labelValues: LabelValuePair[] = [
      new LabelValuePair("Position", this.selectedPlayer.primaryPosition.name),
      new LabelValuePair("Shoots/Catches", this.selectedPlayer.shootsCatches)
    ];
    return labelValues;
  }

  get rowInfo3(): LabelValuePair[] {
    const labelValues: LabelValuePair[] = [
      new LabelValuePair("Birth Place", this.selectedPlayer.fullBirthPlace)
    ];
    return labelValues;
  }

  get rowInfo4(): LabelValuePair[] {
    const labelValues: LabelValuePair[] = [
      new LabelValuePair("Birth Date", this.selectedPlayer.birthDate)
    ];
    return labelValues;
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
  }
}
</style>
