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
  <div
    :class="['ds-tooltip-wrapper', {'ds-tooltip-wrapper-mini': type === 'mini'}]"
    :style="stylesObject"
  >
    <template v-if="type === 'mini'">
      <div class="ds-mini"
           :style="{width: popoverWidth, height: poperHeight, padding: poperPadding, margin: poperMargin, boxSizing: poperBoxSizing}">
        <slot></slot>
      </div>
    </template>

    <template v-else>
      <div class="reference"
        v-if="!forceShow && !forceHide"
        @click="updateForceShow"
        @mouseover="mouseOver"
        @mouseout="mouseOut"
      >
        <slot name="reference"></slot>
      </div>

      <template v-else>
        <div>
          <Popper
            v-if="forceShow"
            trigger="click"
            :delay-on-mouse-over="0"
            :delay-on-mouse-out="0"
            :options="{
              placement: placement,
              modifiers: { offset: offset }
            }"
            :force-show="true"
          >
            <div :class="['popper', {'custom-poper': type === 'custom'}]"
                 :style="{width: popoverWidth, height: poperHeight, padding: poperPadding, margin: poperMargin,
                          boxSizing: poperBoxSizing}">
              <slot name="popover"></slot>
            </div>
        
            <div
              class="reference"
              ref="reference"
              slot="reference"
              @click="updateForceShow"
            >
              <slot name="reference"></slot>
            </div>
          </Popper>
        </div>

        <div>
          <Popper
            v-if="!forceShow"
            trigger="hover"
            :delay-on-mouse-over="0"
            :delay-on-mouse-out="0"
            :options="{
              placement: placement,
              modifiers: { offset: offset }
            }"
          >
            <div :class="['popper', {'custom-poper': type === 'custom'}]"
                 :style="{width: popoverWidth, height: poperHeight, padding: poperPadding, margin: poperMargin,
                          boxSizing: poperBoxSizing}">
              <slot name="popover"></slot>
            </div>
        
            <div
              class="reference"
              ref="reference"
              slot="reference"
              @click="updateForceShow"
            >
              <slot name="reference"></slot>
            </div>
          </Popper> 
        </div>
      </template>
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
    forceShow: {
      type: Boolean,
      default: false,
    },
    forceHide: {
      type: Boolean,
      default: false
    },
    popoverWidth: String,
    poperHeight: String,
    poperPadding: String,
    poperMargin: String,
    poperBoxSizing: String,
    margin: {
      type: String
    }
  },
  components: {
    Popper
  },
  methods: {
    updateForceShow() {
      this.$emit('update:forceShow', !this.forceShow)
    },
    mouseOver() {
      this.$emit('onMouseOver')
    },
    mouseOut() {
      this.$emit('onMouseOut')
    }
  },
  computed: {
    stylesObject() {
      let styles = {
        margin: this.margin
      }

      return styles
    }
  }
}
</script>

<style lang="less">
@import '../styles/vars';

.ds-tooltip-wrapper {
  display: inline-block;

  &.ds-tooltip-wrapper-mini {
    position: absolute;
  }

  .reference {
    display: inline-block;
    cursor: pointer;
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

    &[x-placement^="bottom"] {
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

    &[x-placement^="top"] {
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

    &[x-placement^="left"] {
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

    &[x-placement^="right"] {
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

    &.custom-poper {
      background-color: @color-gray-200 !important;
      border: none;
      color: @color-dark;
      font-family: "Roboto Light";
      font-size: 14px;
      line-height: 21px;

      &[x-placement^="bottom"],
      &[x-placement^="top"],
      &[x-placement^="left"],
      &[x-placement^="right"] {
        [x-arrow] {
          &:before {
            display: none;
          }
        }
      }

      &[x-placement^="bottom"] {
        [x-arrow] {
          &:after {
            top: -15px;
            border-bottom: 20px solid @color-gray-200;
            border-right: 10px solid transparent;
            border-left: 20px solid transparent;
          }
        }
      }

      &[x-placement^="top"] {
        [x-arrow] {
          &:after {
            bottom: -15px;
            border-top: 20px solid @color-gray-200;
            border-right: 10px solid transparent;
            border-left: 20px solid transparent;
          }
        }
      }

      &[x-placement^="left"] {
        [x-arrow] {
          &:after {
            right: -15px;
            border-left: 20px solid @color-gray-200;
            border-top: 10px solid transparent;
            border-bottom: 20px solid transparent;
          }
        }
      }

      &[x-placement^="right"] {
        [x-arrow] {
          &:after {
            left: -15px;
            border-right: 20px solid @color-gray-200;
            border-top: 10px solid transparent;
            border-bottom: 20px solid transparent;
          }
        }
      }

      &[x-placement="right-end"],
      &[x-placement="left-end"] {
        [x-arrow] {
          &:after {
            top: -17px;
          }
        }
      }

      &[x-placement="top-start"],
      &[x-placement="top-end"],
      &[x-placement="bottom-start"],
      &[x-placement="bottom-end"] {
        [x-arrow] {
          &:after {
            left: -15px;
          }
        }
      }
    }
  }

  .ds-mini {
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
