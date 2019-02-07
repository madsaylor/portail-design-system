<template>
  <div class="grid grid-select-demo">
    <div class="row-col">
      <h3>Datepicker</h3>

      Datepicker with min/max selection limit.

      <pre v-highlightjs="usage"><code class="html"></code></pre>

      <div class="datepicker-demo-wrapper">
        <div class="datepicker-no-range">
          <h4>Without range</h4>
          <Datepicker
            v-model="dateSelected"
          ></Datepicker>
        </div>
        <div class="datepicker-range">
          <h4>With range</h4>
          <Datepicker
            v-model="dateSelected2"
            :start-date="new Date('2010-1-1')"
            :range="{min: -30, max: 10}"
          ></Datepicker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from '../../components/Datepicker'

let usage = `
<Datepicker
  v-model="dateSelected"
  :range="{min: -30, max: 10}"
  :startDate="new Date('2010-1-1')"
></Datepicker>`
.slice(1)

export default {
  name: "DatepickerDemo",
  components: {
    Datepicker
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
.datepicker-demo-wrapper {
  display: flex;
  justify-content: space-around;

  .datepicker-no-range {
    position: relative;
    height: 400px;
    width: 336px;
  }

  .datepicker-range {
    position: relative;
    height: 400px;
    width: 336px;
  }
}
</style>
