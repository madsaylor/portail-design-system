<template>
  <div class="grid">
    <div class="row-col">
      <h2>Components</h2>

      <h3>Usage</h3>
      In vanilla javascript:
      <pre v-highlightjs="usageJs"><code class="js"></code></pre>
    </div>

    <component v-for="demo in componentDemos" :is="demo" :key="demo.name" />
  </div>
</template>

<script>
let context = require.context('./components', false, /.*\.vue$/)
let componentDemos = context.keys().map(key => context(key).default)

let usageJs = `
// Vue is externalized from the library so it needs to be installed and
// imported independently
import Vue from 'vue';
// Import components
import components from '@betao/ds'
// Load extracted css
import '@betao/ds/css'

// Turn the bare bone config into a fully fledged component
const MyComponent = Vue.extend(components['MyComponent'])

// Create and mount the component
new MyComponent(...).$mount('#mount-point')
`.slice(1)

export default {
  name: 'components-demo',
  data: () => ({
    usageJs,
    componentDemos,
  })
}
</script>
