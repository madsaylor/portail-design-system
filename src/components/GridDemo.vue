<template>
    <div class="grid grid-demo">
        <div class="row" v-for="size in [12, 6, 4, 3, 2, 1]">
            <div
                :class="'col-' + size"
                v-for="i in Array(12).slice(0, 12/size)"
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
html, body, .container.main {
  margin: 0 auto;
  padding: 0;
  height: 100vh;
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

@import '../styles/grid.less';
.card {
    background: white;
    padding: @vu * 2;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
</style>
