<template>
  <div class="row-col">
    <h3>AppHeader</h3>

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <AppHeader>
      Hello, world!
    </AppHeader>
  </div>
</template>

<script>
import AppHeader from '../../components/AppHeader.vue'

let usage = `
<AppHeader>
  Hello, world!
</AppHeader>
`.slice(1)

export default {
  name: 'AppHeaderDemo',
  components: {AppHeader},
  data: () => ({
    usage,
  })
}
</script>
