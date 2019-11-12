<template>
  <div class="ds-calendar-grid-select">
    <div v-if="labelsTop" class="ds-labels-top">
      <span v-for="label in labelsTop"
            :style="{paddingLeft: `calc((100% - 32 * ${items[0].length}px) / ${items[0].length - 1})`}">
        {{ label }}
      </span>
    </div>

    <div v-for="row in items" :class="['ds-grid-select-row', `ds-grid-select-row-${view}`]">
      <span
        v-for="item in row"
        :class="['ds-item-cell', {
          'ds-disabled': item.disabled,
          'ds-selected': getSelected(item),
          'ds-range': getRange(item),
          'ds-selected-range-start': getSelectedRangeStart(item),
          'ds-selected-range-end': getSelectedRangeEnd(item)
        }]"
        :tabindex="!item.disabled && 0"
        @click="!item.disabled && select(item)"
        @keydown.enter.space.prevent="select(item)"
        :style="{width: itemWidth, display: getDisplay}"
      >
          <span :class="['ds-item', ...item.class]"
                :style="{paddingLeft: `calc((100% - ${cellWidth} * ${items[0].length}px) / ${items[0].length - 1})`}">
            <slot v-bind="{item}">
              {{ item.title || item }}
            </slot>
          </span>
      </span>
    </div>
  </div>
</template>

<script>
const cellWidth = {
  'day': 29,
  'month': 40,
  'year': 38
}

export default {
  name: 'CalendarGridSelect',
  props: {
    items: {
      type: Array,
      required: true
    },
    labelsTop: Array,
    value: null,
    secondValue: null,
    rangeAvailable: Boolean,
    view: String
  },
  computed: {
    cellWidth() {
      return cellWidth[this.view]
    },
    getDisplay() {
      return this.view === 'month' ? 'inline-block' : undefined
    },
    itemWidth() {
      return 100 / this.items[0].length + '%'
    },
    initDate() {
      return new Date(this.value).getTime()
    },
    secondInitDate() {
      return new Date(this.secondValue).getTime()
    },
    dateRangeExist() {
      return this.value && this.secondValue && this.rangeAvailable
    }
  },
  methods: {
    select(item) {
      this.$emit('input', item)
    },
    getSelected(item) {
      if (this.dateRangeExist) {
        return this.getSingleSelected(item, this.value, this.initDate) ||
          this.getSingleSelected(item, this.secondValue, this.secondInitDate)
      } else {
        return this.getSingleSelected(item, this.value, this.initDate)
      }
    },
    getRange(item) {
      if (this.dateRangeExist && item.key !== undefined) {
        return this.initDate && this.secondInitDate && (this.initDate < item.key && item.key < this.secondInitDate ||
          this.secondInitDate < item.key && item.key < this.initDate)
      } else if (this.dateRangeExist) {
        return this.value < item && item < this.secondValue || this.secondValue < item && item < this.value
      } else {
        return false
      }
    },
    getSelectedRangeStart(item) {
      if (this.dateRangeExist && this.value < this.secondValue) {
        return this.getSingleSelected(item, this.value, this.initDate)
      } else if (this.dateRangeExist) {
        return this.getSingleSelected(item, this.secondValue, this.secondInitDate)
      } else {
        return false
      }
    },
    getSelectedRangeEnd(item) {
      if (this.dateRangeExist && this.value > this.secondValue) {
        return this.getSingleSelected(item, this.value, this.initDate)
      } else if (this.dateRangeExist) {
        return this.getSingleSelected(item, this.secondValue, this.secondInitDate)
      } else {
        return false
      }
    },
    getSingleSelected(item, date, dateMilles) {
      if (item.key !== undefined) {
        return item.key === dateMilles
      } else {
        return item === date
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/vars';

.ds-calendar-grid-select {
  width: 100%;
  height: 100%;
  border-collapse: collapse;

  .ds-labels-top {
    margin-bottom: 20px;

    span {
      display: inline-block;
      min-width: 31.5px;
      color: @color-gray-500;
      font-family: @font-family;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      padding-top: 2px;
      padding-bottom: 8px;
      text-align: center;
      text-transform: capitalize;
      user-select: none;
    }

    :first-child {
      padding-left: 0 !important;
    }
  }

  .ds-grid-select-row {
    .ds-item-cell {
      text-align: center;
      > .ds-item {
        border-radius: 2px;
        box-sizing: border-box;
        color: @color-dark;
        display: inline-block;
        font-family: @font-family;
        font-size: 14px;
        line-height: 24px;
        min-width: 24px;
        text-align: center;
        transition: background .1s ease-in-out;
        user-select: none;
      }

      &:not(.ds-disabled) {
        cursor: pointer;

        &:hover > .ds-item,
        &:focus > .ds-item {
          /*background: darken(@color-white, 5%);*/
        }

        &:active > .ds-item {
          /*background: darken(@color-white, 10%);*/
        }

        &.ds-selected {
          .ds-item {
            span {
              display: inline-block;
              color: @color-white;
              background-color: @color-primary;
              min-width: 28px;
            }
          }
        }

        &.ds-range {
          .ds-item {

            background-color: rgba(30, 179, 134, 0.1);
            color: @color-primary;
          }
        }

        &.ds-selected-range-start,
        &.ds-selected-range-end {
          .ds-item {
            color: @color-primary;

            span {
              display: inline-block;
              color: @color-white;
              background-color: @color-primary;
            }
          }
        }

        &.ds-selected-range-end {
          .ds-item {
            background-color: rgba(30, 179, 134, 0.1);
          }
        }
      }

      &.ds-disabled > .ds-item {
        color: @color-gray-300;
      }

      &:focus {
        outline: none;
      }
    }

    :first-child {
      .ds-item {
        padding-left: 0 !important;
      }
    }

    :last-child, .ds-selected-range-end {
      .ds-item {
        padding-right: 0 !important;
      }
    }

    &.ds-grid-select-row-day,
    &.ds-grid-select-row-month,
    &.ds-grid-select-row-year {
      &:last-child {
        margin-bottom: 0;
      }
    }

    &.ds-grid-select-row-day {
      margin-bottom: 1px;
    }

    &.ds-grid-select-row-month {
      margin-bottom: 32px;
    }

    &.ds-grid-select-row-year {
      margin-bottom: 10px;
    }
  }
}
</style>
