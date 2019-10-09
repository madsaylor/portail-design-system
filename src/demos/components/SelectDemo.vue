<template>
  <div class="row-col">
    <h3>Select</h3>

    Custom Select component
    <Description compnent-name="Select"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="row-col">
      <Select
        label="Select"
        v-model="selectValue"
        :options="options"
        :validators="selectValidators"
        :placeholder="'Input Value'"
        :idMode="true"
      />
    </div>
  </div>
</template>

<script>
  import Select from '../../components/Select'
  import Description from '../../descriptions/Description'
  import Collapser from '../../components/Collapser.vue'
  import { SelectData } from '../../static/index'

  export default {
    name: 'SelectDemo',
    components: { Select, Description, Collapser },
    data: () => ({
      openUsage: true,
      usage: SelectData.usage,
      selectValue: { id: 2 },
      options: [
        { id: 1, value: 'Espèces' },
        { id: 2, value: 'Chèque' },
        { id: 3, value: 'Virement' },
        { id: 4, value: 'Carte bancaire' }
      ],
      selectValidators: [
        {
          name: 'required',
          message: 'The field is required',
          validator: value => value && !!value
        }
      ]
    })
  }
</script>
