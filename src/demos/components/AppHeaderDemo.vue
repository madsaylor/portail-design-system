<template>
  <div class="row-col">
    <h3>AppHeader</h3>
    <Description compnent-name="AppHeader"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <AppHeader>
      <template #left>
        <Button icon="menu" plain />
      </template>
      Hello, World!
      <template #right>
        <Button icon="account_circle" plain />
      </template>
    </AppHeader>
  </div>
</template>

<script>
import AppHeader from '../../components/AppHeader.vue'
import Button from '../../components/Button.vue'
import Description from '../../descriptions/Description'
import Collapser from '../../components/Collapser.vue'

let usage = `
<AppHeader>
  <template #left>
    <Button icon="menu" plain />
  </template>
  Hello, World!
  <template #right>
    <Button icon="account_circle" plain />
  </template>
</AppHeader>
`.slice(1)

export default {
  name: 'AppHeaderDemo',
  components: {AppHeader, Button, Description, Collapser},
  data: () => ({
    usage,
    openUsage: true
  })
}
</script>
