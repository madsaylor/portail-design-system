<!--
  Custom datepicker-like calendar component.

  Usage:

    <Calendar
      :value=new Date('2019-1-1') - value which will be set as selected
      :locale='en-en' - calendar localisation
      :has-range='true' - defines whether a calendar has a range of date available
        for selection
      :range='{min: -180, max: 30}' - range in days from the start for selection
      @update:selected='closeCalendar' - emitted when a new date is selected
    ></Calendar>

    Properties:

      value - Date. Start Date of the calendar, default is current Date.

      locale - String. Language used in calendar. Default is French.

      has-range - Boolean. Defines if a calendar selection range is limited. Default is false.

      range - Object. Range of days from which a user can select date.

    Events:

      update:selected - emitted when user chooses new date from the calendar component.
        Return an object with preformatted date as well as a Date Object.
-->

<template>
  <div class="calendar-component">
    <div class="calendar-header">
      <div class="calendar-select">
        <i @click="performChange(-1)">
          <span class="left"></span>
        </i>
        <span class="calendar-label"
              @click="monthGrid = !monthGrid"
        >{{headerLabel}}</span>
        <i @click="performChange(1)">
          <span class="right"></span>
        </i>
      </div>
    </div>

    <GridSelect
      :items="gridItems"
      :labels-top="gridLabels"
      v-model="selected"
      :height="'246px'"
    ></GridSelect>

  </div>
</template>

<script>
import GridSelect from './GridSelect'

export default {
  name: 'BaseCalendar',
  components: {
    GridSelect
  },
  props: {
    value: {
      type: Date,
      default: () => new Date()
    },
    locale: {
      type: String,
      default: 'fr-fr'
    },
    hasRange: {
      type: Boolean,
      default: false
    },
    range: {
      type: Object,
      default: () => {
        return {
          min: -180,
          max: 30
        }
      }
    }
  },
  data () {
    return {
      displayed: new Date(),
      selected: this.value,
      dateRange: {
        min: null,
        max: null
      },
      monthGrid: false
    }
  },
  mounted () {
    this.hasRange && this.setRange()
  },
  computed: {
    headerLabel () {
      return this.monthGrid ? this.year : `${this.monthName}, ${this.year}`
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
          if (this.hasRange && this.outOfRange(date)) {
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
          quarter.push(month)
          date.setMonth(date.getMonth() + 1)
        }
        months.push(quarter)
      }
      return months
    }
  },
  methods: {
    performChange (shift) {
      this.monthGrid ? this.changeYear(shift) : this.changeMonth(shift)
    },
    changeMonth (shift) {
      this.displayed.setMonth(this.month + shift)
      this.displayed = new Date(this.displayed)
    },
    changeYear (shift) {
      this.displayed.setFullYear(this.year + shift)
      this.displayed = new Date(this.displayed)
    },
    setRange () {
      /* how to determine the min/max month and date knowing that is 180 days before and 30 after current date */
      /* get miliseconds of now */
      const now = new Date().getTime()
      /* convert minRange to miliseconds */
      const daysToSec = 24 * 60 * 60 * 1000
      const minRange = (this.range.min || -180) * daysToSec
      const maxRange = (this.range.max || 30) * daysToSec
      const minDate = new Date(now + minRange)
      const maxDate = new Date(now + maxRange)
      this.dateRange.min = minDate
      this.dateRange.max = maxDate
    },
    outOfRange (date) {
      const min = date < this.dateRange.min
      const max = date > this.dateRange.max
      return min || max
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

.calendar-component {
  width: 320px;
  height: 308px;
  position: absolute;
  z-index: 9999;
  background-color: @color-white;
  text-align: center;
  border-radius: @btn-border-radius;

  .calendar-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 12px;

    .calendar-select {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 200px;
      margin: 4px auto 8px;
      text-transform: capitalize;
      color: @color-gray-600;

      .calendar-label {
        padding-bottom: 1px;
        font-size: 16px;
        font-weight: 500;
      }

      span {
        cursor: pointer;
      }

      i {
        background-color: #f6f6f6;
        border-radius: 50%;
        position: relative;
        cursor: pointer;
        padding: 8px;

        span {
          display: block;
          border: solid @color-gray-600;
          border-width: 0 2px 2px 0;
          padding: 3px;

          &.left {
            transform: rotate(135deg) translate(-1px);
          }

          &.right {
            transform: rotate(-45deg);
          }
        }
      }
    }
  }
}
</style>
