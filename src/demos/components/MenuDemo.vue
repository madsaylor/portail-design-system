<template>
  <div class="row-col">
    <h3>Menu</h3>

    Basic styled componnet: items, click event
    <Description compnent-name="Menu"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Button ref="menuDrop" @click="dropdownOpenedMenu = !dropdownOpenedMenu" class="ds-demo-menu-btn">Open menu</Button>
    <Button ref="menuSelect" @click="dropdownOpenedMenuSelect = !dropdownOpenedMenuSelect" class="ds-demo-menu-btn">Open menu select</Button>

    <Dropdown
      :target="$refs.menuDrop"
      :opened.sync="dropdownOpenedMenu"
      :position="positionMenu"
    >
      <Menu
        :items="items"
        @item:click="menuClick"
      />
    </Dropdown>

    <Dialog :opened.sync="dropdownOpenedMenuSelect">
      <Menu
        searchMode
        menuSelectMode
        :title="title"
        :items="menuSelectItems"
        @item:click="menuClick"
        :opened.sync="dropdownOpenedMenuSelect"
        width="320px"
        height="360px"
      >
        <template #footer>
          <div class="ds-footer-content-menu">
            <Button icon="add"
                    class="ds-footer-button-menu"
                    plain-two
                    icon-color="primary"
                    icon-size="24px"
                    @click="addNewItem">

              Add new product / service
            </Button>
          </div>
        </template>
      </Menu>
    </Dialog>
  </div>
</template>

<script>
import Button from '../../components/Button.vue'
import Dropdown from '../../components/Dropdown.vue'
import Dialog from '../../components/Dialog.vue'
import Menu from '../../components/Menu.vue'
import Description from '../../descriptions/Description'
import Collapser from '../../components/Collapser.vue'
import {MenuData} from '../../static/index'

export default {
  name: 'MenuDemo',
  components: { Button, Dropdown, Menu, Description, Collapser, Dialog},
  data: () => ({
    openUsage: true,
    usage: MenuData.usage,
    dropdownOpenedMenu: false,
    dropdownOpenedMenuSelect: false,
    positionMenu: 'bottom-right',
    positionMenuSelect: 'default',
    items: [
      { title: 'Parameters du compte', icon: 'send', disabled: true },
      { title: 'Se deconnecter', icon: 'search' }
    ],
    title: 'Select your item',
    menuSelectItems: [
      { title: 'Item name 1 apple', disabled: true },
      { title: 'Item name 2 banana'},
      { title: 'Item name 3 coco'},
      { title: 'Item name 4 pineapple'},
      { title: 'Item name 5 mango'},
      { title: 'Item name 6 grapefruit'}
    ]
  }),
  methods: {
    menuClick() {
      this.dropdownOpenedMenu = false
    },
    addNewItem() {
      this.$emit('addNewItem');
    }
  }
}
</script>

<style lang="less" scoped>
  .ds-demo-menu-btn {
    margin-right: 15px;
  }
</style>
