<!--
  Tooltip element

  Usage:

    <Tooltip
      :visible='tooltipVisible' - defines whether to show tooltip
    />

  Properties:

    visible - Boolean. When set to true tooltip is shown.
-->

<template>
  <div :class="[
    'tooltip-wrapper',
    'fade-in',{'visible': visible,}]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    visible: Boolean
  }
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

.tooltip-wrapper {
  color: @color-white;
  padding: 8px;
  background-color: @color-dark;
  font-size: 12px;
  border-radius: 2px;
  position: absolute;
  display: none;
  max-width: 286px;
  white-space: nowrap;
  left: 50%;
  transform: translateX(-50%);

  &.visible {
    display: block;
  }

  &:not(.top) {
    margin-top: 10px;
  }

  &.fade-in {
    .animation(fadein 0.5s);
  }
}
</style>
