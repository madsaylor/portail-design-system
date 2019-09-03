<template>
  <div class="row-col">
    <h3>Star</h3>
    Stars list for rate

    <Description compnent-name="Star"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Star></Star>
  </div>
</template>

<script>
  import Star from '../../components/Star.vue'
  import Description from '../../descriptions/Description'
  import Collapser from '../../components/Collapser.vue'
  import {StarData} from '../../static/index'

  export default {
    name: 'StarDemo',
    components: {Star, Description, Collapser},
    data: () => ({
      openUsage: true,
      usage: StarData.usage
    })
  }
</script>

<style lang="less" scoped>

</style>
