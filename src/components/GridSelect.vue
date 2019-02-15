<!--
  Render items in a table with optional labels at the top and an ability
  to select an item. Used in the Datepicker component

  Usage:

    <GridSelect
      :items="[[...], ...]"  - Items to be rendered
      :labels-top="[...]"    - Headings for the columns
      v-model="selected"     - Selected item
    ></GridSelect>

  Properties:

    items - Array<Array<any>>, required. Items to be rendered in the grid.
      Where each items may have:

        title - String. Will be used in rendering if provided, otherwise
          item will be rendered as {{ item }}. Also, a scoped slot can be
          used for even finer control of item representation

        disabled - Boolean. Makes item not selectable

    labelsTop - Array<string>. Table header items.

  Model:

    Selected value is updated through v-model directive on mouse click, enter
    or space key. During rendering "selected" class is added to item that
    satisfies === comparison with the v-model value.
-->

<template>
  <table class="grid-select">
    <tr v-if="labelsTop" class="labels-top">
      <th v-for="label in labelsTop">
        {{ label }}
      </th>
    </tr>

    <tr v-for="row in items" class="row">
      <td
        v-for="item in row"
        :class="['item', {
          disabled: item.disabled,
          selected: item === value,
        }, item.class]"
        :tabindex="!item.disabled && 0"
        @click="!item.disabled && select(item)"
        @keypress.enter.space.prevent="select(item)"
        :style="{width: itemWidth}"
      >
        <slot v-bind="{item}">
          {{ item.title || item }}
        </slot>
      </td>
    </tr>
  </table>
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
    value: Object,
  },
  computed: {
    itemWidth() {
      return 100 / this.items[0].length + '%'
    }
  },
  methods: {
    select(item) {
      this.$emit('input', item)
    }
  },
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

.grid-select {
  width: 100%;
  height: 100%;

  .labels-top th {
    color: @color-gray-500;
    font-family: Lato;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    padding-bottom: 4px;
    text-align: center;
    text-transform: uppercase;
  }

  .row {
    .item {
      border-radius: 2px;
      color: @color-dark;
      font-family: Lato;
      font-size: 14px;
      line-height: 20px;
      padding: 2px;
      text-align: center;
      transition: background .1s ease-in-out;
      user-select: none;

      &:not(.disabled) {
        cursor: pointer;

        &:hover,
        &:focus {
          background: darken(@color-white, 5%);
          outline: none;
        }

        &:active {
          background: darken(@color-white, 10%);
        }

        &.selected {
          color: @color-white;
          background-color: @color-primary;
        }
      }

      &.disabled {
        color: @color-gray-400;
      }
    }
  }
}
</style>
