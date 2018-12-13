<template>
  <div class="sidebar">
    <div class="header">
      header
    </div>

    <div
      :class="['item', {active: item.active}]"
      v-for="item in items"
    >
      <i :style="{backgroundImage: `url('${ item.icon }')`}"></i>
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
        icon: require('@/icons/sidebar/outline-assignment-24px.svg'),
        title: 'Lorem Ipsum',
        active: true,
        badge: 2,
      }, {
        icon: require('@/icons/sidebar/outline-receipt-24px.svg'),
        title: 'Dolor Sit Amet',
      }, {
        icon: require('@/icons/sidebar/outline-group-24px.svg'),
        title: 'Consectetur',
        children: [{
          title: 'Sed do eiusmod',
        }, {
          title: 'Tempor incididunt',
        }],
      }, {
        icon: require('@/icons/sidebar/outline-work_outline-24px.svg'),
        title: 'Adipiscing Elit',
      }],
    }
  },
}
</script>

<style lang="less">
@import '~@/styles/vars';

.sidebar {
  background-color: @color-white;
  box-shadow: @sidebar-shadow;
  box-sizing: border-box;
  height: 100%;
  max-width:  @sidebar-width;
  min-height: 100%;
  min-width:  @sidebar-width;
  position: fixed;

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
      .font-desktop-body-medium-primary()
    }

    i {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 12px;
      margin-top: 4px;
      margin-bottom: 4px;
    }
  }
}

@media @hide-sidebar {
  .sidebar {
    display: none;
  }
}
</style>
