<template>
  <span class="ds-checkbox-component-wrapper">
    <label class="ds-checkbox-wrapper">
      <span :class="['ds-checkbox-container', {'ds-checkbox-container-inactive': !checkboxValue,
                     'ds-checkbox-container-active': checkboxValue}]">
      </span>

      <Icon check_box
            size="11px"
            v-if="checkboxValue"
            class="ds-checkbox-icon">
      </Icon>

      <span :class="['ds-checkbox-text', {'ds-checkbox-text-active': checkboxValue && !boldLabel,
                     'ds-checkbox-text-inactive': !checkboxValue && !boldLabel, 'ds-checkbox-text-bold': boldLabel}]">
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
      label: String,
      boldLabel: Boolean
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
      position: relative;

      .ds-checkbox-container {
        display: inline-block;
        cursor: pointer;
        height: 20px;
        width: 20px;
        border-radius: 2px;

        &.ds-checkbox-container-active {
          background-color: rgba(30, 179, 134, 0.15);
        }

        &.ds-checkbox-container-inactive {
          background-color: @color-gray-300;
        }
      }

      .ds-checkbox-icon {
        position: absolute;
        left: 5px;
      }

      .ds-checkbox-text {
        height: 16px;
        font-size: 14px;
        line-height: 16px;

        &.ds-checkbox-text-active {
          font-family: "Roboto Light";
          color: @color-dark;
          margin-left: 10px;
        }

        &.ds-checkbox-text-inactive {
          font-family: "Roboto Light";
          color: @color-gray-500;
          margin-left: 10px;
        }

        &.ds-checkbox-text-bold {
          color: #1B1E24;
          font-family: Roboto, sans-serif;
          margin-left: 12px;
        }
      }

      .ds-checkbox-input {
        display: none;
      }
    }
  }
</style>
