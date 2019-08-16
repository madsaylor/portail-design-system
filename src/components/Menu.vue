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
    <slot name="header"></slot>
    <template v-for="(item, index) in items">
      <a
        :class="['ds-item-container', {
          'ds-disabled': item.disabled
        }]"
        :key="index"
        :href="item.href"
        @click="itemClick(item, index)"
      >
        <div v-if="index !== 0" class="ds-divider" />

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
    <div class="ds-menu-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue'

export default {
  name: 'Menu',
  components: {
    Icon
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    width: String,
    height: String
  },
  methods: {
    itemClick(item, index) {
      if (item.disabled) return
      this.$emit('item:click', item, index)
    }
  },
  computed: {
    stylesWrapper() {
      return {
        width: this.width,
        height: this.height
      }
    }
  }
}
</script>

<style lang="less">
@import '../styles/vars';

.ds-menu-wrapper {
  background-color: @color-white;
  box-shadow: @card-shadow;

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

  .ds-menu-footer {
    > * {
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
