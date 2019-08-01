<template>
  <div class="row-col">
    <h3>MultiSelectDropdown</h3>

    Custom select with support multiple choices
    <Description compnent-name="MultiSelectDropdown"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="row-col">
      <MultiSelectDropdown v-model="multiSelectValue"
                           :options="options"
                           :open-drop-down-list.sync="openDropDownList">
      </MultiSelectDropdown>
    </div>
  </div>
</template>

<script>
  import MultiSelectDropdown from '../../components/MultiSelectDropdown'
  import Description from '../../descriptions/Description'
  import Collapser from '../../components/Collapser.vue'
  import {MultiSelectDropdownData} from '../../static/index'

  export default {
    name: 'MultiSelectDropdownDemo',
    components: {MultiSelectDropdown, Description, Collapser},
    data: () => ({
      openUsage: true,
      usage: MultiSelectDropdownData.usage,
      multiSelectValue: ['Espèces', 'Virement'],
      options: [{
        value: 'Espèces'
      }, {
        value: 'Chèque'
      }, {
        value: 'Virement'
      }, {
        value: 'Carte bancaire'
      }, {
        value: 'Tout moyen de paiement'
      }],
      openDropDownList: false
    })
  }
</script>

<style lang="less" scoped>

</style>
