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
  <div class="button-link-wrapper">
    <template v-if="link">
      <a
        v-on="$listeners"
        :href="link"
        :class="['button', {primary, big, alt, plain}]"
        :disabled="disabled"
        :target="target"
      >
        <Icon
          v-if="icon"
          :class="{'icon-left': hasLabel}"
          :source="icon"
          :size="big ? '28px' : '24px'"
        />
        <slot></slot>
        <Icon
          class="icon-right"
          v-if="iconRight"
          :source="iconRight"
          :size="big ? '28px' : '24px'"
        />
      </a>
    </template>

    <template v-else>
      <button
        v-on="$listeners"
        :class="['button', {primary, big, alt, plain}]"
        :disabled="disabled"
      >
        <Icon
          v-if="icon"
          :class="{'icon-left': hasLabel}"
          :source="icon"
          :size="big ? '28px' : '24px'"
        />
        <slot></slot>
        <Icon
          class="icon-right"
          v-if="iconRight"
          :source="iconRight"
          :size="big ? '28px' : '24px'"
        />
      </button>
    </template>
  </div>
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
    link: String,
    target: String
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

.button-link-wrapper {
  display: inline-block;
}

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
  transition: background .1s ease-in-out;
  text-decoration: none !important;
  padding: 10px 16px;

  &.big {
    padding: 14px 24px;
  }

  .icon {
    fill: @color-dark;
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

    .icon {
      fill: @color-white;
    }
  }

  &.alt {
    .font-components-button-normal-alt();
    background: @color-white;
    border: 1px solid @color-primary;
    .icon {
      fill: @color-primary;
    }
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
    outline: none;
  }

  &:disabled {
    background: @color-gray-300;
    color: @color-gray-100;
    cursor: initial;

    .icon {
      fill: @color-gray-100;
    }

    &:hover {
      background: @color-gray-300;
    }
  }
}
</style>
