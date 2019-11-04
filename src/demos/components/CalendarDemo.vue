<template>
  <div class="row-col">
    <h3>Calendar</h3>

    Calendar
    <Description compnent-name="Calendar"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Calendar
      sm
      type="date"
      label="Date input"
      v-model="dateValue"
    />

    <Calendar
      sm
      type="date"
      label="Min and max dates"
      placeholder="Date"
      :minDate="new Date('2019-02-16')"
      :maxDate="new Date('2019-02-25')"
      v-model="dateValue2"
    />

    <Calendar
      sm
      type="date"
      label="N days min/max range"
      :datepickerBorderColorDesktop="borderColor"
      placeholder="Date"
      :dateRange="{min: 5, max: 10}"
      v-model="dateValue3"
    />

    <Calendar
      sm
      type="date"
      label="Modal"
      datepickerPosition="modal"
      placeholder="Date"
      v-model="dateValue"
    />

    <Calendar
      sm
      type="date"
      label="Changeable datepicker"
      datepickerPosition="default modal"
      :datepickerBackgroundColor="datepickerBackgroundColor"
      :datepickerBackdropOpacity="datepickerBackdropOpacity"
      :datepickerWrapperStyleObject="datepickerWrapperStyleObject"
      :datepickerFullWidth="datepickerFullWidth"
      :datepickerBorderColorDesktop="borderColor"
      datePositionChangeable
      placeholder="Date"
      v-model="dateValue"
    />
  </div>
</template>

<script>
  import Calendar from '../../components/Calendar'
  import Description from '../../descriptions/Description'
  import Collapser from '../../components/Collapser.vue'
  import {CalendarData} from '../../static/index'

  export default {
    name: 'CalendarDemo',
    components: {Calendar, Description, Collapser},
    data: () => ({
      openUsage: true,
      usage: CalendarData.usage,
      dateValue: new Date(),
      dateValue2: null,
      dateValue3: null,
      borderColor: '#e6e7eb',
      datepickerBackgroundColor: '#fff',
      datepickerBackdropOpacity: '0.8',
      datepickerWrapperStyleObject: {
        alignItems: 'flex-end'
      },
      datepickerFullWidth: true
    })
  }
</script>

<style scoped lang="less">

</style>
