<!--
  Badge with an optional icon

  Usage:

    <Badge
      :color="red"           - Badge background color
      :icon="error_outline"  - Badge optional icon
      :icon-size="20px">     - Badge icon size
    </Badge>
-->

<template>
  <div class="ds-badge" :class="color">
    <Icon v-if="icon" class="icon" :source="icon" color="white" :size="iconSize"/>
    <slot></slot>
  </div>
</template>

<script>
    import Icon from './Icon.vue'

    export default {
        name: 'Badge',
        components: {Icon},
        props: {
          icon: String,
          iconSize: String,
          color: String
        }
    }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .ds-badge {
    display: inline-flex;
    align-items: center;
    width: auto;
    border-radius: @badge-br;
    color: @color-white;
    padding: @badge-padding;
    cursor: default;

    .icon {
      margin-right: @badge-icon-margin;
    }
  }

  .red {
    background-color: @color-red;
  }
  .gray {
    background-color: @color-gray-400;
  }
  .dark {
    background-color: @color-dark;
  }
  .primary {
    background-color: @color-primary;
  }
  .yellow {
    background-color: @color-yellow;
  }
</style>
