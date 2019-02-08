<!--
  A styled input with an ability to set icon and validation

  Usage:

    <Input
      :placeholder=''
      :type=''
      :validator=''
      :top-title=''
      :disabled=''
      :icon=''
      :icon-right=''
      :help=''
      :bottom-help=''
    />

  Properties:

    // TODO

  Events:

    // TODO
-->

<template>
  <div class="input-component-wrapper">
    <div v-if="topTitle" class="top-title">{{topTitle}}</div>
    <div class="input-field-wrapper">
      <div :class="['inner-wrapper', {'has-icon-help': help}]">
        <Icon
          v-if="icon"
          class="icon-left"
          :source="icon"
          :color="COLORS['gray-400']"
        />
        <input
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :class="{
          'has-icon': icon,
          'has-icon-right': iconRight,
          'error': !fieldValid
        }"
          v-model="inputValue"
        ></input>
        <Icon
          v-if="rightIcon"
          class="icon-right"
          :source="rightIcon"
          :color="COLORS['gray-400']"
        />
      </div>
      <div class="icon-help"
        @mouseover="tooltipVisible = true"
        @mouseleave="tooltipVisible = false"
      >
        <Icon
          v-if="help"
          class="icon-help"
          source="help"
          :color="!tooltipVisible ? COLORS['gray-400'] : COLORS['black']"
        />
        <Tooltip v-html="help" :visible="tooltipVisible"></Tooltip>
      </div>
    </div>
    <div v-if="bottomHelp" class="bottom-help-wrapper">
      <span
        class="bottom-help"
        @mouseover="tooltipBottomVisible = true"
        @mouseleave="tooltipBottomVisible = false"
      >{{`? ${bottomHelp.label}`}}</span>
      <Tooltip v-html="'asdadwdadawd'" :visible="tooltipBottomVisible"></Tooltip>
    </div>
    <ul class="error-list" v-if="!fieldValid">
      <li class="error-message" v-for="error in errors">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from './Icon'
import Tooltip from './Tooltip'
import {COLORS} from '../styles/vars'

export default {
  name: "Input",
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    validators: {
      type: Array,
      default: () => []
    },
    topTitle: String,
    disabled: Boolean,
    icon: String,
    iconRight: String,
    help: String,
    bottomHelp: Object
  },
  components: {Tooltip, Icon},
  data: () => ({
    COLORS,
    tooltipVisible: false,
    tooltipBottomVisible: false,
    inputValue: '',
    errors: []
  }),
  computed: {
    rightIcon () {
      return this.disabled ? 'lock' : this.iconRight
    },
    fieldValid () {
      if (this.validators.length !== 0) {
        this.errors = []
        this.validators.forEach((validator) => {
          !validator.validator(this.inputValue) && this.errors.push(validator.message)
        })
        return this.errors.length === 0
      } else {
        return true
      }
    }
  },
  watch: {
    inputValue (newValue) {
      const emittedObject = {
        value: newValue,
        error: !this.fieldValid
      }
      this.$emit('updated:input', emittedObject)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

.input-component-wrapper {
  display: inline-block;
  position: relative;

  .error-list {
    margin: 0;
    list-style: none;
    color: @color-red;
    font-size: 14px;
    padding-left: 10px;
  }

  .top-title {
    color: @color-gray-500;
    font-size: 14px;
    line-height: 2;
  }

  .input-field-wrapper {
    display: flex;
    align-items: center;

    .icon-help {
      position: relative;

      .icon {
        cursor: pointer;
      }
    }

    .inner-wrapper {
      display: inline-block;
      position: relative;

      &.has-icon-help {
        margin-right: 10px;
      }

      input {
        font-size: 16px;
        padding: 10px;
        border-radius: @input-border-radius;
        border: 1px solid @color-gray-200;
        color: @color-black;
        width: 100%;
        box-sizing: border-box;

        &.has-icon {
          padding-left: 40px;
        }

        &.has-icon-right {
          padding-right: 40px;
        }

        &.error {
          border-color: @color-red;
        }

        &:focus:not(.error) {
          border-color: @color-brand;
        }

        &:focus {
          outline: none;
        }

        &::placeholder {
          color: @color-gray-500;
        }
      }

      .icon-left,
      .icon-right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      .icon-left {
        left: 8px;
      }

      .icon-right {
        right: 8px;
      }
    }
  }

  .bottom-help-wrapper {
    display: inline-block;
    position: relative;
    padding-left: 10px;

    .bottom-help {
      font-size: 12px;
      color: @color-gray-500;
      border-bottom: 1px dashed @color-gray-500;
      line-height: 1;
      cursor: pointer;
    }
  }
}
</style>
