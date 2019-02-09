<template>
  <div class="row-col">
    <h3>AppHeader</h3>

    <pre v-highlightjs="usage"><code class="html"></code></pre>

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
  components: {AppHeader, Button},
  data: () => ({
    usage,
  })
}
</script>
