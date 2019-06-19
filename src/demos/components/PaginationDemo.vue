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
          <template v-slot="slotProps">
            <Table v-model="clients"
                   :range="slotProps.range"
                   :ratios="ratios"
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

let usage = `
  <Pagination :count="count"
              :size="size"
              :current="current">
      <template v-slot="slotProps">
        <Table v-model="clients"
               :range="slotProps.range"
               :ratios="ratios"
               :identifierField="identifierField">
        </Table>
      </template>
  </Pagination>
`.slice(1)

  export default {
    name: 'PaginationDemo',
    components: {Pagination, Table, Collapser, Description},
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
      count: 4,
      size: 3,
      current: 1,
      ratios: ['14', '2', '3'],
      identifierField: 'name'
    })
  }
</script>

<style lang="less" scoped>

</style>
