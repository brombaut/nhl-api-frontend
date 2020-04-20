<template>
  <h4 class="player-details-info-row">
    <div>
      <span class="label" :style="genInfoLabelStyle">
        Age:
      </span>
      {{ selectedPlayer.currentAge }}
    </div>
    <span class="label" :style="genInfoLabelStyle">
      |
    </span>
    <div>
      <span class="label" :style="genInfoLabelStyle">
        Height
      </span>
      {{ selectedPlayer.height }}
    </div>
    <span class="label" :style="genInfoLabelStyle">
      |
    </span>
    <div>
      <span class="label" :style="genInfoLabelStyle">
        Weight:
      </span>
      {{ selectedPlayer.weight }}
    </div>
  </h4>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { TeamLogosModule } from "../store/modules/team-logos";
import { LabelValuePair } from "../types/data-types/label-value-pair";

@Component
export default class PlayerDetailsInfoRow extends Vue {
  @Prop({ required: true })
  pairs!: LabelValuePair[];

  get genInfoLabelStyle() {
    return {
      color: TeamLogosModule.selectedBackdropColor
    };
  }
}
</script>

<style lang="scss">
.player-details-info-row {
  display: flex;
  width: 100%;
  padding: 4px 0px;
  justify-content: space-around;

  .gen-info-label {
    color: #9c9c9c;
    // filter: brightness(50%);
  }
}
</style>
