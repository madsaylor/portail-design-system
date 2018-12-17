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
          Invision (desktop)
        </a>
        |
        <a href="https://www.npmjs.com/package/@betao/ds">
          NPM package
        </a>
        <h2>Installation</h2>
        <pre v-highlightjs="installation"><code class="bash"></code></pre>
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

export default {
  name: 'app',
  components: {
    GridDemo,
    ColorsDemo,
    TextDemo,
    IconsDemo,
  },
  data: () => ({
    installation: `$ npm install "@betao/ds" --save`
  })
}
</script>

<style lang="less">
@import './styles/main';
@import './styles/grid';
@import './styles/vars';

code {
  padding: 20px !important;
}
</style>
