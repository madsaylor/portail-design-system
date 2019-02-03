<!--
  SVG Icon of a specified size (square)

  Usage:

    <Icon
      source="account_circle"  - Icon name or <svg>...</svg> code
      size="16px"              - Icon size
      padding="4px 2px"        - Outher element padding
      color="brand"            - Color name or CSS value
    />

    Instead of using the source property for the icon name, it can be passed
    as an attribute on its own:

    <icon account_circle /> is equal to <icon source="account_circle" />

  Properties:

    source - String, required. Icon name for icons from src/icons folder
      or an `<svg>...</svg>` code

    size - String. Must be valid css value. Size for the inner svg element

    padding - String. Must be valid css value. Padding around the svg

    color - String. Color variable name or a CSS value

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
      fill: COLORS[color] || color
    }"
  ></span>
</template>

<script>
import icons from '../icons'
import {COLORS} from '../styles/vars'

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
    color: {
      type: String,
      default: 'black'
    },
  },
  data: () => ({
    icons,
    COLORS,
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
@import '../styles/vars';

.icon {
  display: inline-block;
  vertical-align: bottom;

  svg {
    height: inherit;
    width: inherit;
    vertical-align: top;
    user-drag: none;
    user-select: none;
  }
}
</style>
