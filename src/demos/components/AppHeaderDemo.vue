<template>
  <div class="row-col">
    <h3>AppHeader</h3>

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <AppHeader>
      <Button #left icon="menu" plain />
      Hello, World!
      <Button #right icon="account_circle" plain />
    </AppHeader>
  </div>
</template>

<script>
import AppHeader from '../../components/AppHeader.vue'
import Button from '../../components/Button.vue'

let usage = `
<AppHeader>
  <Button #left icon="menu" plain />
  Hello, World!
  <Button #right icon="account_circle" plain />
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
