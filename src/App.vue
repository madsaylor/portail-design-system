<template>
  <div id="app" class="main-container">
    <sidebar></sidebar>
    <div class="main-content grid">
      <div class="row-col">
        <h1>Portail v3 Design System</h1>
        Links:
        <a href="https://github.com/betao-dev/portail-design-system">
          Github Repo
        </a>
        |
        <a href="https://projects.invisionapp.com/dsm/betao/portail-v-3">
          Invision (DSM)
        </a>
        |
        <a href="https://www.npmjs.com/package/@betao/ds">
          NPM package
        </a>
        <h2>Installation</h2>
        <pre v-highlightjs="installation"><code class="bash"></code></pre>

        <h2>Usage</h2>
        In javascript:
        <pre v-highlightjs="usageJs"><code class="js"></code></pre>
        In Less (variables and font mixins):
        <pre v-highlightjs="usageLess"><code class="less"></code></pre>

        <h2>Main layout</h2>
        <pre v-highlightjs="usageLayout"><code class="html"></code></pre>

      </div>

      <GridDemo></GridDemo>
      <ColorsDemo></ColorsDemo>
      <TextDemo></TextDemo>
      <IconsDemo></IconsDemo>

      <div class="row-col">
        <h2>Components</h2>
        TODO
      </div>
    </div>
  </div>
</template>

<script>
import GridDemo from './demos/GridDemo.vue'
import ColorsDemo from './demos/ColorsDemo.vue'
import TextDemo from './demos/TextDemo.vue'
import IconsDemo from './demos/IconsDemo.vue'

let usageJs = `
import components from '@betao/ds' // Vue components
import '@betao/ds/css'     // Load prebuild css
`.slice(1)

let usageLess = `
@import '~@betao/ds/vars';

.some-class {
  /* For list of color variables see Colors */
  color: @color-black;
  /* For list of font mixins see Font Styles */
  .font-desktop-body-medium-dark-center();
}
`.slice(1)

let usageLayout = `
<!-- Root element -->
<div id="app" class="main-container">
  <!-- Sidebar component -->
  <div class="sidebar">
    <!-- ... -->
  </div>
  <!-- Rest of the app -->
  <div class="main-container">
    <!-- ... -->
  </div>
</div>
`.slice(1)


export default {
  name: 'app',
  components: {
    GridDemo,
    ColorsDemo,
    TextDemo,
    IconsDemo,
  },
  data: () => ({
    installation: `$ npm install "@betao/ds" --save`,
    usageJs,
    usageLess,
    usageLayout,
  })
}
</script>

<style lang="less">
@import './styles/main';
@import './styles/grid';
@import './styles/vars';


/* "Reset" */
html, body {
  margin: 0;
  padding: 0;
  min-height: 100%;
}


code {
  padding: 20px !important;
}
</style>
