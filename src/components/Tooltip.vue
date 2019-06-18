<!--
  Styled tooltip component

  Usage:

    <Tooltip>Helpful info</Tooltip>
-->

<template>
  <div :class="['tooltip', {'dynamic-width': dynamicWidth}]">
    <slot></slot>
    <div class="outer-triangle" :style="{top: triangleDistance + 'px'}"></div>
    <div class="inner-triangle" :style="{top: (triangleDistance + 1) + 'px'}"></div>
  </div>
</template>

<script>

export default {
  name: "Tooltip",
  props: {
    visible: Boolean,
    triangleDistance: {
      type: Number,
      default: 0
    },
    dynamicWidth: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

.tooltip {
  background-color: @color-white;
  border-radius: 2px;
  color: @color-dark;
  border: solid 1px @color-primary;
  font-family: @font-family;
  font-size: 14px;
  line-height: 18px;
  padding: 8px;
  width: 270px;
  position: relative;

  .outer-triangle, .inner-triangle {
    display: block;
    position: absolute;
    left: 100%;
    width: 0;
    height: 0;
    border-style: solid;
  }

  .inner-triangle {
    border-top: solid 7px transparent;
    border-bottom: solid 7px transparent;
    border-left: solid 14px white;
    border-right: 0;
  }

  .outer-triangle {
    border-top: solid 8px transparent;
    border-bottom: solid 8px transparent;
    border-left: solid 16px @color-primary;
    border-right: 0;
  }

  &.dynamic-width {
    width: auto;
  }
}
</style>
