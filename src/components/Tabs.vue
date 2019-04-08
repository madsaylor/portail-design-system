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
  <div class="tabs-container">
    <div class="tabs-row">
      <template v-for="(tab, index) in tabs">
        <div
          v-if="!tab.hidden"
          :class="['tab', {
            active: active === index,
            disabled: disabled || tab.disabled,
          }]"

          @click="onTabClick(tab, index)"
        >
          {{tab.text}}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Tabs",
    props: {
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
    methods: {
      onTabClick(tab, index) {
        if (this.disabled || tab.disabled) return;

        this.$emit('tab:click', tab, index)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../styles/vars';

  .tabs-container {
    display: flex;
    background-color: @color-white;
    width: 100%;
    height: auto;
    justify-content: center;
    box-shadow: @shadow-divider;

    .tabs-row {
      display: flex;
      width: 50%;

      @media @screen-small {
        & {
          width: 100%;
        }
      }
    }

    .tab {
      display: flex;
      cursor: pointer;
      flex: 1 1 auto;
      align-items: center;
      justify-content: center;
      height: 48px;
      box-shadow: @shadow-divider;

      .font-components-tab-inactive();

      &:not(.disabled) {
        &:hover, &:focus, &.active {
          .font-components-tab-active();
        }

        &.active {
          box-shadow: inset 0 -3px 0 -1px @color-primary;
        }
      }
    }
  }

</style>
