<!--
  A styled input with an ability to set icon and validation

  Usage:

    <Input
      :disabled="true"            - Disables input
      :help="'Some help text'"    - Shown when hovering help label
      :helpLabel="'Show help'"    - Text for the help label
      :icon="'search'""           - Icon name or svg code
      :label="'My Input'"         - Label at the top of the input
      :lang="'en-en'"             - BCP 47 localization code
      :lg="false"                 - Large size
      :md="false"                 - Medium size
      :sm="false"                 - Small size
      :placeholder='Placeholder'  - Text used as the placeholder
      :type='email'               - Input type
      name='test'           - With this property current input listen event validateTest
      :validators='validators'    - Array of validators

      :minDate=" pastDate"        - Earliest date for the datepicker
      :maxDate="futureDate"       - Latest date for the datepicker
      :dateRangeStart="today"     - Starting point for the dateRange
      :dateRange="{min: 30}"      - N days in past/future date range

      v-model='value'             - Binds value property to input
      @validation                 - Emits validation result
      @validate                   - Run field validation.
      @validate{name}        - Run field validation, for inputs which have current name property.
    />

  Properties:
                            --- General ---

    disabled - Boolean. Is input disabled. Passed directly to the input

    help - String. Text for the tooltip at the bottom of the input

    helpLabel - String. Text for the tooltip label

    icon - String. Icon name for icons from src/icons folder or an svg code

    label - String. Label at the top of the input

    lang - String. BCP 47 code. Language to be used in the datepicker
      for month names and weekday labels. Can be set globally with
      $root.locale. This property overrides global setting

    lg - Boolean. Large size - 464px

    md - Boolean. Medium size - 252px

    sm - Boolean. Small size -  144px

    placeholder - String. Passed directly to the input

    type - String. Passed to the input with type_ computed property.
      <Input type="date" /> results in <input type="text" />

    validators - Array<Object>. Array of validator Objects. Each Object should
      have three fields:
        name (String) - Validator id
        message (String) - Error message that shown when validation fails
        validator (function) - Function that takes input value as an argument
          and returns true/false

      When multiple validators fail, only one error is displayed, determined
      by their order in the array

                             --- Date ---

    minDate - Date. Earliest selectable day for the datepicker

    maxDate - Date. Latest selectable day for the datepicker

    dateRangeStart - Date. Point of reference for the dateRange property

    dateRange - Object. An alternative to minDate/maxDate:
      :dateRange="{
        min: 10,  - 10 calendar days in the past from the dateRangeStart
        max: 20,  - 20 calendar days in the future from the dateRangeStart
      }"

    datepickerPosition - String. Forwarded to datepicker dropdown position

                            --- Select ---

    options - Array<Object>. Options for select. Each item is bound to an
      <option> element. Additionaly a .title property can be set to change
      the displayed value

                           --- radio ---

    radioVal - String. if the value of v-model is same as radioVal of the element,
      the element is selected.

  Events:

    validation - Emitted when the input value changes. The event payload is
      an array of the following structure:
        [['validator.name', isValid], ...]

    validate - Listening event 'validate' for running validation even if this field was not touched.
    validateTest - Listening event 'validate' for running validation for field with "name: 'test'"
                   with even if this field was not touched.

  Model:

    Input value is updated through v-model directive
-->

<template>
  <div :class="['ds-input', getType, {'ds-disabled': disabled, 'ds-sm': sm, 'ds-md': md, 'ds-lg': lg, preventScroll: datepickerVisible}]"
    :style="{width}"
    @click="onInputClick"
  >
    <label>
      <div v-if="label"
           :id="id"
           @click="onInputPrevent($event, true); onCheckboxRadioClick();"
           :class="['ds-label-text', {'ds-slide-label': slideLabel, 'ds-label-focus': labelFocus, 'ds-slide-label-date': getType === 'ds-date',
                    'ds-label-error': inputErrors.length && touched && showErrors},
                    slideActive ? 'ds-slide-label-active' : slideLabel ? 'ds-slide-label-inactive' : '']">
          {{ label }}
      </div>

      <Icon :size="iconSize"
            v-if="iconLeft && showIcon"
            :color="iconColor"
            :source="iconLeft"
            :class="['ds-icon-left', {'active-icon': activeIcon}]"
            :padding="iconPadding"
            @click="onIconClick"
      />

      <input
        v-if="getType !== 'ds-select' && getType !== 'ds-radio' && !mask"
        v-bind="inputAttrs"
        :[checkMaxLength]="maxlength"
        :[checkPasswordType]="type"
        :class="{
          'ds-has-icon': icon_,
          'ds-error': inputErrors.length && touched && showErrors,
          'ds-slide-input': slideLabel,
          'date': getType === 'ds-date',
          'ds-has-left-icon': iconLeft,
          'ds-text-right': textAlign === 'right'
        }"
        v-model="inputValue"
        ref="input"
        :style="getStyle"
        @focus.prevent="inputFocus"
        @[checkSetClickEvent].prevent="inputFocus"
        @blur="inputBlur"
        @keypress="onKeyPress"
        @keydown="onKeyDown"
        @mousedown="onInputPrevent($event)"
        @paste.prevent="onPaste($event)"
      />

      <input
        v-if="getType !== 'ds-select' && getType !== 'ds-radio' && mask"
        v-bind="inputAttrs"
        :[checkMaxLength]="maxlength"
        :[checkPasswordType]="type"
        :class="{
          'ds-has-icon': icon_,
          'ds-error': inputErrors.length && touched && showErrors,
          'ds-slide-input': slideLabel,
          'date': getType === 'ds-date',
          'ds-has-left-icon': iconLeft,
          'ds-text-right': textAlign === 'right'
        }"
        v-model="inputValue"
        ref="input"
        :style="getStyle"
        v-mask="mask"
        @focus.prevent="inputFocus"
        @[checkSetClickEvent].prevent="inputFocus"
        @blur="inputBlur"
        @keypress="onKeyPress"
        @keydown="onKeyDown"
        @mousedown="onInputPrevent($event)"
        @paste.prevent="onPaste($event)"
      />

      <input
        v-if="getType == 'ds-radio'"
        v-bind="inputAttrs"
        :class="{'ds-has-icon': icon_, 'ds-error': inputErrors.length && touched, 'ds-has-left-icon': iconLeft}"
        :checked="inputValue === radioVal"
        @change="changeRadio"
        @blur="touched = true"
      />

      <div v-if="getType === 'ds-checkbox' || getType === 'ds-radio'"
           :class="[getType]"
           @click="onCheckboxRadioClick">
      </div>

      <select
        v-if="getType === 'ds-select'"
        v-bind="inputAttrs"
        :class="{'ds-has-icon': icon_, 'ds-error': inputErrors.length && touched, 'ds-has-left-icon': iconLeft}"
        v-model="inputValue"
        placeholder="placeholder"
        @blur="touched = true"
      >
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="getOptionValue(option)"
        >
          {{ option.title || option.value }}
        </option>
      </select>

      <div v-if="getType === 'ds-select' && inputValue !== 0 &&!inputValue" class="ds-select-placeholder">{{ placeholder }}</div>

      <Icon :size="iconSize"
            v-if="icon_ && showIcon"
            :color="iconColor"
            :class="{'active-icon': activeIcon}"
            :source="icon_"
            :padding="iconPadding"
            @click="onIconClick"
      />

      <div class="ds-drawer">
        <span v-if="inputErrors.length && touched && showErrors" class="ds-error-message">
          {{ inputErrors[0] }}
        </span>
        <span v-if="subLabel && !(inputErrors.length && touched)" class="ds-sub-label">
          {{subLabel}}
        </span>
        <span
          v-show="help && !(inputErrors.length && touched) && !subLabel"
          class="ds-help-label"
          ref="helpLabel"
          @mouseover="helpVisible = true"
        >
          {{ helpLabel }}
          <Dropdown :target="$refs.helpLabel" :opened.sync="helpVisible" just-fade>
            <Tooltip v-html="help" />
          </Dropdown>
        </span>
      </div>
    </label>

    <Dropdown
      v-show="getType === 'ds-date' && getDatepickerPosition !== 'modal'"
      :target="$refs.input"
      :opened.sync="datepickerVisible"
      :position="getDatepickerPosition"
      :borderColor="!isMobile && datepickerBorderColorDesktop"
      :labelId="id"
      :activeDatepickerComponent="activeDatepickerComponent"
      just-fade
    >
      <Datepicker
        :min="datepickerMin"
        :max="datepickerMax"
        v-model="datepickerValue"
      ></Datepicker>
    </Dropdown>

    <Dialog
      v-show="getType === 'ds-date' && getDatepickerPosition === 'modal'"
      :opened.sync="datepickerVisible"
      :borderColor="!isMobile && datepickerBorderColorDesktop"
      :datepickerContainer="isMobile && getType === 'ds-date'"
      :backgroundColor="datepickerBackgroundColor"
      :backdropOpacity="datepickerBackdropOpacity"
      :dialogStyleObject="datepickerWrapperStyleObject"
      :contentFullWidth="datepickerFullWidth"
      :overflowCheck="overflowCheckStatus"
      :activeDatepickerComponent="activeDatepickerComponent"
    >
      <Datepicker
        :min="datepickerMin"
        :max="datepickerMax"
        :fullWidth="datepickerFullWidth"
        v-model="datepickerValue"
      ></Datepicker>
    </Dialog>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import Datepicker from './Datepicker'
import Dropdown from './Dropdown'
import Icon from './Icon'
import Dialog from './Dialog'
import Tooltip from './Tooltip'

import _ from 'lodash'

const DesktopWidth = 960

export default {
  name: "Input",
  components: {Datepicker, Dropdown, Icon, Tooltip, Dialog},
  props: {
    // General
    disabled: Boolean,
    help: String,
    name:  String,
    helpLabel: {
      type: String,
      default: '? explication'
    },
    icon: String,
    iconLeft: String,
    iconSize: {
      type: String,
      default: '24px'
    },
    iconColor: {
      type: String,
      default: 'gray-400'
    },
    iconPadding: String,
    label: String,
    subLabel: String,
    lang: String,
    lg: Boolean,
    md: Boolean,
    sm: Boolean,
    placeholder: String,
    type: {
      type: String,
      validator(value) {
        return ['text', 'date', 'select', 'checkbox', 'radio', 'password', 'number',
                'number-dot', 'payment-card', 'tel'].indexOf(value) !== -1
      },
      default: 'text'
    },
    validators: Array,
    value: null,
    datepickerBorderColorDesktop: String,
    datepickerBackgroundColor: String,
    datepickerBackdropOpacity: String,
    datepickerWrapperStyleObject: Object,
    slideLabel: Boolean,
    showErrors: {
      type: Boolean,
      default: true
    },
    maxlength: Number,
    pattern: RegExp,
    confirmModel: null,
    activeIcon: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    width: String,

    // For type="radio"
    radioVal: String,

    // For type="date"
    minDate: Date,
    maxDate: Date,
    dateRangeStart: Date,  // will be new Date() if not set
    dateRange: Object,     // For example {min: 30, max: 180}
    datepickerPosition: {
      type: String,
      default: 'bottom-middle',
    },
    datePositionChangeable: Boolean,
    datepickerFullWidth: {
      type: Boolean,
      default: false
    },

    // For type="select"
    options: Array,
    valueModeSelect: {
      type: Boolean,
      default: false
    },
    textAlign: {
      type: String,
      default: 'left'
    },
    selectOptionFormat: {
      type: Number,
      default: 1
    },
    mask: String
  },
  data: () => ({
    validateEventName: undefined,
    helpVisible: false,
    datepickerVisible: false,
    touched: false,
    slideActive: undefined,
    labelFocus: undefined,
    windowWidth: window.innerWidth,
    positions: Array,
    timeoutId: undefined,
    id: Math.random().toString(36).substring(7)
  }),
  mounted() {
    if (this.name) {
      this.validateEventName = `validate${this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()}`;

      document.addEventListener(this.validateEventName, this.validate);
    }

    this.checkValuePattern()

    if (this.datePositionChangeable) {
      this.positions = this.datepickerPosition.split(' ')
      window.addEventListener('resize', this.onResize)
    }

    document.addEventListener('validate', this.validate);

    this.$emit('validation', this.validation)

    setTimeout(() => this.slideInit(), 500)
  },
  computed: {
    overflowCheckStatus() {
      return this.getType === 'ds-date' && this.getDatepickerPosition === 'modal' && this.datePositionChangeable
    },
    inputAttrs() {
      return {
        type: this.type === 'date' || this.type === 'number' ? 'text' : this.type,
        placeholder: this.placeholder,
        disabled: this.disabled,
        readonly: this.getType === 'ds-date',
      }
    },
    icon_() {
      if (this.getType === 'ds-date') {
        return 'today'
      }
      if (this.getType === 'ds-select') {
        return 'expand_more'
      }
      return this.icon
    },
    locale() {
      if (this.$root === this) {
        return this.lang || 'fr-fr'
      }
      return this.lang || this.$root.locale || 'fr-fr'
    },
    /**
     * Validation data for the current value and validators
     * this.validation -> [
     *   [
     *     'required',  // validator.name
     *     true         // is valid
     *   ],
     *   ...
     * ]
     */
    validation() {
      if (!this.validators || !this.validators.length) {
        return []
      }

      let data = []
      for (var i = 0; i < this.validators.length; i++) {
        data.push([
          this.validators[i].name,
          this.validators[i].validator(this.inputValue, this.confirmModel),
        ])
      }
      return data
    },

    inputErrors() {
      let errors = []
      for (var i = 0; i < this.validation.length; i++) {
        if (!this.validation[i][1]) {
          errors.push(this.validators[i].message)
        }
      }
      return errors
    },
    inputValue: {
      get() {
        if (this.getType === 'ds-date') {
          if (!this.value || isNaN(this.value)) {
            return ''
          }

          return this.value.toLocaleDateString(this.locale)
        }

        if (this.getType === 'ds-select') {
          if (_.isObject(this.value) && this.valueModeSelect) {
            if (this.selectOptionFormat === 1) {
              return this.value.value
            } else if (this.selectOptionFormat === 2) {
              return this.value.id
            }
          }
        }

        return this.value
      },
      set(value) {
        if (this.getType === 'ds-date') {
          return
        }

        this.$emit('input', value)
        this.$emit('change', value)
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
        this.datepickerVisible = false
        this.$emit('input', value)
        this.$emit('change', value)
      }
    },
    dateRangeStart_() {
      return this.dateRangeStart || new Date()
    },
    datepickerMin() {
      if (this.dateRange && this.dateRange.min != null) {
        let minDate = new Date(this.dateRangeStart_)
        minDate.setDate(minDate.getDate() - this.dateRange.min)
        return minDate
      }
      return this.minDate
    },
    datepickerMax() {
      if (this.dateRange && this.dateRange.max != null) {
        let maxDate = new Date(this.dateRangeStart_)
        maxDate.setDate(maxDate.getDate() + this.dateRange.max)
        return maxDate
      }
      return this.maxDate
    },
    isMobile() {
      return this.windowWidth <= DesktopWidth
    },
    getDatepickerPosition() {
      if (this.datePositionChangeable) {
        return this.isMobile ? this.positions[1] : this.positions[0]
      } else {
        return this.datepickerPosition
      }
    },
    activeDatepickerComponent() {
      if (this.getDatepickerPosition === 'modal') {
        return 'Dialog'
      } else if (this.getDatepickerPosition !== 'modal') {
        return 'Dropdown'
      } else {
        return void 0
      }
    },
    getType() {
      return `ds-${this.type}`
    },
    checkSetClickEvent() {
      return this.getType === 'ds-checkbox' ? null : 'click'
    },
    checkMaxLength() {
      return (this.type === 'text' || this.type === 'password' || this.type === 'number' || this.type === 'number-dot' ||
              this.type === 'payment-card') && this.maxlength ? 'maxlength' : null
    },
    checkPasswordType() {
      return this.getType === 'ds-password' ? this.type : null
    },
    getStyle() {
      const style = {}
      const padding = parseInt(this.iconSize) + 6
      if (this.icon) {
        style.paddingRight = padding + 'px'
      } else if (this.iconLeft) {
        style.paddingLeft = padding + 'px'
      }

      if (this.width) {
        style.width = this.width
      }

      return style
    }
  },
  methods: {
    onInputClick(e) {
      this.$emit('click', e)
    },
    onCheckboxRadioClick() {
      if (this.getType === 'ds-checkbox' || this.getType === 'ds-radio') {
        this.inputFocus();
      }
    },
    onInputPrevent(event, callInputFocus) {
      if (this.getType === 'ds-date') {
        event.preventDefault()
        if (callInputFocus) {
          this.inputFocus()
        }
      }
    },
    inputFocus() {
      if (this.slideLabel) {
        this.labelFocus = true;
        this.slideActive = true;
      }

      if (this.getType === 'ds-date') {
        this.datepickerVisible = !this.datepickerVisible;
        this.$refs.input.blur();
      }
      this.$emit('inputFocus')
    },
    inputBlur() {
      if (this.slideLabel) {
        this.labelFocus = false;

        if (!this.value) {
          this.slideActive = false;
        }
      }

      this.touched = true;
      this.$emit('inputBlur')
    },
    validate() {
      this.touched = true;
      this.$emit('validation', this.validation)
    },
    changeRadio() {
      this.$emit('input', this.radioVal)
      this.$emit('change', this.radioVal)
    },
    slideInit() {
      if (this.slideLabel && this.value) {
        this.slideActive = true;
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth
    },
    onKeyPress(event) {
      event = event ? event : window.event
      let charCode = event.which ? event.which : event.keyCode

      if ((this.type === 'payment-card' && charCode > 32 || this.type === 'number' && charCode > 31 ||
          (this.type === 'number-dot' && (charCode > 31 && charCode !== 46))) &&
          (charCode < 48 || charCode > 57)) {

        event.preventDefault()
      }
    },
    onKeyDown() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }

      this.timeoutId = setTimeout(() => {
        this.$emit('lastKeyDownDelay')
      }, 300)
    },
    setOverflow(mobileMode) {
      if (this.datepickerVisible) {
        if (mobileMode && this.getDatepickerPosition === 'modal') {
          document.body.style.overflowY = 'hidden';
        } else {
          document.body.style.overflowY = 'auto';
        }
      } else {
        document.body.style.overflowY = 'auto';
      }
      document.body.style.overflowX = 'hidden';
    },
    getOptionValue(option) {
      if (this.valueModeSelect) {
        if (this.selectOptionFormat === 1) {
          return option.value
        } else {
          return option.id
        }
      }
      return option
    },
    setValidity(field, value) {
      const orgValidators = cloneDeep(this.validators)
      this.validators = this.validators.map(validator => {
        if (validator.name === field) {
          validator.validator = () => value
        }
        return validator
      })
      this.$emit('validation', this.validation)
      this.validators = cloneDeep(orgValidators)
    },
    checkValuePattern(paste, value) {
      if (this.value || paste) {
        let patternObj = {
          'number': /[^0-9]+/g,
          'number-dot': /[^0-9.]+/g,
          'payment-card': /[^0-9 ]+/g
        }

        let pattern = patternObj[this.type]
        this.setValueByPatternLength(pattern, value || this.inputValue)
      }
    },
    onPaste(event) {
      let value = (this.inputValue || '') + event.clipboardData.getData('Text')
      this.checkValuePattern(true, value)
    },
    setValueByPatternLength(pattern, value) {
      if (pattern) {
        value = value.replace(pattern, '')
      }

      this.inputValue = typeof value === 'string' ? value.slice(0, this.maxlength) : value
    },
    onIconClick() {
      this.$emit('icon-click')
    },
    setTouched(touched) {
      this.touched = touched
    }
  },
  watch: {
    value(newValue) {
      if (this.slideLabel && !this.labelFocus && !newValue) {
        this.slideActive = false;
      }

      this.slideInit()
      this.$emit('validation', this.validation)
    },
    isMobile(value) {
      this.setOverflow(value);
    },
    datepickerVisible(value) {
      if (!value) {
        setTimeout(() => {
          document.body.removeAttribute('style')
        }, 300)
      }
      this.setOverflow(this.isMobile);
      this.$emit('datepickerVisible', value);
    }
  },
  beforeDestroy() {
    if (this.name) {
      document.removeEventListener(this.validateEventName, this.validate);
    }

    if (this.datePositionChangeable) {
      window.removeEventListener('resize', this.onResize)
    }

    document.removeEventListener('validate', this.validate);
  },
}
</script>

<style lang="less" scoped>
@import '../styles/vars';
@import '../styles/mixins';

.ds-input {
  display: inline-block;

  label {
    display: block;
    position: relative;
  }

  &.ds-sm {
    width: 144px;
  }
  &.ds-md {
    width: 252px;
  }
  &.ds-lg {
    width: 464px;
  }
  @media @screen-small {
    &.ds-lg {
      width: 296px;
    }
  }

  &.ds-text, &.ds-date, &.ds-select, &.ds-password, &.ds-number, &.ds-number-dot, &.ds-payment-card, &.ds-tel {
    .ds-label-text {
      .font-desktop-x-small-regular-gray();
      height: 16px;
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ds-slide-label {
      position: absolute;
      left: 5px;
      top: 20px;
      z-index: 1;
      padding: 0 0 0 6px;
      margin-bottom: 20px;
      max-width: 100%;
      height: 20px;
      font-size: 15px;
      font-family: Arial, Helvetica, sans-serif !important;
      color: #828282;
      background: linear-gradient(@color-white 90%, hsla(0,0%,100%,0)) !important;
      border-right: 2.5px solid #fff;

      &.ds-slide-label-active {
        transform: translateY(-20px) scale(0.85, 0.85);
        transition: .4s cubic-bezier(.25,.8,.25,1);
        color: #989898;
        font-size: 17px;
        padding: 0 10px;
        left: 0;
      }

      &.ds-slide-label-inactive {
        transition: .4s cubic-bezier(.25,.8,.25,1);
      }

      &.ds-label-focus {
        color: @color-dark;
      }

      &.ds-slide-label-date {
        cursor: pointer;
      }
    }

    input, select {
      .font-desktop-small-regular-dark();
      padding: 10px 12px;
      box-sizing: border-box;
      border: 1px solid @color-gray-300;
      border-radius: 2px;
      background-color: @color-white;
      width: 100%;

      &.ds-has-icon {
        padding-right: 30px;
      }

      &.ds-has-left-icon {
        padding-left: 30px;
      }

      &.ds-slide-input {
        margin-top: 10px;
      }

      &.ds-text-right {
        text-align: right;
      }

      .input-placeholder();

      &:focus:not(.ds-error) {
        border-color: @color-primary;
      }
      &:focus {
        outline: none;
      }

      &.ds-error {
        border-color: @color-red;
      }

      &:disabled {
        border: 1px solid #f2f4f7;
      }
      &:disabled, &:disabled::placeholder {
        .font-desktop-small-regular-light-gray-base();
      }
    }

    input[type="date"]::-webkit-inner-spin-button,
    input[type="date"]::-webkit-clear-button,
    input[type="date"]::-webkit-calendar-picker-indicator {
      display: none;
      -webkit-appearance: none;
      color: rgba(0,0,0,0);
      opacity: 0;
    }

    select {
      appearance: none;
      &::-ms-expand {
        display: none;
      }
    }

    .ds-select-placeholder {
      position: absolute;
      bottom: 6px;
      left: 14px;
      right: 32px;
      pointer-events: none;
      color: #838795;
      line-height: 24px;
      font-size: 16px;
      background-color: white;
    }

    .ds-select-placeholder + .icon-wrapper {
        pointer-events: none;
        position: absolute;
        bottom: 10%;
        right: 6px;
    }

    select + .icon-wrapper {
        pointer-events: none;
        position: absolute;
        bottom: 10%;
        right: 6px;
    }

    input + .icon-wrapper {
        pointer-events: none;
        position: absolute;
        bottom: 8%;
        right: 6px;
        height: 50% !important;
    }

    .ds-icon-left {
      pointer-events: none;
      position: absolute;
      bottom: 5px;
      left: 6px;
      height: 50% !important;
    }

    input + .active-icon {
      cursor: pointer;
      pointer-events: auto;
    }
  }
  
  &.ds-checkbox {
    .ds-label-text {
      box-sizing: border-box;
      display: inline-block;
      padding: 8px 0 8px 28px;
    }

    input {
      opacity: 0;
    }

    .ds-checkbox, .ds-checkbox::after {
      position: absolute;
      display: inline-block;
      border-radius: 2px;
    }

    .ds-checkbox {
      content: "";
      left: 0px;
      top: 7px;
      height: 20px;
      width: 20px;
      box-sizing: border-box;
      border: 1px solid @color-gray-300;
      background-color: @color-white;
    }

    .ds-checkbox::after {
      left: 4px;
      top: 4px;
      height: 10px;
      width: 10px;
      background-color: @color-primary;
    }
    input:checked + .ds-checkbox::after {
      content: "";
    }

    &:not(.ds-disabled) {
      .ds-label-text, .ds-checkbox, .ds-checkbox::after, input {
        .font-desktop-small-regular-dark();
        cursor: pointer;
      }
    }
    &.ds-disabled {
      .ds-label-text {
        .font-desktop-input-small-regular-gray-base();
      }
      .ds-checkbox {
        border: 1px solid #f2f4f7;
      }
      .ds-checkbox::after {
        background-color: fade(@color-primary, 50);
      }
    }
  }

  &.ds-radio {
    .ds-label-text {
      box-sizing: border-box;
      display: inline-block;
      padding: 8px 0 8px 28px;
    }

    input {
      opacity: 0;
    }

    .ds-radio, .ds-radio::after {
      position: absolute;
      display: inline-block;
      border-radius: 2px;
    }

    .ds-radio {
      content: "";
      left: 0px;
      top: 7px;
      height: 20px;
      width: 20px;
      box-sizing: border-box;
      border: 1px solid @color-gray-300;
      background-color: @color-white;
    }

    .ds-radio::after {
      left: 4px;
      top: 4px;
      height: 10px;
      width: 10px;
      background-color: @color-primary;
    }

    input:checked + .ds-radio::after {
      content: "";
    }

    &:not(.ds-disabled) {
      .ds-label-text, .ds-radio, .ds-radio::after, input {
        .font-desktop-small-regular-dark();
        cursor: pointer;
        border-radius: 10px;
      }
    }

    &.ds-disabled {
      .ds-label-text {
        .font-desktop-small-regular-gray();
        border-radius: 10px;
      }
      .ds-radio {
        border: 1px solid #f2f4f7;
        border-radius: 10px;
      }
      .ds-radio::after {
        background-color: @color-gray-400;
        border-radius: 10px;
      }
    }
  }

  &.ds-date {
    input {
      cursor: pointer;
    }
  }

  .ds-drawer {
    box-sizing: border-box;
    font-size: 11px;
    line-height: 12px;
    padding: 3px 0;
    position: absolute;
    text-align: left;
    max-width: 100%;
    width: 100%;
  }

  .ds-error-message {
    color: @color-red;
    font-family: @font-family;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    display: inline-block;
    max-width: 100%;
  }

  .ds-help-label, .ds-sub-label {
    cursor: pointer;
    color: @color-gray-500;
    font-family: @font-family;
    padding-left: 12px;
    padding-right: 12px;
  }

  .ds-help-label {
    text-decoration: underline dashed;
  }

  &.ds-lg {
    input {
      .placeholder-font-size(16px);
      font-size: 16px;
    }
  }

  &.ds-error {
    input {
      color: @color-red !important;
      border-color: @color-red !important;
    }
  }
}
</style>
