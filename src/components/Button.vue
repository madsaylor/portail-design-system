<!--
  Button with an optional icon and different styles

  Usage:

    <Button
      :big="true"             - Bigger button
      :alt="boolean"          - Alternative design
      :plain="boolean"        - Close to no styling
      :disabled="boolean"     - Disabled
      :icon="account_circle"  - Left or the only icon
      :icon-right="edit    "  - Right icon
    >
      Button label
    </Button>
-->

<template>
  <button
    :class="['button', {primary, big, alt, plain}]"
    :disabled="disabled"
    @click="event => {$emit('click', event)}"
  >
    <Icon
      v-if="icon"
      :class="{'icon-left': hasLabel}"
      :source="icon"
      :size="big ? '28px' : '24px'"
      :color="primary ? 'white' : alt ? 'brand' : 'black'"
    />
    <slot></slot>
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
    disabled: Boolean,
    icon: String,
    iconRight: String,
  },
  data: () => ({
  }),
  computed: {
    primary() {
      return !(this.alt || this.plain)
    },
    hasLabel() {
      return !!this.$slots.default
    },
  },
}
</script>

<style lang="less">
@import '../styles/vars';

.button {
  -moz-appearance: none;
  -webkit-appearance: none;
  background: none;
  border-radius: 3px;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  margin: 0;
  transition: background 100ms ease-in-out;

  padding: 10px 16px;
  &.big {
    padding: 14px 24px;
  }

  .icon {
    margin: -4px;
  }
  .icon-left {
    margin-left: -10px;
    margin-right: 5px;
  }
  .icon-right {
    margin-right: -10px;
    margin-left: 5px;
  }

  &.primary {
    .font-components-button-normal();
    background: @color-primary;

    &.big {
      .font-components-button-big();
    }

    &:hover, &:focus {
      background: darken(@color-primary, 5%);
    }

    &:active {
      background: darken(@color-primary, 10%);
    }
  }

  &.alt {
    .font-components-button-normal-alt();
    background: @color-white;
    border: 1px solid @color-primary;
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
    outline: 1px solid @color-primary;
    outline-offset: -4px;
  }

  &:disabled {
    background: @color-gray-300;
    color: @color-gray-100;
    cursor: initial;
    &:hover {
      background: @color-gray-300;
    }
  }
}
</style>
