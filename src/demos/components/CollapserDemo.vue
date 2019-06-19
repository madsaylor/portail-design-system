<template>
  <div class="row-col">
    <h3>Collapser</h3>
    <p>Collapser component for displaying collapsible content</p>

    <Description compnent-name="Collapser"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="collapser-demo-wrapper">
      <Collapser :opened.sync="openCollapser" :label="label">
        <h3>We are the stewards of the hierarchy</h3>
      </Collapser>
    </div>
  </div>
</template>

<script>
  import Collapser from '../../components/Collapser'
  import Description from '../../descriptions/Description'

let usage = `
  <Collapser :opened.sync="openCollapser" :label="label">
    <h3>We are the stewards of the hierarchy</h3>
  </Collapser>
`.slice(1)

  export default {
    name: 'CollapserDemo',
    components: {Collapser, Description},
    data: () => ({
      usage,
      openUsage: true,
      data: undefined,
      label: 'Collapser',
      openCollapser: false
    })
  }
</script>

<style lang="less" scoped>
  .collapser-demo-wrapper {
    margin-top: 50px;
  }
</style>
