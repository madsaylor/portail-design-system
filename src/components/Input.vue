<!--
  A styled input with an ability to set icon and validation

  Usage:

    <Input
      :placeholder='Placeholder' - Text displayed as placeholder value
      :type='email'              - Input type
      :validators='validators'   - Array of validators
      :top-label='label'         - label at the top
      :disabled='true'           - Disables input
      :icon='search'             - Icon name on the right of the input
      :help='Some help text'     - Shown when hovering help icon
      :bottom-help='bottomHelp'  - Object of bottom help
      v-model='value'            - Binds value property to input
      @validation                - Emits whether input has errors
    />

  Properties:

    placeholder - String. Sets html input tag's placeholder

    type - String. Sets html input tag's type

    validators - Array[Object]. Array of validator Objects. Each Object must have two fields:
      message (String) - Error message that will be displayed if a validation failed.
      validator (function) - Function that takes input value as an argument and implements
        validation logic.

    label - String. Text that will be displayed as a label for input.

    disabled - Boolean. Defines if an input is disabled.

    icon - String (icon name or <svg>...</svg> code). Sets the icon displayed in the input
      on the right

    help - String or html code. When set this will add a help icon on the right of the input
      which when hovered will display a tooltip with received prop content.

    bottomHelp - Object. Will display a help text with a tooltip on hover at the bottom of the input.
      Object must contain two fields:
      label (String) - Text of help label.
      text (String or html code) - Content of the tooltip

  Events:

    validation - Emitted when an input value changes. Emits true/false which tells if an input has
      validation errors.
-->

<template>
  <div :class="['input', {sm, md, lg}]">
    <label class="label">
      <div class="label-text">{{label}}</div>
      <input
        v-bind="inputAttrs"
        :class="{'has-icon': icon_, 'error': errors.length}"
        v-model="inputValue"
        ref="input"
        @focus="inputFocus"
        @click="inputFocus"
      />
    </label>

    <Icon v-if="icon_" color="gray-500" :source="icon_" />

    <div class="drawer">
      <span v-if="errors.length" class="error-message">
        {{ errors[0] }}
      </span>


      <span
        v-if="help" class="help-label" ref="helpLabel"
        @mouseover="helpVisible = true"
      >
        {{ helpLabel }}
        <Dropdown :target="$refs.helpLabel" :opened.sync="helpVisible">
          <div class="help-content" v-html="help"></div>
        </Dropdown>
      </span>
    </div>

    <Dropdown
      v-if="type === 'date'"
      :target="$refs.input"
      :opened.sync="datepickerVisible"
      position="bottom-middle"
    >
      <Datepicker
        :min="datepickerMin"
        :max="datepickerMax"
        v-model="datepickerValue"
      ></Datepicker>
    </Dropdown>
  </div>
</template>

<script>
import Datepicker from './Datepicker'
import Dropdown from './Dropdown'
import Icon from './Icon'

export default {
  name: "Input",
  components: {Datepicker, Dropdown, Icon},
  props: {
    // General
    disabled: Boolean,
    help: String,
    helpLabel: {
      type: String,
      default: '? explication'
    },
    icon: String,
    label: String,
    lang: String,
    lg: Boolean,
    md: Boolean,
    sm: Boolean,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    validators: Array,
    value: null,

    // For type="date"
    minDate: Date,
    maxDate: Date,
    dateRangeStart: {
      type: Date,
      default: () => new Date(),
    },
    dateRange: Object,  // For example {min: 30, max: 180}
  },
  data: () => ({
    helpVisible: false,
    datepickerVisible: false,
  }),
  mounted() {
    this.$emit('validation', !!this.errors.length)
  },
  computed: {
    inputAttrs() {
      return {
        type: this.type === 'date' ? 'text' : this.type,
        placeholder: this.placeholder,
        disabled: this.disabled,
        readonly: this.type === 'date',
      }
    },
    icon_() {
      if (this.type === 'date') {
        return 'today'
      }
      return this.icon
    },
    locale() {
      return this.lang || this.$root.locale || 'fr-fr'
    },
    errors() {
      if (this.validators && this.validators.length) {
        return this.validators.reduce((acc, validator) => {
          if (!validator.validator(this.inputValue)) {
            acc.push(validator.message);
          }
          return acc;
        }, [])
      }
      return [];
    },
    inputValue: {
      get() {
        if (this.type === 'date') {
          if (!this.value || isNaN(this.value)) {
            return ''
          }

          return this.value.toLocaleDateString(this.locale)
        }

        return this.value
      },
      set(value) {
        if (this.type === 'date') {
          return
        }

        this.$emit('validation', !!this.errors.length)
        this.$emit('input', value)
      }
    },
    datepickerValue: {
      get() {
        if (this.value && !isNaN(this.value)) {
          return this.value
        }
        let date = new Date()
        if (this.datepickerMax && date.getTime() > this.datepickerMax.getTime()) {
          return this.datepickerMax
        }
        if (this.datepickerMin && date.getTime() < this.datepickerMin.getTime()) {
          return this.datepickerMin
        }
        return date
      },
      set(value) {
        this.$emit('validation', !!this.errors.length)
        this.$emit('input', value)
      }
    },
    datepickerMin() {
      if (this.dateRange && this.dateRange.min != null) {
        let minDate = new Date(this.dateRangeStart)
        minDate.setDate(minDate.getDate() - this.dateRange.min)
        return minDate
      }
      return this.minDate
    },
    datepickerMax() {
      if (this.dateRange && this.dateRange.max != null) {
        let maxDate = new Date(this.dateRangeStart)
        maxDate.setDate(maxDate.getDate() + this.dateRange.max)
        return maxDate
      }
      return this.maxDate
    },
  },
  methods: {
    inputFocus() {
      if (this.type === 'date') {
        this.datepickerVisible = true
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

.input {
  position: relative;
  display: inline-block;
  width: 100%;

  &.sm {
    width: 144px;
  }
  &.md {
    width: 252px;
  }
  &.lg {
    width: 464px;
  }

  .label-text {
    height: 16px;
    margin-bottom: 4px;
    .font-desktop-x-small-regular-gray()
  }

  input {
    padding: 8px 12px;
    box-sizing: border-box;
    border: 1px solid @color-gray-300;
    border-radius: 2px;
    background-color: @color-white;
    width: 100%;
    .font-desktop-small-regular-dark();

    &.has-icon {
      padding-right: 30px;
    }

    &::placeholder {
      .font-desktop-small-regular-gray();
    }

    &:focus:not(.error) {
      border-color: @color-primary;
    }
    &:focus {
      outline: none;
    }

    &.error {
      border-color: @color-red;
    }

    &:disabled {
      border: 1px solid #f2f4f7;
    }
    &:disabled,
    &:disabled::placeholder {
      .font-desktop-small-regular-light-gray();
    }
  }

  .icon {
    pointer-events: none;
    position: absolute;
    margin-left: -30px; // 24 + 6, icon size and padding
    margin-top: 6px;    // center the 24px icon in the 36px input
  }

  .drawer {
    box-sizing: border-box;
    font-size: 11px;
    line-height: 12px;
    padding: 3px 12px;
    position: absolute;
    width: 100%;

  }

  .error-message {
    color: @color-red;
    font-family: @font-family;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 100%;
  }

  .help-label {
    cursor: pointer;
    color: @color-gray-500;
    font-family: @font-family;
    text-decoration: underline dashed;
  }

  input[type="date"]::-webkit-inner-spin-button,
  input[type="date"]::-webkit-clear-button,
  input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
    color: rgba(0,0,0,0);
    opacity:0;
  }
}
</style>
