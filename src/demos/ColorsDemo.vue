<template>
  <div class="grid">
    <div class="row-col">
      <h2>Colors</h2>
      <h3>Usage</h3>
      <pre v-highlightjs="usageLess"><code class="less"></code></pre>
    </div>
    <div class="row-col" v-for="(group, groupName) in colors">
      <h3 class="group-name">{{ groupName }}</h3>
      <div
        v-for="colorName in group"
        :class="['card', 'color-demo', colorName]"
      >@{{ colorName }}</div>
    </div>
  </div>
</template>

<script>
let usageLess = `
@import '~@betao/ds/vars';

.some-class {
  color: @color-gray-100;
}
`.slice(1)

export default {
  name: 'colors-demo',
  data: () => ({
    usageLess,
    colors: {
      grays: [
        'color-gray-100',
        'color-gray-200',
        'color-gray-300',
        'color-gray-400',
        'color-gray-500',
      ],
      primary: [
        'color-black',
        'color-brand',
        'color-white',
      ],
      system: [
        'color-blue-green',
        'color-red',
        'color-yellow',
      ],
    }
  })
}
</script>

<style lang="less">
@import "~@/styles/vars";

.group-name {
  text-transform: capitalize;
}

.color-demo {
  display: inline-block;
  &.color-gray-100 {background: @color-gray-100; color: @color-black;}
  &.color-gray-200 {background: @color-gray-200; color: @color-black;}
  &.color-gray-300 {background: @color-gray-300; color: @color-black;}
  &.color-gray-400 {background: @color-gray-400; color: @color-black;}
  &.color-gray-500 {background: @color-gray-500; color: @color-white;}
  &.color-black {background: @color-black; color: @color-white;}
  &.color-brand {background: @color-brand; color: @color-white;}
  &.color-white {background: @color-white; color: @color-black;}
  &.color-blue-green {background: @color-blue-green; color: @color-white;}
  &.color-red {background: @color-red; color: @color-white;}
  &.color-yellow {background: @color-yellow; color: @color-white;}
}
</style>
