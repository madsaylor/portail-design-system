<template>
  <span class="ds-radio-component">
    <span class="ds-radio-wrapper" v-for="radio in list">
      <label class="ds-radio-body">
        <span :class="['ds-radio-container', {'ds-radio-container-inactive': !radio.value,
                       'ds-radio-container-active': radio.value}]">
        </span>

        <span :class="[{'ds-radio-circle': radio.value}]"></span>

        <span :class="['ds-radio-text', {'ds-radio-text-active': radio.value,
                       'ds-radio-text-inactive': !radio.value}]">
          {{radio.title}}
        </span>

        <input type="checkbox"
               v-model="radio.value"
               class="ds-radio-input"/>
      </label>
    </span>
  </span>
</template>

<script>
  export default {
    name: 'Radio',
    props: {
      value: null,
      list: Array
    },
    computed: {}
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .ds-radio-component {

    .ds-radio-wrapper {

      .ds-radio-body {
        display: inline-flex;
        align-items: center;
        position: relative;

        .ds-radio-container {
          height: 20px;
          width: 20px;
          border-radius: 10px;

          &.ds-radio-container-inactive {
            background-color: @color-gray-300;
          }

          &.ds-radio-container-active {
            background-color: @color-gray-400;
          }
        }

        .ds-radio-circle {
          display: inline-block;
          position: absolute;
          height: 8px;
          width: 8px;
          border-radius: 10px;
          background-color: @color-white;
          left: 6px;
        }

        .ds-radio-text {
          height: 16px;
          font-family: "Roboto Light";
          font-size: 14px;
          line-height: 16px;

          .ds-radio-text-active {
            color: @color-gray-500;
          }

          .ds-radio-text-inactive {
            color: @color-dark;
          }
        }

        .ds-radio-input {
          display: none;
        }
      }
    }
  }
</style>
