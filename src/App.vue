<template>
  <div id="app" class="main">
    <div class="main-sidebar">
      Sidebar
    </div>
    <div class="main-content">
      Main
      <GridDemo></GridDemo>
    </div>
  </div>
</template>

<script>
import GridDemo from './components/GridDemo.vue'

export default {
  name: 'app',
  components: {
    GridDemo,
  }
}
</script>

<style lang="less">
@import './styles/main.less';

.main-sidebar {
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

</style>
