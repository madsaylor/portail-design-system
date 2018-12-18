<template>
  <div class="grid">
    <div class="row-col"><h2>Icons</h2></div>
    <div class="row">
      <div class="col-12">
      </div>
      <div class="col-6" v-for="icon in icons">
        <div class="card icon-demo" >
          <div class="icon" v-html="context(icon)"></div>
          icons/{{ icon.slice(2) }}
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

let context = require.context('@/icons', true, /\.svg$/)
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

  .icon {
    display: inline-block;
    vertical-align: bottom;
    height: 24px;
    width: 24px;
    padding-right: 24px;
  }
}

</style>
