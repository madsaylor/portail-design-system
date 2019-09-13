<!--
  Button with an optional icon and different styles

  Usage:

    --- Tabs --

    Tabs can get properties:

      disabled - disable all tabs.
      active: 0 - index of active tab. Required property.
      tabs: [] - Array of objects. Required property. Each object describes one tab and can have next properties:

        - text - tab name
        - hidden - Boolean value.
        - disabled - Boolean value.

    Example:
        [
          {
            text: 'TAB 1',  (String)
          },
          {
            text: 'TAB 2',  (String)
            disabled: true  (Boolean)
          },
          {
            text: 'TAB 3',  (String)
          }
      ]

    Events:

    @tab:click - Return tab object
-->
<template>
  <div class="ds-tabs-container">
    <div :class="[simpleTabs ? 'ds-simple-tabs-header' : 'ds-tabs-header']" :style="{'justify-content': tabsAlign}">
      <div class="ds-tabs-row">
        <template v-for="(tab, index) in tabs">
          <div
            v-if="!tab.hidden"
            :class="[simpleTabs ? 'ds-simple-tab' : 'ds-tab', activeTabClass(index),
                    {'ds-disabled': disabled || tab.disabled}]"
            @click="onTabClick(tab, index)">

              {{tab.text}}
          </div>
        </template>
      </div>
    </div>
    <div class="ds-tabs-body">
      <slot :name="activeTabBody"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Tabs',
    props: {
      tabsAlign: {
        type: String,
        default: 'center',
        validator(value) {
          return ['center', 'flex-start', 'flex-end', 'space-between'].indexOf(value) !== -1
        }
      },
      simpleTabs: Boolean,
      active: {
        required: true,
        type: Number
      },

      disabled: Boolean,

      tabs: {
        required: true,
        type: Array
      }
    },
    data: () => ({
      startX: undefined,
      minDistance: 100
    }),
    computed: {
      activeTabBody() {
        return `tabs-${this.active}`
      }
    },
    methods: {
      activeTab(index) {
        return this.active - 1 === index
      },
      onTabClick(tab, index) {
        if (this.disabled || tab.disabled) return;
        this.$emit('tab:click', tab, ++index)
      },
      swipeTab(regulator) {
        let futureTab = this.active + regulator

        if (futureTab < this.tabs.length && futureTab >= 0) {
          this.onTabClick(this.tabs[futureTab], futureTab)
        }
      },
      touchstart(event) {
        this.startX = event.changedTouches[0].pageX
        event.preventDefault()
      },
      touchend(event) {
        let endX = event.changedTouches[0].pageX - this.startX
        if (Math.abs(endX) > this.minDistance) {
          this.swipeTab(endX > 0 ? 1 : -1)
        }
        event.preventDefault()
      },
      activeTabClass(index) {
        if (this.activeTab(index)) {
          return this.simpleTabs ? 'ds-simple-active' : 'ds-active'
        }
      }
    },
    mounted() {
      this.$el.addEventListener('touchstart', this.touchstart)
      this.$el.addEventListener('touchend', this.touchend)
    }
  }
</script>

<style scoped lang="less">
  @import '../styles/vars';

  .ds-tabs-container {
    .ds-tabs-header, .ds-simple-tabs-header {
      display: flex;
      width: 100%;
      height: auto;

      .ds-tabs-row {
        display: flex;
        width: 50%;

        @media @screen-mobile-all {
          & {
            width: 100%;
          }
        }
      }
    }

    .ds-tabs-header {
      background-color: @color-white;
    }

    .ds-tab, .ds-simple-tab {
      display: flex;
      cursor: pointer;
      flex: 1 1 auto;
      align-items: center;
      justify-content: center;
      height: 48px;
    }

    .ds-tab {
      .font-components-tab-inactive();
      border-right: 1px solid @color-gray-300;

      &:first-child {
        border-left: 1px solid @color-gray-300;
      }

      &:not(.ds-disabled) {
        &:hover, &:focus, &.ds-active {
          .font-components-tab-active();
        }

        &.ds-active {
          box-shadow: inset 0 -3px 0 -1px @color-primary;
        }
      }
    }

    .ds-simple-tab {
      height: 38px;
      border-radius: 2px 2px 0 0;
      color: @color-gray-500;
      font-family: Lato;
      font-size: 14px;
      line-height: 20px;


      &:not(.ds-disabled) {
        &.ds-simple-active {
          color: @color-primary;
          background-color: @color-white;
        }
      }
    }

    @media @screen-mobile-all {
      .ds-simple-tabs-header {
        border: 1px solid @color-gray-300;
        .ds-tabs-row {
          .ds-simple-tab {
            border-right: 1px solid @color-gray-300;
            background-color: @color-gray-100;

            &:last-child {
              border-right: none;
            }
          }

          .ds-simple-active {
            background-color: @color-white;
            color: @color-dark;
          }
        }
      }
    }
  }

</style>
