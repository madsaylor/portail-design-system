<template>
  <div class="grid grid-demo">
    <div class="row-col">
      <h2>Grid</h2>
    </div>
    <div class="row" v-for="size in [12, 6, 4, 3, 2, 1]">
      <div
        :class="'col-' + size"
        v-for="n in 12/size"
      >
        <div class="card">
          col-{{size}} Lorem ipsum dolor sit amet
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'grid-demo',
  data: () => ({

  }),
}
</script>

<style lang="less">
/* "Reset" */
html, body {
  margin: 0;
  padding: 0;
  min-height: 100%;
}
/* Layout debug */
.grid-demo .row, .grid-demo .row > div {
  &:nth-child(odd) {
    background: rgba(0, 0, 0, 0.1);
  }
  &:nth-child(even) {
    background: rgba(0, 0, 0, 0.05);
  }
}
</style>
