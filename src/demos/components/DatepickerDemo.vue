<template>
  <div class="grid grid-select-demo">
    <div class="row-col">
      <h3>Datepicker</h3>

      Datepicker with min/max selection limit.

      <pre v-highlightjs="usage"><code class="html"></code></pre>

      Localization support:

      <span v-for="lang in ['fr-fr', 'en-us', 'sv-se', 'ru-ru', 'ja-ja']">
        <input type="radio" :id="lang" :value="lang" v-model="$root.locale">
        <label :for="lang">{{ lang }}</label>
      </span>

      <br/>

      Selected date: {{ dateSelected }}

      <Datepicker
        :start-date="new Date('2018-8-8')"
        v-model="dateSelected"
      ></Datepicker>
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
      usage,
    }
  }
}
</script>

<style lang="less" scoped>
</style>
