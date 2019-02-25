<!--
  Styled tooltip component

  Usage:

    <Tooltip>Helpful info</Tooltip>
-->

<template>
  <div class="tooltip">
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

.tooltip {
  background-color: @color-dark;
  border-radius: 2px;
  color: @color-white;
  font-family: @font-family;
  font-size: 12px;
  line-height: 16px;
  padding: 8px;
  width: 270px;
}
</style>
