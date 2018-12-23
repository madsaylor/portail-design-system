<template>
  <div class="sidebar">
    <div class="header">
      Sidebar header
    </div>

    <div
      :class="['item', {active: item.active}]"
      v-for="item in items"
    >
      <div class="icon" v-html="icons[item.icon] || item.icon"></div>
      <div class="title">{{ item.title }}</div>
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
        active: true,
        badge: 2,
      }, {
        icon: 'receipt_outline',
        title: 'Lorem Ipsum',
        children: [{
          title: 'Lorem Ipsum',
        }, {
          title: 'Lorem Ipsum',
        }],
      }, {
        icon: 'group_outline',
        title: 'Lorem Ipsum',
      }, {
        icon: 'work_outline',
        title: 'Lorem Ipsum',
      }, {
        icon: 'assessment_outline',
        title: 'Lorem Ipsum',
      }, {
        icon: 'new_releases_outline',
        title: 'Lorem Ipsum',
      }, {
        icon: 'help_outline',
        title: 'Lorem Ipsum',
      }],
    }
  },
  data: () => ({
    icons,
  })
}
</script>

<style lang="less">
@import '../styles/vars';

.sidebar {
  background-color: @color-white;
  box-shadow: @sidebar-shadow;
  box-sizing: border-box;
  left: 0;
  min-height: 100%;
  position: fixed;
  top: 0;
  width:  @sidebar-width;

  .header, .item {
    box-shadow: @sidebar-item-shadow;
    box-sizing: border-box;
    height: @sidebar-item-height;
    padding: @sidebar-item-padding;
  }

  .header {
    margin-bottom: 16px;
  }

  .item {
    .font-desktop-body-regular-dark();
    align-items: center;
    display: flex;

    &.active {
      .font-desktop-body-regular-accent();
      .icon svg {
        fill: @color-brand;
      }
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
}

@media @hide-sidebar {
  .sidebar {
    display: none;
  }
}
</style>
