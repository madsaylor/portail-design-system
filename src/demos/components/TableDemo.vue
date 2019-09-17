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
      :headers="headers"
    >
    </Table>
  </div>
</template>

<script>
  import moment from 'moment'
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
      headers: [
        { key: 'name', title: 'Name', width: '30%' },
        { key: 'type.name', title: 'Type', width: '20%' },
        { key: 'earned', title: 'Earned', prefix: '€', sortable: true },
        { key: 'invoice_date', title: 'Date', sortable: true, filter: (value) => moment(value).format('DD-MM-YYYY') },
        { key: 'status', title: 'Status', badge: true }
      ]
    })
  }
</script>

<style scoped>

</style>
