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
  <div :class="['ds-button-link-wrapper', {'ds-mobile-bottom': mobileBottom}]">
    <template v-if="link">
      <a
        v-on="$listeners"
        :href="link"
        :class="['ds-button', {'ds-button-primary': primary, 'ds-button-big': big, 'ds-button-small': small,
                               'ds-button-alt': alt, 'ds-button-plain': plain, 'ds-button-plain-two': plainTwo,
                               'ds-button-link-ico': linkIco}]"
        :disabled="disabled"
        :target="target"
      >
        <Icon
          v-if="icon"
          :class="{'ds-icon-left': hasLabel}"
          :source="icon"
          :size="computedIconSize"
          :color="iconColor"
        />
        <slot></slot>
        <Icon
          class="ds-icon-right"
          v-if="iconRight"
          :source="iconRight"
          :size="computedIconSize"
          :color="iconColor"
        />
      </a>
    </template>

    <template v-else>
      <button
        v-on="$listeners"
        :class="['ds-button', {'ds-button-primary': primary, 'ds-button-big': big, 'ds-button-small': small,
                               'ds-button-alt': alt, 'ds-button-plain': plain, 'ds-button-plain-two': plainTwo}]"
        :disabled="disabled"
      >
        <Icon
          v-if="icon"
          :class="{'ds-icon-left': hasLabel}"
          :source="icon"
          :size="computedIconSize"
          :color="iconColor"
        />
        <slot></slot>
        <Icon
          class="ds-icon-right"
          v-if="iconRight"
          :source="iconRight"
          :size="computedIconSize"
          :color="iconColor"
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
    plainTwo: Boolean,
    linkIco: Boolean,
    disabled: Boolean,
    icon: String,
    iconRight: String,
    iconColor: String,
    link: String,
    target: String,
    mobileBottom: Boolean,
  },
  data: () => ({
  }),
  computed: {
    primary() {
      return !(this.alt || this.plain || this.plainTwo || this.linkIco)
    },
    hasLabel() {
      return !!this.$slots.default
    },
    computedIconSize() {
      if (this.big) return '28px'
      else if (this.small || this.plainTwo) return '16px'
      return '24px'
    }
  },
}
</script>

<style lang="less">
@import '../styles/vars';

.ds-button-link-wrapper {
  display: inline-block;

  @media @screen-medium, @screen-small {
    &.ds-mobile-bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0;
      line-height: normal;
      width: 100%;
      z-index: 2;
      .ds-button {
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

.ds-button {
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

  &.ds-button-big {
    padding: 14px 24px;
  }

  &.ds-button-small {
    padding: 6px 8px;
    .font-components-button-small();

    .ds-icon {
      margin: 0;
      margin-right: 4px;
    }
  }

  .ds-icon {
    fill: @color-dark;
    margin: -4px;
  }
  .ds-icon-left {
    margin-left: -10px;
    margin-right: 5px;
  }
  .ds-icon-right {
    margin-right: -10px;
    margin-left: 5px;
  }

  &.ds-button-primary {
    .font-components-button-normal();
    background: @color-primary;

    &.ds-button-big {
      .font-components-button-big();
    }

    &:hover, &:focus {
      background: darken(@color-primary, 5%);
    }

    &:active {
      background: darken(@color-primary, 10%);
    }

    .ds-icon {
      fill: @color-white;
    }
  }

  &.ds-button-alt {
    .font-components-button-normal-alt();
    background: @color-white;
    border: 1px solid @color-primary;
    .ds-icon {
      fill: @color-primary;
    }
  }

  &.ds-button-alt, &.ds-button-plain, &.ds-button-link-ico {
    &:hover, &:focus {
      background: darken(@color-white, 5%);
    }

    &:active {
      background: darken(@color-white, 10%);
    }
  }

  &.ds-button-plain-two {
    .font-components-button-plain-two();

    .ds-icon-left, .ds-icon-right {
      margin-bottom: 3px;
    }

    &:hover, &:focus, &:active {
      background-color: rgba(0, 0, 0, 0);
    }
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background: @color-gray-300;
    color: @color-gray-400;
    cursor: initial;

    .ds-icon {
      fill: @color-gray-100;
    }

    &:hover {
      background: @color-gray-300;
    }
  }

  &.ds-button-link-ico {
    .font-components-button-link-ico();
  }

  &::-moz-focus-inner {
    border: 0;
  }
}
</style>
