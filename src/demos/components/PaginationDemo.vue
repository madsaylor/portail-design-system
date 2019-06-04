<template>
    <div class="row-col">
      <h3>Pagination</h3>
      <p>Pagination component for display data like table with pagination</p>

      <Description compnent-name="Pagination"></Description>

      <Collapser :opened.sync="openUsage" label="Usage">
        <pre v-highlightjs="usage"><code class="html"></code></pre>
      </Collapser>

      <Pagination v-model="clients"
                  :count="count"
                  :size="size"
                  :current="current"
                  :ratios="ratios"
                  @previous="onPrevious"
                  @next="onNext">
      </Pagination>
    </div>
</template>

<script>
  import Pagination from '../../components/Pagination'
  import Collapser from '../../components/Collapser'
  import Description from '../../descriptions/Description'

let usage = `

`.slice(1)

  export default {
    name: 'PaginationDemo',
    components: {Pagination, Collapser, Description},
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
          },
          {
            name: 'Adam L5',
            type: 'Person',
            earned: '€ 3,123.34'
          },
          {
            name: 'Adam L6',
            type: 'Person',
            earned: '€ 3,123.34'
          },
          {
            name: 'Adam L7',
            type: 'Person',
            earned: '€ 3,123.34'
          },
          {
            name: 'Adam L7',
            type: 'Person',
            earned: '€ 3,123.34'
          }
      ],
      count: 8,
      size: 3,
      current: 1,
      ratios: ['8', '1', '1']
    }),
    methods: {
      onPrevious () {
        this.current--
      },
      onNext () {
        this.current++
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
