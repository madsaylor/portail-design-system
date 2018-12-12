<template>
  <div class="grid">
    <div class="row-col">
      <h2>Icons</h2>
      <div class="card icon-demo" v-for="icon in icons">
        <img :src="context(icon)">
        icons/{{ icon.slice(2) }}
        <br>
      </div>
    </div>
  </div>
</template>

<script>

let context = require.context('../icons', true, /\.svg$/)
let icons = context.keys()

export default {
  name: 'icons-demo',
  data: () => ({
    icons: icons,
    context: context,
  })
}
</script>

<style lang="less">
@import '~@/styles/vars';

.icon-demo {
  margin-bottom: @vu * 2;
  height: @vu * 6;
  img {
    margin-right: @vu;
  }
}

</style>
