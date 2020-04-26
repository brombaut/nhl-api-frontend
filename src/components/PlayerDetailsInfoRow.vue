<template>
  <h4 class="player-details-info-row">
    <div
      v-for="(pair, index) in pairs"
      :key="pair.label"
      class="value-and-divider"
    >
      <div class="label-value-container">
        <span class="label" :style="genInfoLabelStyle">{{ pair.label }}:</span>
        <span>{{ pair.value }}</span>
      </div>
      <div
        v-if="index < pairs.length - 1"
        class="divider"
        :style="genInfoLabelStyle"
      >
        |
      </div>
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

  .value-and-divider {
    display: flex;
    justify-content: space-around;
    flex: 1;

    .label {
      margin-right: 4px;
    }

    .divider {
      margin: 0 4px;
    }
  }

  .gen-info-label {
    color: #9c9c9c;
  }
}
</style>
