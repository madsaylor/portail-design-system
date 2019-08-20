let usage = `
<Menu
  :items="items"
  @item:click="menuClick"
/>

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
`.slice(1)

export default {
  usage
}
