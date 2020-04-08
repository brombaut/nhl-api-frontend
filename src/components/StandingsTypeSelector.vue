<template>
  <div id="standings-type-selector" :style="standingsTypeContainerStyle">
    <StandingsTypeTab
      v-for="standingsType in standingTypes"
      :key="standingsType.name"
      :standingsType="standingsType"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { StandingsModule } from "../store/modules/standings";
import { StandingsType } from "../types/store-types/standings-type";
import { TeamLogosModule } from "../store/modules/team-logos";
import StandingsTypeTab from "@/components/StandingsTypeTab.vue";

@Component({
  components: {
    StandingsTypeTab
  }
})
export default class StandingsTypeSelector extends Vue {
  get availableStandingsTypes(): Array<string> {
    return ["wildCard", "byDivision", "byConference", "byLeague"];
  }

  get standingTypes() {
    return StandingsModule.standingsTypes.filter((st: StandingsType) =>
      this.availableStandingsTypes.includes(st.name)
    );
  }

  get standingsTypeContainerStyle() {
    return {
      "border-color": TeamLogosModule.selectedSecondaryColor
    };
  }
}
</script>

<style lang="scss">
#standings-type-selector {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid white;
  position: absolute;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
