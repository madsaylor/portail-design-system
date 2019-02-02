<!--
  Basic styled component: background, padding, shadow.

  Usage:

    <card>Hello world!</card>
-->
<template>
  <div class="card"><slot></slot></div>
</template>

<script>
export default {
  name: 'card',
}
</script>

<style lang="less">
@import '~@/styles/vars';

.card {
  border-radius: @card-br;
  background-color: @color-white;
  box-shadow: @card-shadow;
  padding: @card-padding;
}
</style>
