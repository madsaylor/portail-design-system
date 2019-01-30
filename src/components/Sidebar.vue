<!--
  TODO: badges

  Usage:

  <sidebar
    :items="[...]"                     - Array of items to render
    :activeKey="(item, index) => ..."  - Value for "is active" check
    :active.sync="active"              - Value for active item
    :activeChild.sync="activeChild"    - Value for active child item
    @item:click="(item, index) => ..." - Click event
  ></sidebar>

  Properties:

    :items - Array<Object>, required. Items to display on the sidebar.
      Each item should have a `title` property with displayed name and an
      .icon property that can be either a string with an icon name, like `'arrow_right'` or a string with svg code `'<svg>...</svg>'`

    :activeKey - Function. Allows you to override value determining
      the active item. Values are compared with `===` operator. By default
      item's index is used

    :active - Any. Value depending on the activeKey property for currently
      active item. Supports .sync modifier

    :activeChild - Any. Same as active, but for child element

  Events:

    @item:click - Function. Click on the sidebar's item
 -->

<template>
  <div class="sidebar-conainer">
    <div class="sidebar">
      <div class="header">
        <slot name="header">Sidebar header</slot>
      </div>

      <ul class="items">
        <template v-for="(item, index) in items">
          <li
            :class="['item', {active: activeKey(item, index) === active}]"
            @click="itemClick(item, index)"
          >
            <div class="icon" v-html="icons[item.icon] || item.icon"></div>
            <div class="title">{{ item.title }}</div>
          </li>

          <li
            v-if="activeKey(item, index) === active"
            v-for="(child, childIndex) in item.children"
            :class="[
              'item',
              'child-item',
              {active: activeKey(child, childIndex) === activeChild}
            ]"
            @click="itemClick(child, index, childIndex)"
          >
            {{ child.title }}
          </li>
        </template>
      </ul>

      <div class="footer"><slot name="footer"></slot></div>
    </div>
  </div>
</template>

<script>
import icons from '../icons'

export default {
  name: 'sidebar',
  props: {
    items: {
      type: Array,
      required: true,
    },
    activeKey: {
      type: Function,
      default: (item, index) => index,
    },
    active: {
      default: 0,
    },
    activeChild: {
      default: 0,
    },
  },
  data: () => ({
    icons,
  }),
  methods: {
    itemClick: function (item, index, childIndex) {
      if (childIndex != null) {
        this.$emit('update:activeChild', this.activeKey(item, childIndex))
      } else {
        this.$emit('update:active', this.activeKey(item, index))
      }
      this.$emit('item:click', item, index, childIndex)
    }
  }
}
</script>

<style lang="less">
@import '../styles/vars';

.sidebar-conainer {
  bottom: 0;
  box-shadow: @sidebar-shadow;
  box-sizing: border-box;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width:  @sidebar-width;
}

.sidebar {
  background-color: @color-white;
  height: 100%;
  overflow-y: scroll;
  width:  @sidebar-width + 20px; // hide scrollbar
  display: flex;
  flex-direction: column;


  .header, .item {
    box-shadow: @sidebar-item-shadow;
    box-sizing: border-box;
    height: @sidebar-item-height;
    padding: @sidebar-item-padding;
    flex: 0 0 auto;
  }

  .header, .items {
    margin-bottom: 16px;
  }

  ul, li {
    margin:0;
    padding: 0;
    text-indent: 0;
    list-style-type: 0;
  }

  .item {
    .font-desktop-body-regular-dark();
    align-items: center;
    display: flex;
    transition: background-color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

    &.child-item {
      .font-desktop-body-medium-gray();
      padding-left: 50px
    }

    &.active {
      .font-desktop-body-regular-accent();
      .icon svg {
        fill: @color-brand;
      }
    }

    &:hover {
      background-color: @color-gray-100;
      cursor: pointer;
    }

    &:active {
      background-color: @color-gray-200;
      cursor: pointer;
    }

    .icon {
      height: 24px;
      width: 16px;

      svg {
        fill: @color-gray-400;
        height: 18.5px;
        margin: 3px 0 2px -1.5px;
        width: 18.5px;
      }
    }

    .title {
      padding-left: 12px;
    }
  }

  .footer:not(:empty) {
    box-sizing: border-box;
    margin-top: auto;
    padding: @sidebar-item-padding;
    box-shadow: inset 0 1px 0 0 #F1F1F1;
  }
}

@media @hide-sidebar {
  .sidebar-conainer {
    display: none;
  }
}
</style>
