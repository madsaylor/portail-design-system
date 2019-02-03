<!--
  Basic styled component: background, padding, shadow.

  Usage:

    <Card>Hello, World!</Card>
-->
<template>
  <div class="card"><slot></slot></div>
</template>

<script>
export default {
  name: 'Card',
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
