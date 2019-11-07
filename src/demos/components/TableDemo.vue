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
      <template v-slot:cell-status="{value, orgValue}">
        <Badge :color="colors[orgValue]" >{{ value }}</Badge>
      </template>
    </Table>
  </div>
</template>

<script>
  import moment from 'moment'
  import Table from '../../components/Table'
  import Badge from '../../components/Badge'
  import Collapser from '../../components/Collapser'
  import Description from '../../descriptions/Description'
  import {TableData, GeneralData} from '../../static/index'

  const COLORS_BY_STATUS = {
    cancelled: '#30302d',
    refunded: '#3B9AE3',
    partial_refunded: '#52a0d8',
    draft: '#9e9e9e',
    paid_with_deposit: '#66bb6a',
    paid: '#66bb6a',
    converted: '#66bb6a',
    expired: '#ef5350',
    pending_with_paid_deposit: '#68b7a3',
    pending_with_deposit_pending: '#ffa726',
    waiting: '#ffa726',
    sent: '#1E88E5',
    Pending: '#ffa726',
    Proceeded: '#963CE3',
    default: '#9e9e9e'
  };

  export default {
    name: 'TableDemo',
    components: {Table, Badge, Collapser, Description},
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
      ],
      colors: COLORS_BY_STATUS
    })
  }
</script>

<style scoped>

</style>
