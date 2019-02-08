<!--
  Tooltip element with different animations and positioning

  Usage:

    <Input
      :visible=''
      :top=''
      :animation=''
    />

  Properties:

    // TODO

  Events:

    // TODO
-->

<template>
  <div :class="[
    'tooltip-wrapper',
    animation,
    {
      'visible': visible,
      'top': top
    }
  ]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    visible: Boolean,
    top: Boolean,
    animation: {
      type: String,
      default: 'fade-in'
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

.tooltip-wrapper {
  color: @color-white;
  padding: 8px;
  background-color: @color-black;
  font-size: 12px;
  border-radius: @tooltip-border-radius;
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

  &.bounce {
    .animation(bounce 0.5s);
  }
}
</style>
