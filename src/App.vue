<template>
  <div id="app" class="main">
    <div class="main-sidebar card">
      Sidebar
    </div>
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

.card {
  background: @color-white;
  padding: @vu * 2;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

code {
  padding: 20px !important;
}
</style>
