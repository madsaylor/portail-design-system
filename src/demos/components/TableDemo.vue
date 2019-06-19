<template>
    <div class="row-col">
      <h3>Table</h3>
      <p>Table component for displaying list of data</p>

      <Description compnent-name="Table"></Description>

      <Collapser :opened.sync="openUsage" label="Usage">
        <pre v-highlightjs="usage"><code class="html"></code></pre>
      </Collapser>

      <Table v-model="clients"
             :range="range"
             :ratios="ratios"
             :identifierField="identifierField">
      </Table>
    </div>
</template>

<script>
  import Table from '../../components/Table'
  import Collapser from '../../components/Collapser'
  import Description from '../../descriptions/Description'

let usage = `
  <Table v-model="clients"
         :range="range"
         :ratios="ratios"
         :identifierField="identifierField">
  </Table>
`.slice(1)

  export default {
    name: 'TableDemo',
    components: {Table, Collapser, Description},
    data: () => ({
      usage,
      openUsage: true,
      clients: [
        {
          name: 'Adam L1',
          type: 'Person',
          earned: '€ 3,123.34'
        },
        {
          name: 'Adam L2',
          type: 'Person',
          earned: '€ 3,123.34'
        },
        {
          name: 'Adam L3',
          type: 'Person',
          earned: '€ 3,123.34'
        },
        {
          name: 'Adam L4',
          type: 'Person',
          earned: '€ 3,123.34'
        }
      ],
      ratios: ['14', '2', '3'],
      identifierField: 'name',
      range: undefined
    })
  }
</script>

<style scoped>

</style>
