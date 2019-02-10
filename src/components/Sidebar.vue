<!--
  Side menu with header and footer

  TODO:
    Badges
    Tabselect
    Arrows for elements with subitems
    Hyperlinks support?

  Usage:

    <Sidebar
      :items="[...]"                     - Array of items to render
      :activeKey="(item, index) => ..."  - Value for "is active" check
      :active.sync="active"              - Value for active item
      :activeChild.sync="activeChild"    - Value for active child item
      :opened="sidebarOpened"            - Is it opened (in mobile view)
      :disabled="bool"                   - Disable the entire sidebar
      @item:click="(...) => ..."         - Click on a sidebar item
    >

    </Sidebar>

  Properties:

    items - Array<Object>, required. Items to display on the sidebar. Where
      objects look like:

        :items="[{
          title: String,           - Displayed name
          icon: ?String,           - Icon name or svg code (See Icon.vue)
          children: ?Array<Item>,  - Submenu items
          disabled: ?Boolean       - Is the item disabled
        }, {
          ...
        }}

    activeKey - Function. Allows you to override value determining
      the active item. Values are compared with `===` operator. By default
      item's index is used

    active - Any. Index (can be changed with activeKey property) for the
      currently active item. Supports .sync modifier

    activeChild - Any. Same as active, but for child element

    opened - Boolean. Is sidebar shown in the mobile view. Supports .sync
      modifier that let's the component close itself (when user clicks outside)

    disabled - Boolean. Disables the entire component

  Events:

    item:click - Click on the sidebar's item. Arguments:
      item       - Object from items array
      index      - index of the object in the items array
      childIndex - index of the child in the item.children array or null
      event      - click event
-->

<template>
  <div :class="['sidebar-container', {opened}]">
    <div class="sidebar">
      <div class="header">
        <slot name="header">Sidebar header</slot>
      </div>

      <ul class="items">
        <template v-for="(item, index) in items">
          <li
            :class="['item', {
              active: activeKey(item, index) === active,
              disabled: disabled || item.disabled
            }]"
            :key="activeKey(item, index)"
            @click="itemClick(item, index, null, $event)"
          >
            <Icon
              v-if="item.icon"
              :source="item.icon"
              size="18px"
              padding="6px 0"
              color="gray-400"
            />
            <div class="title">{{ item.title }}</div>
          </li>
          <section :class="[
            'children',
            {opened: activeKey(item, index) === active},
          ]">
            <li
              v-for="(child, childIndex) in item.children"
              :key="activeKey(child, childIndex)"
              :class="['item', 'child-item', {
                active: activeKey(child, childIndex) === activeChild,
                disabled: disabled || child.disabled
              }]"
              @click="itemClick(child, index, childIndex)"
            >
              {{ child.title }}
            </li>
          </section>
        </template>
      </ul>

      <div class="footer"><slot name="footer"></slot></div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue'

export default {
  name: 'Sidebar',
  components: {
    Icon,
  },
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
    opened: Boolean,
    disabled: Boolean,
  },
  methods: {
    itemClick(item, index, childIndex, event) {
      if (this.disabled || item.disabled) {
        return
      }
      this.$emit('update:active', this.activeKey(item, index))
      this.$emit(
        'update:activeChild',
        childIndex || this.activeKey(item, childIndex)
      )
      this.$emit('item:click', item, index, childIndex, event)
    },
    outsideClick(event) {
      // Close sidebar on an outside click
      let el = event.target
      while (el.parentNode) {
        if (el === this.$el) {
          return
        }
        el = el.parentNode
      }
      this.$emit('update:opened', false)
    },
  },
  mounted() {
    document.addEventListener('click', this.outsideClick, true)
    this.$el.parentNode.classList.add('sidebar-padding')
  },
  beforeDestroy() {
    document.removeEventListener('click', this.outsideClick, true)
  },
}
</script>

<style lang="less">
@import '../styles/vars';

.sidebar-container {
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
    cursor: pointer;
    display: flex;
    transition: background-color .1s ease-in-out;

    &.child-item {
      .font-desktop-body-regular-gray();
      padding-left: 50px;
    }

    &.active {
      .font-desktop-body-regular-accent();
      .icon svg {
        fill: @color-primary;
      }
    }

    &.disabled {
      background: @color-gray-100;
      color: @color-gray-400;
      cursor: initial;
      .icon svg {
        fill: @color-gray-400;
      }
      &:hover {
        background: @color-gray-100;
      }
    }

    &:hover, &:focus  {
      background: darken(@color-white, 5%);
    }

    &:active {
      background: darken(@color-white, 10%);
    }


    .title {
      padding-left: 12px;
    }
  }

  .children {
    transition: max-height .1s ease;
    max-height: 1000px;
    overflow: hidden;
    &:not(.opened) {
      max-height: 0;
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
  .sidebar-container {
    transition: left .1s ease;
    &:not(.opened) {
      left: -@sidebar-width;
    }
  }
}

@media @show-sidebar {
  .sidebar-padding {
    padding-left: @sidebar-width;
  }
  #open-sidebar-button {
    display: none;
  }
}
</style>
