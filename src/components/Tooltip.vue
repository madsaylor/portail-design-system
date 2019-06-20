<!--
  Styled tooltip component

  Usage:

  <Tooltip :dynamicWidth="dynamicWidth"           - Set up dynamic width of tooltip
           :triangleDistance="triangleDistance"   - Distance betweeen the top of the component and triangle
           :triangleDirection="triangleDirection" - This field will be added in the future. Please don't use
                                                    this field right now
           :visible="visible">                    - Responsible for visibility tooltip

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
    scelerisque sit amet velit vitae tristique. Nullam congue in lorem in
    aliquam. Sed euismod nisl a ex commodo, non aliquet lacus mattis.
  </Tooltip>
-->

<template>
  <Popper
    trigger="click"
    :options="{
      placement: placement,
      modifiers: { offset: offset }
    }">
    <div class="popper" :style="{width: popoverWidth}">
      <slot name="popover"></slot>
    </div>
 
    <div class="reference" slot="reference">
      <slot name="reference"></slot>
    </div>
  </Popper>
</template>

<script>

import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

export default {
  name: "Tooltip",
  props: {
    placement: {
      type: String,
      default: 'top'
    },
    offset: {
      type: Object,
      default: () => {return {offset: '0, 10px'}}
    },
    popoverWidth: String
  },
  components: {
    Popper
  }
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

.reference {
  display: inline-block;
}

.popper {
  background-color: @color-white;
  border-radius: 2px;
  color: @color-dark;
  border: solid 1px @color-primary;
  font-family: @font-family;
  font-size: 14px;
  line-height: 18px;
  padding: 8px;
  width: 270px;
  position: relative;
  text-align: left;
}
</style>
