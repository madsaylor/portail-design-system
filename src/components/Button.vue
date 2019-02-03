<!--
  Button with an optional icon and different styles

  TODO:
    Current implementation seems a bit over-engineered. Give it another look
    later

  Usage:

    <Button
      :big="true"             - Big button
      :alt="boolean"          - Alt button
      :plain="boolean"        - Plain button
      :icon="account_circle"  - Left icon
      :icon-right="edit    "  - Right icon
    >
      Button label
    </Button>
-->

<template>
  <button :class="['button', {primary, big, alt, plain}]">
    <Icon
      class="icon-left"
      v-if="icon"
      :source="icon"
      :size="big ? '28px' : '24px'"
      :color="primary ? 'white' : alt ? 'brand' : 'black'"
    />
    <span class="label"><slot></slot></span>
    <Icon
      class="icon-right"
      v-if="iconRight"
      :source="iconRight"
      :size="big ? '28px' : '24px'"
      :color="primary ? 'white' : alt ? 'brand' : 'black'"
    />
  </button>
</template>

<script>
import Icon from './Icon.vue'

export default {
  name: 'Button',
  components: {Icon},
  props: {
    big: Boolean,
    alt: Boolean,
    plain: Boolean,
    icon: String,
    iconRight: String,
  },
  data: () => ({
  }),
  computed: {
    primary() {
      return !(this.alt || this.plain)
    },
  }
}
</script>

<style lang="less">
@import '../styles/vars';

.button {
  display: inline-block;
  box-sizing: border-box;
  border: none;
  background: none;
  margin: 0;
  cursor: pointer;
  transition: background 250ms ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;

  .label {
    display: inline-block;
    min-width: 5px;
    &:not(:empty) {
      padding: 4px 10px;
    }
  }

  .icon-left {
    margin-right: -5px;
  }
  .icon-right {
    margin-left: -5px;
  }

  &.primary, &.alt {
    padding: 6px;
    border-radius: 3px;
  }

  &.primary {
    .font-button-normal();
    background: @color-brand;

    &.big {
      .font-button-big();
      padding: 10px 14px;
    }

    &:hover, &:focus {
      background: darken(@color-brand, 5%);
    }

    &:active {
      background: darken(@color-brand, 10%);
    }

    &:focus {
      outline: 1px dashed @color-gray-500;
      outline-offset: -2px;
    }
  }

  &.alt {
    .font-button-normal-alt();
    background: @color-white;
    border: 1px solid @color-brand;
  }

  &.alt, &.plain {
    &:hover, &:focus {
      background: darken(@color-white, 5%);
    }

    &:active {
      background: darken(@color-white, 10%);
    }
  }

  &:focus {
    outline: 1px dashed @color-gray-200;
    outline-offset: -2px;
  }
}
</style>
