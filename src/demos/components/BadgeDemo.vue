<template>
  <div class="row-col">
    <h3>Badge</h3>
    Badge with an optional icon
    <Description compnent-name="Badge"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>
    <div class="badges">
      <Badge text="Annulée" color="red"></Badge>
      <Badge text="Brouillon" color="gray"></Badge>
      <Badge text="En retard" color="dark"></Badge>
      <Badge text="Payé" color="primary"></Badge>
      <Badge text="En attente" color="yellow"></Badge>
      <Badge text="Done" color="primary" icon="check_circle_outline" icon-size="20px"></Badge>
      <Badge text="Proccessing" color="yellow" icon="query_builder" icon-size="20px"></Badge>
      <Badge text="Needs Response" color="red" icon="error_outline" icon-size="20px"></Badge>
    </div>
  </div>
</template>

<script>
  import Badge from '../../components/Badge.vue'
  import Description from '../../descriptions/Description'
  import Collapser from '../../components/Collapser.vue'

  let usage = `
      <Badge text="Annulée" color="red"></Badge>
      <Badge text="Brouillon" color="gray"></Badge>
      <Badge text="En retard" color="dark"></Badge>
      <Badge text="Payé" color="primary"></Badge>
      <Badge text="En attente" color="yellow"></Badge>
      <Badge text="Done" color="primary" icon="check_circle_outline" icon-size="20px"></Badge>
      <Badge text="Proccessing" color="yellow" icon="query_builder" icon-size="20px"></Badge>
      <Badge text="Needs Response" color="red" icon="error_outline" icon-size="20px"></Badge>
  `.slice(1);

  export default {
      name: 'BadgeDemo',
      components: {Badge, Description, Collapser},
      data: () => ({
        openUsage: true,
        usage
      })
    }
</script>

<style lang="less" scoped>
  .badges {
    display: flex;
    justify-content: space-between;
  }
</style>
