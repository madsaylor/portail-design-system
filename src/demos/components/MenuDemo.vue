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

    <Dropdown
      :target="$refs.menuSelect"
      :opened.sync="dropdownOpenedMenuSelect"
      :position="positionMenuSelect"
    >
      <Menu
        :items="items"
        @item:click="menuClick"
        width="320px"
        height="380px"
      >
        <template #header>
          <div class="ds-header-content">
            <span class="ds-header-title">Select your item</span>
            <Icon class="ds-header-icon" close color="gray-400"></Icon>
          </div>
        </template>
        <template #footer>
          <div class="ds-footer-content">
            <Icon class="ds-footer-icon" add color="primary"></Icon>
            <span class="ds-footer-text">Add new product / service</span>
          </div>
        </template>
      </Menu>
    </Dropdown>
  </div>
</template>

<script>
import Button from '../../components/Button.vue'
import Dropdown from '../../components/Dropdown.vue'
import Menu from '../../components/Menu.vue'
import Icon from '../../components/Icon.vue'
import Description from '../../descriptions/Description'
import Collapser from '../../components/Collapser.vue'
import {MenuData} from '../../static/index'

export default {
  name: 'MenuDemo',
  components: { Button, Dropdown, Menu, Description, Collapser, Icon},
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
    menuSelectItems: [

    ]
  }),
  methods: {
    menuClick() {
      this.dropdownOpenedMenu = false
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../styles/vars';

  .ds-header-content {
    display: flex;
    justify-content: space-between;
    height: 56px;
    background-color: #f2f4f7;
    box-shadow: inset 0 -1px 0 0 @color-gray-300;

    .ds-header-title {
      height: 24px;
      color: @color-dark;
      font-family: Asap;
      font-size: 18px;
      line-height: 24px;
      margin: 16px 0 16px 16px;
    }

    .ds-header-icon {
      margin: 16px 16px 16px 0;
    }
  }

  .ds-footer-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 100%;
    background-color: #f2f4f7;
    box-shadow: inset 0 1px 0 0 @color-gray-300;

    .ds-footer-icon {
      margin-right: 5px;
    }

    .ds-footer-text {
      font-size: 18px;
      color: @color-primary;
    }
  }

  .ds-demo-menu-btn {
    margin-right: 15px;
  }
</style>
