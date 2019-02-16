<!--
  Datepicker with min/max selection limit.

  Usage:

    <Datepicker
      :lang="'en-en'"  - BCP 47 localization code
      :min="minDate"   - earliest selectable day
      :max="manDate"   - upper bound for the selection
      v-model="date"   - selected date
    />

  Properties:

    lang - String. BCP 47 code. Language to be used in the datepicker
      for month names and weekday labels. Can be set globally with
      $root.locale. This property overrides global setting

    min - Date. Optional earliest selectable day

    max - Date. Optional latest selectable day

  Model:

    Selected Date is updated through v-model directive
-->

<template>
  <div class="datepicker">
    <div class="header">
      <div class="labels">
        <div
          :class="['decade', {
            'hidden': view === 'day' || view === 'month',
            'label-main': view === 'year',
          }]"
          @click="view = 'month'"
        >
          {{ decade }}
        </div>
        <div
          :class="['year', {
            'hidden': view === 'year',
            'label-sup': view === 'day',
            'label-main': view === 'month',
          }]"
          @click="view = 'year'"
        >
          {{ year }}
        </div>

        <div
          :class="['year', {
            'hidden': view === 'month' || view === 'year',
            'label-main': view === 'day',
          }]"
          @click="view = 'month'"
        >
          {{ monthName }}
        </div>
      </div>
      <div class="buttons">
        <Button
          plain icon="arrow_left" @click="shift(-1)" :disabled="!canShiftBack"
        ></Button>
        <Button
          plain icon="arrow_right" @click="shift(1)" :disabled="!canShiftForward"
        ></Button>
      </div>
    </div>

    <div class="body">
      <GridSelect
        v-if="view === 'day'"
        :items="days"
        :labels-top="weekLabels"
        :selected-key="date => date.getTime()"
        v-model="selected"
      ></GridSelect>

      <GridSelect
        v-if="view === 'month'"
        :items="months"
        :selected-key="date => date.getFullYear() + '-' + date.getMonth()"
        :value="selected"
        @input="selectMonth"
        #default="{item}"
      >
        <span class="grid-item-big">{{item.title}}</span>
      </GridSelect>

      <GridSelect
        v-if="view === 'year'"
        :items="years"
        :selected-key="date => date.getFullYear()"
        :value="selected"
        @input="selectYear"
        #default="{item}"
      >
        <span class="grid-item-big">{{item.title}}</span>
      </GridSelect>
    </div>
  </div>
</template>

<script>
import GridSelect from './GridSelect'
import Button from './Button'

export default {
  name: 'Datepicker',
  components: {
    GridSelect,
    Button,
  },
  props: {
    lang: String,
    max: Date,
    min: Date,
    value: {
      type: Date,
      default: () => new Date(),
    },
    // ---------------------------------------------------------------------
    startDate: {
      type: Date,
      default: () => new Date()
    },
    range: {
      type: Object
    }
    // ---------------------------------------------------------------------
  },
  data() {
    return {
      displayed: new Date(this.value),
      view: 'day',

      // -------------------------------------------------------------------
      selected: new Date(this.value),
      selected: new Date(this.value),
      dateRange: {
        min: null,
        max: null
      },
      monthGrid: false,
      fromMonthScreen: false,
      advDisabled: false,
      recDisabled: false,
      canShiftForward: true,
      canShiftBack: true,
    }
  },
  created () {
    this.range && this.setRange()
  },
  computed: {
    locale() {
      return this.lang || this.$root.locale || 'fr-fr'
    },
    decade() {
      let start = Math.floor(this.displayed.getFullYear() / 10) * 10
      return `${start} — ${start + 9}`
    },
    year() {
      return this.displayed.getFullYear()
    },
    month() {
      return this.displayed.getMonth()
    },
    monthName() {
      return this.displayed.toLocaleString(this.locale, {month: 'long'})
    },
    /**
     * Days for the day selection grid for the displayed month
     * @return {Array<Array<Date>>} 6 by 7 nested array
     */
    days () {
      let date = new Date(this.displayed)
      date.setDate(1)
      date.setDate(2 - (date.getDay() || 7))  // first displayed Monday
      let days = []
      for (let i = 0; i < 6; i++) {
        let week = []
        for (let j = 0; j < 7; j++) {
          let day = new Date(date)
          day.title = day.getDate()
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
      return days
    },
    /**
     * months for the month selection grid for the displayed year
     * @return {Array<Array<Object>>} 3 by 4 nested array
     */
    months () {
      let date = new Date(this.displayed)
      date.setMonth(0)
      let months = []
      for (let i = 0; i < 4; i++) {
        let quarter = []
        for (let j = 0; j < 3; j++) {
          let month = new Date(date)
          month.title = (month.toLocaleString(this.locale, {month: 'long'}))
          if (this.range && this.outOfRangeMonth(month)) {
            month.disabled = true
          }
          quarter.push(month)
          date.setMonth(date.getMonth() + 1)
        }
        months.push(quarter)
      }
      return months
    },
    /**
     * years for the year selection grid for the displayed decade
     * @return {Array<Array<Object>>} 3 by 4 nested array
     */
    years () {
      let date = new Date(this.displayed)
      date.setFullYear(Math.floor(date.getFullYear() / 10) * 10)
      let years = []
      for (let i = 0; i < 3; i++) {
        let row = []
        for (let j = 0; j < 3; j++) {
          let year = new Date(date)
          year.title = year.getFullYear()
          row.push(year)
          date.setFullYear(date.getFullYear() + 1)
        }
        years.push(row)
      }
      let lastYear = new Date(date)
      lastYear.title = lastYear.getFullYear()

      years.push([
        {title: '', disabled: true, getFullYear: () => null},
        lastYear,
        {title: '', disabled: true, getFullYear: () => null},
      ])
      return years
    },

    //----------------------------------------------------------------------
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
  },
  methods: {
    selectMonth(item) {
      this.displayed = item
      this.view = 'day'
    },
    selectYear(item) {
      this.displayed = item
      this.view = 'month'
    },
    shift(delta) {
      switch(this.view) {
        case 'day':
          this.displayed.setMonth(this.month + delta)
          this.displayed = new Date(this.displayed)
          break
        case 'month':
          this.displayed.setFullYear(this.year + delta)
          this.displayed = new Date(this.displayed)
          break
        case 'year':
          this.displayed.setFullYear(this.year + delta * 10)
          this.displayed = new Date(this.displayed)
          break
      }
    },
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
        this.fromMonthScreen = true
      } else {
        // We don't want to emit value if we selected month from month view
        if (!this.fromMonthScreen) {
          const selected = {
            view: `${('0' + newValue.getDate()).slice(-2)}/${('0' + (newValue.getMonth() + 1)).slice(-2)}/${newValue.getFullYear()}`,
            api: `${newValue.getFullYear()}-${newValue.getMonth() + 1}-${newValue.getDate()}`,
            rawDate: newValue
          }
          this.$emit('update:selected', selected)
        } else {
          this.fromMonthScreen = false
        }
      }
    }
  }
}
</script>

<style lang="less">
@import '../styles/vars';

.datepicker {
  background-color: @color-white;
  border-radius: 4px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  height: 336px;
  padding: 20px 13.5px;
  width: 336px;
  display: flex;
  flex-direction: column;

  .header {
    padding: 0 10.5px;
    height: 64px;
    display: flex;

    .labels {
      flex: 1 0 auto;
      position: relative;

      * {
        transition: all .1s ease;
      }
      .hidden {
        display: none;
      }

      .label-sup {
        .font-desktop-small-regular-gray();
        position: absolute;
        top: 0px;
      }

      .label-main {
        .font-desktop-body-medium-dark();
        text-transform: capitalize;
        position: absolute;
        top: 20px;
      }
    }

    // Design:
    .buttons {
      padding-top: 18px;
      button {
        height: 24px;
        width: 24px;
        box-sizing: border-box;
        padding: 0;
        margin-left: 8px;
        border: 1px solid #E1E2E6;
        background-color: #F2F4F7;
        border-radius: 0;
      }
    }

    // Proposal:
    // .buttons {
    //   button {
    //     height: 44px;
    //     width: 44px;
    //     margin-left: 8px;
    //     .icon {
    //       margin-left: -6px;
    //     }
    //   }
    // }
  }

  .body {
    height: 232px;
    width: 308px;

    .grid-select .item-cell .item.other-month {
      color: @color-gray-400;
    }
    .grid-select .item-cell.selected .item.other-month {
      color: @color-white;
      background-color: fade(@color-primary, 50%);
    }

    .grid-item-big {
      .font-desktop-body-medium-dark();
      text-transform: capitalize;
      padding: 4px;
    }
    .item-cell.selected .grid-item-big {
      color: @color-white;
    }
  }
}
</style>
