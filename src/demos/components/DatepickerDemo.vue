<template>
  <div class="ds-grid grid-select-demo">
    <div class="row-col">
      <h3>Datepicker</h3>

      Datepicker with min/max selection limit.
      Selected Date is updated through v-model directive
      <Description compnent-name="Datepicker"></Description>
      <Collapser :opened.sync="openUsage" label="Usage">
        <pre v-highlightjs="usage"><code class="html"></code></pre>
      </Collapser>

      Localization support:

      <span v-for="lang in ['fr-fr', 'en-us', 'sv-se', 'ru-ru', 'ja-ja']">
        <input type="radio" :id="lang" :value="lang" v-model="$root.locale">
        <label :for="lang">{{ lang }}</label>
      </span>

      <br/>

      Selected date: {{ dateSelected }}

      <Datepicker
        :min="new Date('2002-02-10')"
        :max="new Date('2018-12-21')"
        v-model="dateSelected"
      ></Datepicker>
    </div>
  </div>
</template>

<script>
import Datepicker from '../../components/Datepicker'
import Description from '../../descriptions/Description'
import Collapser from '../../components/Collapser.vue'
import {DatepickerData} from '../../static/index'

export default {
  name: "DatepickerDemo",
  components: {
    Datepicker, Description, Collapser
  },
  data() {
    return {
      dateSelected: new Date('2006-02-12'),
      dateSelected2: new Date(),
      usage: DatepickerData.usage,
      openUsage: true,
    }
  }
}
</script>

<style lang="less" scoped>

</style>
