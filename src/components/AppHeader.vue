<template>
  <div class="app-header">
    <div class="left-slot">
      <slot name="left"></slot>
    </div>

    <div class="title">
      <slot></slot>
    </div>

    <div class="right-slot">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-header',
}
</script>

<style lang="less">
@import '../styles/vars';

.app-header {
  background-color: @color-white;
  height: @app-header-height;
  box-shadow: inset 0 -1px 0 0 #E6E7EB;
  display: flex;

  .title {
    flex: 1 0 auto;
    .font-desktop-h-3-dark();
    padding: @app-header-title-padding;
  }

  @media @screen-small {
    height: @app-header-height-small;

    .title {
      .font-desktop-body-medium-dark();
      padding: @app-header-title-padding-small;
    }
  }
}
</style>
