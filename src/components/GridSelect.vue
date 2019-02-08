<!--
  Component for displaying grid of items with ability to select one.

  Usage:

    <GridSelect
      :items=gridItems       - items to be rendered *required
      :labels-top=gridLabels - headings for cells *optional
    ></GridSelect>

  Properties:

    items - Array[x,y] of Objects, required. Each object can have:
      displayValue - will be used in rendering if provided
      class - which will be appended to item class name
      disabled - make item not selectable

    labelsTop - Array[x]. Grid headings to be rendered.

  Events:

    input - emitted when a new item is selected in component
-->

<template>
  <div class="grid-select-wrapper">
    <table class="grid-select-table">
      <tr v-if="labelsTop" class="grid-labels-top">
        <th v-for="label in labelsTop" class="grid-label">
          {{ label }}
        </th>
      </tr>

      <tr v-for="row in items" class="grid-row">
        <td
          v-for="item in row"
          class="grid-item"
          :class="[{
          disabled: item.disabled,
          selected: item == value,
        }, item.class]"
          :tabindex="!item.disabled && 0"
          @click="!item.disabled && select(item)"
          @keypress.space.prevent="select(item)"
          :style="{width: `${100 / row.length}%`}"
        >
          <span>
            <slot v-bind:item="item">
              {{ item.displayValue || item }}
            </slot>
          </span>
        </td>
      </tr>
    </table>

  </div>
</template>

<script>
export default {
  name: 'GridSelect',
  props: {
    items: {
      type: Array,
      required: true
    },
    labelsTop: Array,
    value: {
      default: {}
    }
  },
  methods: {
    select(item) {
      this.$emit('input', item)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

.grid-select-wrapper {
  width: 100%;
  height: 100%;

  .grid-select-table {
    width: 100%;
    height: 100%;

    .grid-labels-top {
      color: @color-gray-500;
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 500!important;

      .grid-label {
        padding-bottom: 4px;
        text-align: center;
      }
    }

    .grid-row {

      .grid-item {
        font-size: 14px;
        font-weight: 500;
        color: @color-black;
        cursor: pointer;
        transition: transform .1s ease-in-out;
        text-align: center;

        &:hover {
          transform: scale(1.2);
        }

        &.disabled,
        &.other-month {
          opacity: 0.5;
        }

        &.selected {
          color: @color-white;
          position: relative;

          span {
            background-color: @color-brand;
            border-radius: 2px;
            width: 66%;
            height: 84%;
            position: absolute;
            left: 50%;
            top: 50%;
            transition: translateXY(50%, 50%);
            transform: translate(-50%, -50%);
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        &:focus{
          outline: none;
        }
      }
    }
  }
}
</style>
