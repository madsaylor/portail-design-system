<template>
  <div id="app" class="main">
    <sidebar></sidebar>
    <div class="main-content grid">
      <div class="row-col">
        <h1>Portail v3 Design System</h1>
      </div>

      <GridDemo></GridDemo>
      <ColorsDemo></ColorsDemo>
      <TextDemo></TextDemo>
      <IconsDemo></IconsDemo>
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
  }
}
</script>

<style lang="less">
@import './styles/main';
@import './styles/grid';
@import './styles/vars';

body {
  .font-desktop-body-medium-dark();
  background: @color-gray-100;
}

code {
  padding: 20px !important;
}
</style>
