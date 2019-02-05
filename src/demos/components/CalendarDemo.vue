<template>
  <div class="grid grid-select-demo">
    <div class="row-col">
      <h3>Calendar</h3>

      Custom datepicker-like component.

      <pre v-highlightjs="usage"><code class="js"></code></pre>
      <div class="calendar-demo-wrapper">
        <div class="calendar-no-range">
          <h4>Without range</h4>
          <Calendar
            v-model="dateSelected"
          ></Calendar>
        </div>
        <div class="calendar-range">
          <h4>With range</h4>
          <Calendar
            v-model="dateSelected2"
            :has-range="true"
            :range="{min: -30, max: 30}"
          ></Calendar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '../../components/Calendar'

let usage = `
<Calendar
  v-model="dateSelected"
  :has-range="true"
  :range="{min: -30, max: 30}"
></Calendar>`
.slice(1)

export default {
  name: "CalendarDemo",
  components: {
    Calendar
  },
  data() {
    return {
      dateSelected: new Date(),
      dateSelected2: new Date(),
      usage
    }
  }
}
</script>

<style lang="less" scoped>
.calendar-demo-wrapper {
  display: flex;
  justify-content: space-around;

  .calendar-no-range {
    position: relative;
    height: 320px;
    width: 320px;
  }

  .calendar-range {
    position: relative;
    height: 320px;
    width: 320px;
  }
}
</style>
