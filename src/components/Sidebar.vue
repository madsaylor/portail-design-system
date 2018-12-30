<!--
  <sidebar
    :items="[...]"  - Array of items to render
    @item:click="(item, index) => ..."

  ></sidebar>

  Items format:

  ...

 -->

<template>
  <div class="sidebar-conainer">
    <div class="sidebar">
      <div class="header">
        <slot name="header">Sidebar header</slot>
      </div>

      <ul class="items">
        <li
          :class="['item', {active: item.active}]"
          v-for="(item, index) in items"
          @click="$emit('item:click', item, index)"
        >
          <div class="icon" v-html="icons[item.icon] || item.icon"></div>
          <div class="title">{{ item.title }}</div>
        </li>
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
      default: () => [{
        icon: 'assignment_outline',
        title: 'Lorem Ipsum',
        value: 'lorem/ipsum1',
        active: true,
        badge: 2,
      }, {
        icon: 'receipt_outline',
        title: 'Lorem Ipsum',
        value: 'lorem/ipsum2',
        children: [{
          title: 'Lorem Ipsum',
          value: 'lorem/ipsum3',
        }, {
          title: 'Lorem Ipsum',
          value: 'lorem/ipsum4',
        }],
      }, {
        icon: 'group_outline',
        title: 'Lorem Ipsum',
        value: 'lorem/ipsum5',
      }, {
        icon: 'work_outline',
        title: 'Lorem Ipsum',
        value: 'lorem/ipsum6',
      }, {
        icon: 'assessment_outline',
        title: 'Lorem Ipsum',
        value: 'lorem/ipsum7',
      }, {
        icon: 'new_releases_outline',
        title: 'Lorem Ipsum',
        value: 'lorem/ipsum8',
      }, {
        icon: 'help_outline',
        title: 'Lorem Ipsum',
        value: 'lorem/ipsum9',
      }],
    },

  },
  data: () => ({
    icons,
  })
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
