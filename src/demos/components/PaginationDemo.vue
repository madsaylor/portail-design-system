<template>
    <div class="row-col">
      <h3>Pagination</h3>
      <p>Pagination component for display data like table with pagination</p>

      <Description compnent-name="Pagination"></Description>

      <Collapser :opened.sync="openUsage" label="Usage">
        <pre v-highlightjs="usage"><code class="html"></code></pre>
      </Collapser>

      <Pagination
        :count="count"
        :size="size"
        :current="current"
        @getCurrent="updatePage"
      />
    </div>
</template>

<script>
  import Pagination from '../../components/Pagination'
  import Collapser from '../../components/Collapser'
  import Description from '../../descriptions/Description'
  import {PaginationData} from '../../static/index'

  export default {
    name: 'PaginationDemo',
    components: {Pagination, Collapser, Description},
    data: () => ({
      usage: PaginationData.usage,
      openUsage: true,
      size: 10,
      current: 1,
      count: 25
    }),
    methods: {
      updatePage(page) {
        this.current = page
      }
    },
  }
</script>

<style lang="less" scoped>

</style>
