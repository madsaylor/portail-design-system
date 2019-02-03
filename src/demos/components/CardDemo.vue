<template>
  <div class="row-col">
    <h3>Card</h3>

    Basic styled component: background, padding, shadow.

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <Card>Hello, World!</Card>
  </div>
</template>

<script>
import Card from '../../components/Card.vue'

let usage = `
<Card>Hello, World!</Card>
<!-- OR -->
<div class="card">Hello, World!</div>
`.slice(1)

export default {
  name: 'CardDemo',
  components: {Card},
  data: () => ({usage})
}
</script>
