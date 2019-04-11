<template>
  <div class="row-col">
    <h3>Menu</h3>

    Basic styled componnet: items, click event
    <Description compnent-name="Menu"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Button ref="menuDrop" @click="dropdownOpened = !dropdownOpened">Open menu</Button>

    <Dropdown
      :target="$refs.menuDrop"
      :opened.sync="dropdownOpened"
      :position="position"
    >
      <Menu
        :items="items"
        @item:click="menuClick"
      />
    </Dropdown>
  </div>
</template>

<script>
import Button from '../../components/Button.vue'
import Dropdown from '../../components/Dropdown.vue'
import Menu from '../../components/Menu.vue'
import Description from '../../descriptions/Description'
import Collapser from '../../components/Collapser.vue'

let usage = `
  <Menu
    :items="items"
    @item:click="menuClick"
  />
`.slice(1)

export default {
  name: 'MenuDemo',
  components: { Button, Dropdown, Menu, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage,
    dropdownOpened: false,
    position: 'bottom-right',
    items: [
      { title: 'Parameters du compte', icon: 'send', disabled: true },
      { title: 'Se deconnecter', icon: 'search' }
    ]
  }),
  methods: {
    menuClick() {
      this.dropdownOpened = false
    }
  }
}
</script>
