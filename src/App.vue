<template>
  <div id="app" class="main-container">
    <sidebar
      @item:click="sidebarClick"
      :items="sidebarItems"
      :active.sync="sidebarActiveItem"
    ></sidebar>
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

        <h2>Main Layout</h2>
        <pre v-highlightjs="usageLayout"><code class="html"></code></pre>

        <h2>Vertical Rhythm</h2>
        Vertical Rhythm is used to guide in aligning all the objects on the
        screen vertically.
        <br/>
        All object are aligned vertically using 4px (@vu less variable) as a
        core unit.
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
<div class="main-container">
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

let sidebarIcons = [
  'assignment_outline',
  'receipt_outline',
  'group_outline',
  'work_outline',
  'assessment_outline',
  'new_releases_outline',
  'help_outline',
]

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
    sidebarItems: [],
    sidebarActiveItem: 0,
  }),
  methods: {
    sidebarClick: (item, index) => window.location.hash = item.title,
  },
  mounted() {
    let docHeaders = document.querySelectorAll('h2')
    let sidebarItems = []
    for (var i = 0; i < docHeaders.length; i++) {
      docHeaders[i].id = docHeaders[i].innerText
      sidebarItems.push({
        icon: sidebarIcons[i % sidebarIcons.length],
        title: docHeaders[i].innerText,
      })
    }
    this.sidebarItems = sidebarItems
  }
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
