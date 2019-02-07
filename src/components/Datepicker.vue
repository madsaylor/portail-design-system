<!--
  Datepicker with min/max selection limit.

  Usage:

    <Datepicker
      :startDate=new Date('2019-1-1') - value which will be set as selected when datepicker initialised
      :locale='en-en' - datepicker localisation
      :has-range='true' - defines whether a datepicker has a range of date available
        for selection
      :range='{min: -180, max: 30}' - range in days from the start for selection
      @update:selected='closedatepicker' - emitted when a new date is selected
    />

  Properties:

    startDate - Date. Start Date of the datepicker as it initialises, default is current Date.

    locale - String. Language used in datepicker. Default is French.

    range - Object {min, max}. Range of days from which a user can select date.

  Events:

    update:selected - emitted when user chooses new date from the datepicker component.
      Return an object with preformatted date as well as a Date Object.
-->

<template>
  <div class="datepicker-component">
    <div class="datepicker-header">
      <div class="datepicker-year-label">{{ !monthGrid ? year : ' ' }}</div>
      <div class="datepicker-label" @click="monthGrid = !monthGrid">{{ headerLabel }}</div>
      <div class="datepicker-buttons">
        <button
          @click="!prevViewOutOfRange && switchDateView(-1)"
          :class="{disabled: prevViewOutOfRange}"
        >
          <span class="arrow-left"></span>
        </button>
        <button
          @click="!nextViewOutOfRange && switchDateView(1)"
          :class="{disabled: nextViewOutOfRange}"
        >
          <span class="arrow-right"></span>
        </button>
      </div>
    </div>

    <div class="datepicker-body">
      <GridSelect
        :items="gridItems"
        :labels-top="gridLabels"
        v-model="selected"
      ></GridSelect>
    </div>

  </div>
</template>

<script>
import GridSelect from './GridSelect'

export default {
  name: 'Datepicker',
  components: {
    GridSelect
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    },
    locale: {
      type: String,
      default: 'fr-fr'
    },
    range: {
      type: Object
    }
  },
  data () {
    return {
      displayed: new Date(this.startDate),
      selected: new Date(this.startDate),
      dateRange: {
        min: null,
        max: null
      },
      monthGrid: false
    }
  },
  created () {
    this.range && this.setRange()
  },
  computed: {
    nextViewOutOfRange () {
      return this.range &&
      (!this.monthGrid ? this.displayed.getMonth() === this.dateRange.max.getMonth()
        : this.displayed.getFullYear() === this.dateRange.max.getFullYear())
    },
    prevViewOutOfRange () {
      return this.range &&
        (!this.monthGrid ? this.displayed.getMonth() === this.dateRange.min.getMonth()
          : this.displayed.getFullYear() === this.dateRange.min.getFullYear())
    },
    headerLabel () {
      return this.monthGrid ? this.year : this.monthName
    },
    year () {
      return this.displayed.getFullYear()
    },
    month () {
      return this.displayed.getMonth()
    },
    monthName () {
      return this.displayed.toLocaleString(this.locale, {month: 'long'})
    },
    gridItems () {
      if (this.monthGrid) {
        return this.months
      }
      return this.days
    },
    gridLabels () {
      if (this.monthGrid) {
        return null
      }
      return this.weekLabels
    },
    weekLabels () {
      let labels = []
      let date = new Date()
      date.setDate(date.getDate() - date.getDay() + 1)  // set date to monday
      for (let i = 1; i < 8; i++) {
        labels.push(date.toLocaleString(this.locale, {weekday: 'long'})[0])
        date.setDate(date.getDate() + 1)
      }
      return labels
    },
    /**
     * Days for the day selection grid for the currently displayed month
     * @return {Array<Array<Object>>} 6 by 7 nested array
     */
    days () {
      this.displayed.setDate(1)  // if it become 31 than it can skip months when switching
      let date = new Date(this.displayed)
      date.setDate(2 - (date.getDay() || 7))  // first displayed monday
      let days = []
      for (let i = 0; i < 6; i++) {
        let week = []
        for (let j = 0; j < 7; j++) {
          let day = new Date(date)
          day.displayValue = day.getDate()
          if (day.getMonth() !== this.month) {
            day.class = 'other-month'
          }
          if (this.range && this.outOfRange(date)) {
            day.disabled = true
          }
          week.push(day)
          date.setDate(date.getDate() + 1)
        }
        days.push(week)
      }

      // Put selected date in the grid so it's recognised as selected
      if (
        this.selected &&
        this.selected.valueOf() >= days[0][0].valueOf() &&
        this.selected.valueOf() <= days[5][6].valueOf()
      ) {
        for (let i = 0; i < 6; i++) {
          for (let c = 0; c < 7; c++) {
            if (days[i][c].getDate() === this.selected.getDate() &&
              days[i][c].getMonth() === this.selected.getMonth() &&
              days[i][c].getFullYear() === this.selected.getFullYear()) {
              days[i][c] = this.selected
              days[i][c].displayValue = this.selected.getDate()
              if (days[i][c].getMonth() !== this.month) {
                days[i][c].class = 'other-month'
              } else {
                days[i][c].class = ''
              }
              break
            }
          }
        }
      }
      return days
    },
    /**
     * months for the month selection grid for the current year
     * @return {Array<Array<Object>>} 3 by 4 nested array
     */
    months () {
      this.displayed.setDate(1)
      let date = new Date(this.displayed)
      date.setMonth(0)
      let months = []
      for (let i = 0; i < 4; i++) {
        let quarter = []
        for (let j = 0; j < 3; j++) {
          let month = new Date(date)
          month.displayValue = (date.toLocaleString(this.locale, {month: 'long'}))
          if (this.range && this.outOfRangeMonth(month)) {
            month.disabled = true
          }
          quarter.push(month)
          date.setMonth(date.getMonth() + 1)
        }
        months.push(quarter)
      }
      return months
    }
  },
  methods: {
    switchDateView (shift) {
      this.monthGrid ? this.changeYear(shift) : this.changeMonth(shift)
    },
    changeMonth (shift) {
      this.displayed.setMonth(this.month + shift)
      this.displayed = new Date(this.displayed)
    },
    changeYear (shift) {
      this.displayed.setFullYear(this.year + shift)
      this.displayed.setMonth(shift > 0 ? 0 : 11)
      this.displayed = new Date(this.displayed)
    },
    setRange () {
      /* how to determine the min/max month and date knowing that is 180 days before and 30 after current date */
      /* get miliseconds of now */
      const now = this.startDate.getTime()
      /* convert minRange to miliseconds */
      const daysToSec = 24 * 60 * 60 * 1000
      const minRange = (this.range.min) * daysToSec
      const maxRange = (this.range.max) * daysToSec
      const minDate = new Date(now + minRange)
      const maxDate = new Date(now + maxRange)
      this.dateRange.min = minDate
      this.dateRange.max = maxDate
    },
    outOfRange (date) {
      const min = date < this.dateRange.min
      const max = date > this.dateRange.max
      return min || max
    },
    outOfRangeMonth (date) {
      const monthMaxYear = date.getFullYear() === this.dateRange.max.getFullYear()
      const monthMinYear = date.getFullYear() === this.dateRange.min.getFullYear()
      const monthInMaxYear = monthMaxYear && (date.getMonth() === this.dateRange.max.getMonth())
      const monthInMinYear = monthMinYear && (date.getMonth() === this.dateRange.min.getMonth())
      return this.outOfRange(date) && (!monthInMaxYear && !monthInMinYear)
    }
  },
  watch: {
    selected (newValue, oldValue) {
      if (this.monthGrid) {
        this.displayed.setMonth(newValue.getMonth())
        this.displayed = new Date(this.displayed)
        this.selected = new Date(oldValue)
        this.monthGrid = false
      } else {
        const selected = {
          view: `${('0' + newValue.getDate()).slice(-2)}/${('0' + (newValue.getMonth() + 1)).slice(-2)}/${newValue.getFullYear()}`,
          api: `${newValue.getFullYear()}-${newValue.getMonth() + 1}-${newValue.getDate()}`,
          rawDate: newValue
        }
        this.$emit('update:selected', selected)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

.datepicker-component {
  width: 336px;
  height: 336px;
  position: absolute;
  z-index: 9999;
  background-color: @color-white;
  text-align: center;
  border-radius: @btn-border-radius;

  @media screen and (max-width: 375px) {
    width: 320px;
  }

  .datepicker-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    padding: 20px 24px 0 24px;

    .datepicker-year-label {
      font-size: 14px;
      color: @color-gray-500;
      height: 24px;
    }

    .datepicker-label {
      padding-bottom: 1px;
      font-size: 16px;
      font-weight: 500;
      text-transform: capitalize;
      color: @color-dark;
      cursor: pointer;
    }

    .datepicker-buttons {
      position: absolute;
      right: 24px;
      bottom: 0;

      button {
        margin-left: 8px;
        padding-left: 8px;
        height: 24px;
        width: 24px;
        border: 1px solid lightgray;
        background-color: @color-gray-200;
        border-radius: 2px;
        opacity: 0.5;
        transition: opacity 100ms ease-in-out;

        &:focus{
          outline: none;
        }

        &.disabled {
          opacity: 0.2;
        }

        &:hover:not(.disabled) {
          background-color: @color-gray-200 !important;
          cursor: pointer;
          opacity: 1;
        }

        .arrow-left, .arrow-right {
          width: 0;
          height: 0;
          border-style: solid;
          display: block;
        }

        .arrow-left {
          border-width: 5px 5px 5px 0;
          border-color: transparent #000000 transparent transparent;
        }

        .arrow-right {
          border-width: 5px 0 5px 5px;
          border-color: transparent transparent transparent #000000;
        }
      }
    }
  }

  .datepicker-body {
    padding: 8px 16px 0 16px;
    height: 245px;
  }
}
</style>
