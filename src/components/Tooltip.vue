<!--
  Styled tooltip component

  Usage:

  <Tooltip
    :placement="left"           - Position of tooltip
    :offset="offset"            - Position of Arrow, and distnace from reference componnet. (Type is Object)
  >
    <div slot="popover">This is Popover content</div>
    <div slot="reference">Reference</div>
  </Tooltip>
-->

<template>
  <div class="ds-tooltip-wrapper">
    <template v-if="type === 'mini'">
      <div class="mini">
        <slot></slot>
      </div>
    </template>

    <template v-else>
      <Popper
        trigger="click"
        :options="{
          placement: placement,
          modifiers: { offset: offset }
        }"
      >
        <div class="popper" :style="{width: popoverWidth}">
          <slot name="popover"></slot>
        </div>
    
        <div class="reference" slot="reference">
          <slot name="reference"></slot>
        </div>
      </Popper>
    </template>
  </div>
</template>

<script>

import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

export default {
  name: "Tooltip",
  props: {
    type: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'top'
    },
    offset: {
      type: Object,
      default: () => {return {offset: '0, 10px'}}
    },
    popoverWidth: String
  },
  components: {
    Popper
  }
}
</script>

<style lang="less">
@import '../styles/vars';

.ds-tooltip-wrapper {
  display: inline-block;

  .reference {
    display: inline-block;
  }

  .popper {
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
    text-align: left;
    box-shadow: none;
    margin-top: 10px;
    margin-bottom: 10px;

    &[x-placement="bottom"] {
      [x-arrow] {
        &:before {
          content: '';
          position: absolute;
          left: -10px;
          top: -10px;
          border-bottom: 15px solid @color-primary;
          border-right: 10px solid transparent;
          border-left: 10px solid transparent;
          z-index: 1;
        }

        &:after {
          content: '';
          position: absolute;
          left: -10px;
          top: -8px;
          border-bottom: 15px solid @color-white;
          border-right: 10px solid transparent;
          border-left: 10px solid transparent;
          z-index: 2;
        }
      }
    }

    &[x-placement="top"] {
      [x-arrow] {
        &:before {
          content: '';
          position: absolute;
          left: -10px;
          bottom: -10px;
          border-top: 15px solid @color-primary;
          border-right: 10px solid transparent;
          border-left: 10px solid transparent;
          z-index: 1;
        }

        &:after {
          content: '';
          position: absolute;
          left: -10px;
          bottom: -8px;
          border-top: 15px solid @color-white;
          border-right: 10px solid transparent;
          border-left: 10px solid transparent;
          z-index: 2;
        }
      }
    }

    &[x-placement="left"] {
      [x-arrow] {
        &:before {
          content: '';
          position: absolute;
          top: -10px;
          right: -10px;
          border-left: 15px solid @color-primary;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          z-index: 1;
        }

        &:after {
          content: '';
          position: absolute;
          top: -10px;
          right: -8px;
          border-left: 15px solid @color-white;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          z-index: 2;
        }
      }
    }

    &[x-placement="right"] {
      [x-arrow] {
        &:before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          border-right: 15px solid @color-primary;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          z-index: 1;
        }

        &:after {
          content: '';
          position: absolute;
          top: -10px;
          left: -8px;
          border-right: 15px solid @color-white;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          z-index: 2;
        }
      }
    }
  }

  .mini {
    padding: 8px;
    background-color: #3F4352;
    border-radius: 2px;
    font-size: 12px;
    line-height: 16px;
    color: white;
  }

  /* styles.css */

  [x-arrow] {
    position: absolute;
  }
}

</style>
