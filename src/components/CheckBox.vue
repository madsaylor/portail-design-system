<template>
  <span class="ds-checkbox-component-wrapper">
    <label class="ds-checkbox-wrapper">
      <span :class="['ds-checkbox-container', {'ds-checkbox-container-inactive': !checkboxValue,
                     'ds-checkbox-container-active': checkboxValue}]">
      </span>

      <Icon check_box size="12px"
            :class="['ds-checkbox-icon', {'ds-checkbox-icon-inactive': !checkboxValue}]">
      </Icon>

      <span :class="['ds-checkbox-text', {'ds-checkbox-text-active': checkboxValue,
                     'ds-checkbox-text-inactive': !checkboxValue}]">
        {{label}}
      </span>

      <input type="checkbox"
             v-model="checkboxValue"
             class="ds-checkbox-input"/>
    </label>
  </span>
</template>

<script>
  import Icon from './Icon'

  export default {
    name: 'CheckBox',
    components: {Icon},
    props: {
      value: Boolean,
      label: String
    },
    computed: {
      checkboxValue: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .ds-checkbox-component-wrapper {
    .ds-checkbox-wrapper {
      display: inline-flex;
      align-items: center;

      .ds-checkbox-container {
        display: inline-block;
        height: 20px;
        width: 20px;
        border-radius: 2px;

        &.ds-checkbox-container-active {
          background-color: @color-gray-400;
        }

        &.ds-checkbox-container-inactive {
          background-color: @color-gray-300;
        }
      }

      .ds-checkbox-icon {
        position: relative;
        right: 15px;

        &.ds-checkbox-icon-inactive {
          visibility: hidden;
        }
      }

      .ds-checkbox-text {
        height: 16px;
        font-family: "Roboto Light";
        font-size: 14px;
        line-height: 16px;

        &.ds-checkbox-text-active {
          color: @color-dark;
        }

        &.ds-checkbox-text-inactive {
          color: @color-gray-500;
        }
      }

      .ds-checkbox-input {
        display: none;
      }
    }
  }
</style>
