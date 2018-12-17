<template>
  <div class="sidebar">
    <div class="header">
      header
    </div>

    <div
      :class="['item', {active: item.active}]"
      v-for="item in items"
    >
      <div
        alt="example"
        class="icon"
        v-html="item.icon"
      />
      <span class="title">
        {{ item.title }}
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'sidebar',
  props: {
    items: {
      type: Array,
      default: () => [{
        icon: require('!svg-inline-loader!../icons/assignment_outline.svg'),
        title: 'Lorem Ipsum',
        active: true,
        badge: 2,
      }, {
        icon: require('!svg-inline-loader!../icons/receipt_outline.svg'),
        title: 'Dolor Sit Amet',
      }, {
        icon: require('!svg-inline-loader!../icons/group_outline.svg'),
        title: 'Consectetur',
        children: [{
          title: 'Sed do eiusmod',
        }, {
          title: 'Tempor incididunt',
        }],
      }, {
        icon: require('!svg-inline-loader!../icons/work_outline.svg'),
        title: 'Adipiscing Elit',
      }],
    }
  },
}
</script>

<style lang="less">
@import '../styles/vars';

.sidebar {
  background-color: @color-white;
  box-shadow: @sidebar-shadow;
  box-sizing: border-box;
  height: 100%;
  left: 0;
  width:  @sidebar-width;
  min-height: 100%;
  position: fixed;
  top: 0;

  .header, .item {
    box-sizing: border-box;
    box-shadow: @sidebar-item-shadow;
    height: @sidebar-item-height;
  }

  .header {
    margin-bottom: 16px;
  }

  .item {
    padding: @sidebar-item-padding;

    .font-desktop-body-medium-dark();
    &.active {
      .font-desktop-body-medium-primary();
      svg {
        fill: @color-brand;
      }
    }

    .icon {
      display: inline-block;
      height: 24px;

      margin-right: 12px;
      margin-top: 4px;
      margin-bottom: 4px;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
}

@media @hide-sidebar {
  .sidebar {
    display: none;
  }
}
</style>
