<template>
  <div class="row-col">
    <h3>EmptyState</h3>
    <p>Empty state component for empty pages</p>

    <Description compnent-name="EmptyState"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <EmptyState v-model="details"></EmptyState>
  </div>
</template>

<script>
  import EmptyState from '../../components/EmptyState'
  import Collapser from '../../components/Collapser'
  import Description from '../../descriptions/Description'

let usage = `
  <EmptyState v-model="details"></EmptyState>
`.slice(1)

  export default {
    name: 'EmptyStateDemo',
    components: {EmptyState, Collapser, Description},
    data: () => ({
      usage,
      openUsage: true,
      details: {
        title: `Vous n'avez pas encore créé de factures...`,
        moreInfo: `En tant qu'auto-entrepreneur vous avez l'obligation légale de facturer vos clients`,
        btnLabel: 'Create invoice',
        imgName: 'invoice-empty'
      }
    })
  }
</script>

<style lang="less" scoped>

</style>
