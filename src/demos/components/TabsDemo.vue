<template>
  <div class="row-col">
    <h3>Tabs</h3>

    <h4>Usage</h4>
    <p>Tabs component can be controlled by next properties: </p>
    <Description compnent-name="Tabs"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Tabs :tabs="tabs" :active="active" @tab:click="onTabClick"/>

    <div class="answer">Tap on current tab returns name:
        <b>{{selected}}</b>
    </div>
  </div>
</template>

<script>
  import Tabs from '../../components/Tabs'
  import Description from '../../descriptions/Description'
  import Collapser from '../../components/Collapser.vue'
  import {TabsData} from '../../static/index'

  export default {
    name: 'TabsDemo',
    components: { Tabs, Description, Collapser},
    data() {
      return ({
        openUsage: true,
        usage: TabsData.usage,
        active: 0,
        tabs: TabsData.tabs
      })
    },
    methods: {
      onTabClick(tab, index) {
        this.active = index;
      }
    },
    computed: {
      selected () {
          return this.tabs[this.active].text
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../styles/vars';

  .answer {
    padding: 25px;
    background-color: white;
  }
</style>
