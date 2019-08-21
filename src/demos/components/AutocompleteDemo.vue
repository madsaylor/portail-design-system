<template>
  <div class="row-col">
    <h3>Autocomplete</h3>
    Input with the dropdown list available to search for matches from local or remote data sources
    <Description compnent-name="Autocomplete"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Autocomplete type="day" v-model="chosenDay"></Autocomplete>
    <Autocomplete type="month" v-model="chosenMonth"></Autocomplete>
    <Autocomplete type="year" v-model="chosenYear"></Autocomplete>
    <Autocomplete v-model="chosenYear" :data-list="dataList"></Autocomplete>
  </div>
</template>

<script>
  import Autocomplete from '../../components/Autocomplete.vue'
  import Description from '../../descriptions/Description'
  import Collapser from '../../components/Collapser.vue'
  import {AutocompleteData} from '../../static/index'

  export default {
    name: 'AutocompleteDemo',
    components: {Autocomplete, Description, Collapser},
    data: () => ({
      openUsage: true,
      usage: AutocompleteData.usage,
      chosenDay: undefined,
      chosenMonth: undefined,
      chosenYear: undefined,
      dataList: [
        {title: 'apple'},
        {title: 'banana'},
        {title: 'coco'},
        {title: 'pineapple'},
        {title: 'mango'},
        {title: 'grapefruit'},
      ]
    })
  }
</script>

<style lang="less" scoped>

</style>
