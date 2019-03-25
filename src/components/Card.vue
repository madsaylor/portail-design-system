<!--
  Basic styled component: background, padding, shadow.

  Also includes styling for some special case cards. See CardDemo.vue

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

  // Dashboard report card
  &.dashboard-report {
    .report-title {
      .font-desktop-body-regular-dark();
    }
    .report-amount {
      margin-top: 12px;
      font-family: @font-family;
      font-size: 24px;
      line-height: 24px;

      &.green {
        color: @color-primary;
        svg {
          fill: @color-primary;
        }
      }
      &.yellow {
        color: @color-yellow;
        svg {
          fill: @color-yellow;
        }
      }
      &.red {
        color: @color-red;
        svg {
          fill: @color-red;
        }
      }
    }
    .report-subtitle {
      .font-desktop-small-regular-gray();
      margin-top: 20px;
    }
  }

  // User TODO card
  &.user-todo {
    display: flex;

    .icon {
      margin-right: 18px;
    }
    .todo-title {
      .font-desktop-small-regular-dark();
      padding: 2px 0;
      flex: 1 0 auto;
    }
    .todo-badge {
      box-sizing: border-box;
      color: @color-white;
      font-family: @font-family;
      font-size: 13px;
      line-height: 16px;
      text-align: center;
      height: 24px;
      padding: 5px 6px 3px;
      border-radius: 12px;
      background-color: #4A7A91;
    }
  }
}
</style>
