<template>
    <div class="row-col">
      <h3>Table</h3>
      <p>Table component for displaying list of data</p>

      <Description compnent-name="Table"></Description>

      <Collapser :opened.sync="openUsage" label="Usage">
        <pre v-highlightjs="usage"><code class="html"></code></pre>
      </Collapser>

      <Table
        v-model="clients"
        :range="range"
        :ratios="ratios"
        :identifierField="identifierField"
        :headers="headers"
      >
      </Table>
    </div>
</template>

<script>
  import Table from '../../components/Table'
  import Collapser from '../../components/Collapser'
  import Description from '../../descriptions/Description'
  import {TableData, GeneralData} from '../../static/index'

  export default {
    name: 'TableDemo',
    components: {Table, Collapser, Description},
    data: () => ({
      usage: TableData.usage,
      openUsage: true,
      clients: GeneralData.clients,
      ratios: ['14', '2', '3'],
      identifierField: 'name',
      range: undefined,
      headers: [
        { key: 'name', title: 'Name' },
        { key: 'type.name', title: 'Type' },
        { key: 'earned', title: 'Earned', prefix: '€' }
      ]
    })
  }
</script>

<style scoped>

</style>
