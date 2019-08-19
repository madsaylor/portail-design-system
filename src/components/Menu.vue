<!--
  Menu

  Usage:

    <Menu
      :items="[...]"                      - Array of items to render
      @item:click="(...) => ..."          - Click on a menu item
    />

  Properties:

    items - Array<Object>, required. Items to display on the Menu. Where
      objects look like:

        :items="[{
          title: String,           - Displayed name
          icon: ?String,           - Icon name or svg code (See Icon.vue)
          disabled: ?Boolean,      - Is the item disabled
          href: ?String            - Optional hyperlink
        }, {
          ...
        }]

  Events:

    item:click - Click on the menu's item. Arguments:
      item       - Object from items array
      index      - index of the object in the items array
-->

<template>
  <div class="ds-menu-wrapper" :style="stylesWrapper">
    <div class="ds-header-content" v-if="title">
      <span class="ds-header-title">{{title}}</span>
      <Button class="ds-header-icon" icon="close" plain @click="closeMenu()" icon-color="gray-400"></Button>
    </div>
    <div class="ds-search-wrapper" v-if="searchMode">
      <Input
        md
        icon="search"
        icon-size="24px !important"
        icon-padding="0 0 2px 0"
        placeholder="Search"
        v-model="searchValue"
      />
    </div>
    <div :class="['ds-item-wrapper', {'ds-item-wrapper-menu-select': menuSelectMode && !searchMode, 'ds-item-wrapper-menu-search': menuSelectMode && searchMode}]">
      <template  v-for="(item, index) in menuItem">
        <a
          :class="['ds-item-container', {
        'ds-disabled': item.disabled
      }]"
          :key="index"
          :href="item.href"
          @click="itemClick(item, index)"
        >
          <div v-if="index !== 0" class="ds-divider"/>

          <div class="ds-item">
            <Icon
              v-if="item.icon"
              :source="item.icon"
              size="24px"
              color="gray-400"
            />
            <span class="ds-title">{{ item.title }}</span>
          </div>
        </a>
      </template>
    </div>
    <div class="ds-menu-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue'
import Input from './Input.vue'
import Button from './Button.vue'

export default {
  name: 'Menu',
  components: {
    Icon, Button, Input
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    width: String,
    height: String,
    title: String,
    opened: Boolean,
    menuSelectMode: Boolean,
    searchMode: Boolean
  },
  data: () => ({
    searchValue: undefined,
    searchResult: undefined,
    searchId: undefined
  }),
  methods: {
    itemClick(item, index) {
      if (item.disabled) return
      this.$emit('item:click', item, index)
      this.closeMenu()
    },
    closeMenu() {
      this.$emit('update:opened', false)
    },
    searchItems() {
      let res = this.items.filter((item) => ~item.title.indexOf(this.searchValue))
      res = res.slice(0, 5)

      this.searchResult = res
      this.searchId = undefined
    }
  },
  computed: {
    stylesWrapper() {
      return {
        width: this.width,
        height: this.height
      }
    },
    menuItem() {
      return !this.searchMode ? this.items : this.searchResult
    }
  },
  watch: {
    searchValue() {
      if (!this.searchId) {
        this.searchId = setTimeout(() => this.searchItems(), 300)
      }
    }
  },
  mounted() {
    this.searchResult = this.items.slice(0, 4)
  }
}
</script>

<style lang="less">
@import '../styles/vars';

.ds-menu-wrapper {
  background-color: @color-white;
  box-shadow: @card-shadow;
  overflow: hidden;

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
      cursor: pointer;
    }

    .ds-header-icon {
      margin-top: 6px;

      &:active {
        background: none;
      }
    }
  }
  .ds-search-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }

  .ds-item-wrapper {

    &.ds-item-wrapper-menu-select {
      overflow-y: auto;
      height: calc(100% - 104px);
    }

    &.ds-item-wrapper-menu-search {
      height: calc(100% - 154px);

      > .ds-item-container {
        &:first-child {
          box-shadow: inset 0 1px 0 0 @color-gray-300;
        }
      }
    }

    .ds-item-container {
      display: block;
      text-decoration: none;
      color: @color-dark;
      font-size: @font-desktop-body-medium-dark-font-size;

      &:hover {
        text-decoration: none;
      }

      &.ds-disabled {
        color: @color-gray-400;
      }

      .ds-divider {
        height: @app-menu-divider-height;
        width: 100%;
        background: @color-gray-300;
      }

      .ds-item {
        display: flex;
        align-items: center;
        padding: @app-menu-padding;
        cursor: pointer;

        &:hover {
          background-color: @color-gray-200;
        }

        .ds-title {
          margin-left: @app-menu-spacing;
        }
      }
    }
  }

  .ds-menu-footer {
    > * {
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 48px;
      width: 100%;
      background-color: #f2f4f7;
      box-shadow: inset 0 1px 0 0 @color-gray-300;
    }
  }
}
</style>
