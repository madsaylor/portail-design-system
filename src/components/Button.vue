<!--
  Button with an optional icon and different styles

  Usage:

    <Button
      :big="true"                 - Bigger button
      :alt="boolean"              - Alternative design
      :plain="boolean"            - Close to no styling
      :disabled="boolean"         - Disabled
      :icon="account_circle"      - Left or the only icon
      :icon-right="edit"          - Right icon
      :link="https://example.com" - If link is set, component works as <a>  with button style
      :target="_blank"            - Same as the target attribute in <a>
      :mobile-bottom              - Show Button at the bottom with full width on mobile devices
    >
      Button label
    </Button>
-->

<template>
  <div :class="['button-link-wrapper', {mobileBottom}]">
    <template v-if="link">
      <a
        v-on="$listeners"
        :href="link"
        :class="['button', {primary, big, small, alt, plain, 'link-ico': linkIco}]"
        :disabled="disabled"
        :target="target"
      >
        <Icon
          v-if="icon"
          :class="{'icon-left': hasLabel}"
          :source="icon"
          :size="computedIconSize"
        />
        <slot></slot>
        <Icon
          class="icon-right"
          v-if="iconRight"
          :source="iconRight"
          :size="computedIconSize"
        />
      </a>
    </template>

    <template v-else>
      <button
        v-on="$listeners"
        :class="['button', {primary, big, small, alt, plain}]"
        :disabled="disabled"
      >
        <Icon
          v-if="icon"
          :class="{'icon-left': hasLabel}"
          :source="icon"
          :size="computedIconSize"
        />
        <slot></slot>
        <Icon
          class="icon-right"
          v-if="iconRight"
          :source="iconRight"
          :size="computedIconSize"
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
    small: Boolean,
    alt: Boolean,
    plain: Boolean,
    linkIco: Boolean,
    disabled: Boolean,
    icon: String,
    iconRight: String,
    link: String,
    target: String,
    mobileBottom: Boolean,
  },
  data: () => ({
  }),
  computed: {
    primary() {
      return !(this.alt || this.plain || this.linkIco);
    },
    hasLabel() {
      return !!this.$slots.default
    },
    computedIconSize() {
      if (this.big) return '28px'
      else if (this.small) return '16px'
      return '24px'
    }
  },
}
</script>

<style lang="less">
@import '../styles/vars';

.button-link-wrapper {
  display: inline-block;

  @media @screen-medium, @screen-small {
    &.mobileBottom {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0;
      line-height: normal;
      width: 100%;
      z-index: 2;
      .button {
        width: 100%;
        text-align: center;
        padding-top: @mobile-button-padding-size;
        padding-bottom: @mobile-button-padding-size;
        font-size: @mobile-button-font-size;
        line-height: @mobile-button-line-height;
        border-radius: 0;
      }
    }
  }
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
  text-decoration: none !important;
  padding: 10px 16px;

  &.big {
    padding: 14px 24px;
  }

  &.small {
    padding: 6px 8px;
    .font-components-button-small();

    .icon {
      margin: 0;
      margin-right: 4px;
    }
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

  &.alt, &.plain, &.link-ico {
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
    color: @color-gray-400;
    cursor: initial;

    .icon {
      fill: @color-gray-100;
    }

    &:hover {
      background: @color-gray-300;
    }
  }

  &.link-ico {
    .font-components-button-link-ico();
  }

  &::-moz-focus-inner {
    border: 0;
  }
}
</style>
