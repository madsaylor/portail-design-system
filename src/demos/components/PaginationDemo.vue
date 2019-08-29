<template>
    <div class="row-col">
      <h3>Pagination</h3>
      <p>Pagination component for display data like table with pagination</p>

      <Description compnent-name="Pagination"></Description>

      <Collapser :opened.sync="openUsage" label="Usage">
        <pre v-highlightjs="usage"><code class="html"></code></pre>
      </Collapser>

      <Pagination :count="count"
                  :size="size"
                  :current="current">
          <template>
            <Table v-model="clients"
                   :ratios="ratios"
                   :headers="headers"
                   :identifierField="identifierField">
            </Table>
          </template>
      </Pagination>
    </div>
</template>

<script>
  import Pagination from '../../components/Pagination'
  import Table from '../../components/Table'
  import Collapser from '../../components/Collapser'
  import Description from '../../descriptions/Description'
  import {PaginationData, GeneralData} from '../../static/index'

  export default {
    name: 'PaginationDemo',
    components: {Pagination, Table, Collapser, Description},
    data: () => ({
      usage: PaginationData.usage,
      openUsage: true,
      clients: GeneralData.clients,
      count: 4,
      size: 3,
      current: 1,
      ratios: ['14', '2', '3'],
      identifierField: 'name',
      headers: [
        { key: 'name', title: 'Name' },
        { key: 'type', title: 'Type' },
        { key: 'earned', title: 'Earned' }
      ]
    })
  }
</script>

<style lang="less" scoped>

</style>
