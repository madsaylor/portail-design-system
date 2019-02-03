<!--
  SVG Icon of a specified size (square)

  Usage:

    <Icon
      source="account_circle"  - Icon name or <svg>...</svg> code
      size="16px"              - Icon size
      padding="4px 2px"        - Outher element padding
    />

    Instead of using the source property for the icon name, it can be passed
    as an attribute on its own:

    <icon account_circle /> is equal to <icon source="account_circle" />

  Properties:

    source - String, required. Icon name for icons from src/icons folder
      or an `<svg>...</svg>` code

    size - String. Must be valid css value. Size for the inner svg element

    padding - String. Must be valid css value. Padding around the svg

  Events:

    ...
-->

<template>
  <span
    class="icon"
    v-html="code"
    :style="{
      height: size,
      width: size,
      padding: padding,
    }"
  ></span>
</template>

<script>
import icons from '../icons'

export default {
  name: 'Icon',
  props: {
    source: {
      type: String,
    },
    size: {
      type: String,
      default: '24px'
    },
    padding: {
      type: String,
      default: '0'
    },
  },
  data: () => ({
    icons,
  }),
  computed: {
    code() {
      if (this.source) {
        return icons[this.source] || this.source
      }
      for (let key in this.$attrs) {
        if (key in icons) {
          return icons[key]
        }
      }
      throw 'Icon code is missing'
    }
  },
}
</script>

<style lang="less">
.icon {
  display: inline-block;
  vertical-align: bottom;

  svg {
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;

    vertical-align: top;
    width: inherit;
    height: inherit;
  }
}
</style>
