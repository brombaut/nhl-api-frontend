<template>
  <div class="loading-overlay">
    <div class="square one"></div>
    <div class="square two"></div>
    <div class="square three"></div>
    <div class="square four"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class LoadingOverlay extends Vue {
  public removeLoadingOverlay() {
    const elem: HTMLDivElement = this.$el as HTMLDivElement;
    elem.style.opacity = "0";
    setTimeout(() => {
      elem.parentNode?.removeChild(elem);
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.loading-overlay {
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
</style>
