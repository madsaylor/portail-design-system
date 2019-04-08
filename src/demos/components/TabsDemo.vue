<template>
  <div class="row-col">
    <h3>Tabs</h3>

    <h4>Usage</h4>
    <p>Tabs component can be controlled by next properties: </p>

    <ul>
      <li><b>active</b> is a number which describes index of chosen by default item</li>
      <li><b>disabled</b> disable all tabs</li>
      <li><b>tabs</b> is an object, which can have next props:
        <ul>
          <li><b>text</b> is string. This property is required. </li>
          <li><b>disabled</b> is a boolean which describes if tab disabled</li>
          <li><b>hidden</b> is a boolean which describes if tab hidden</li>
        </ul>
      </li>
    </ul>

    <p><i>Events:</i></p>
    <p><b>@tab:click</b> - return tab's configuration object and it's index</p>

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <Tabs :tabs="tabs" :active="active" @tab:click="onTabClick"/>

    <div class="answer">Tap on current tab returns name:
        <b>{{selected}}</b>
    </div>
  </div>
</template>

<script>
  import Tabs from '../../components/Tabs'

  let usage = `<Tabs :tabs="tabs" :active="active" @tab:click="onTabClick"/>`

  export default {
    name: "TabsDemo",
    components: { Tabs },

    data() {
      return ({
        usage,
        active: 0,
        tabs: [
          {
            text: 'MES FACTURES'
          },
          {
            text: 'MES DEVIS'
          },
          {
            text: 'MES AVOIRS'
          }
        ]
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
