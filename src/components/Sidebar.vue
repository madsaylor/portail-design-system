<!--
  Side menu with header and footer

  TODO:
    Mobile collaps/toggle
    Badges
    Hidden|disabled items
    Disable entrire sidebar
    Header slot
    Tabselect
    Arrows for elements with subitems
    Hyperlinks support?
    Animations?

  Usage:

    <Sidebar
      :items="[...]"                     - Array of items to render
      :activeKey="(item, index) => ..."  - Value for "is active" check
      :active.sync="active"              - Value for active item
      :activeChild.sync="activeChild"    - Value for active child item
      :opened="sidebarOpened"            - Is it opened (in mobile view)
      @item:click="(...) => ..."         - Click on a sidebar item
    >

    </Sidebar>

  Properties:

    :items - Array<Object>, required. Items to display on the sidebar.
      Each item should have a `title` property with displayed name and an
      `icon` property that can be either a string with an icon name, like
      `'arrow_right'` or a string with svg code `'<svg>...</svg>'`

    :activeKey - Function. Allows you to override value determining
      the active item. Values are compared with `===` operator. By default
      item's index is used

    :active - Any. Value depending on the activeKey property for currently
      active item. Supports .sync modifier

    :activeChild - Any. Same as active, but for child element

  Events:

    @item:click - Click on the sidebar's item. Arguments:
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
            :class="['item', {active: activeKey(item, index) === active}]"
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

          <template v-if="activeKey(item, index) === active">
            <li
              v-for="(child, childIndex) in item.children"
              :key="activeKey(child, childIndex)"
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
  },
  methods: {
    itemClick(item, index, childIndex, event) {
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
    display: flex;
    transition: background-color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

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

    &:hover {
      background-color: @color-gray-100;
      cursor: pointer;
    }

    &:active {
      background-color: @color-gray-200;
      cursor: pointer;
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
  .sidebar-container {
    transition: left 100ms ease-in-out;
  }
  .sidebar-container:not(.opened) {
    left: -@sidebar-width;
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
