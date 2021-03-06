<!--
  TextArea - custom textarea component

  Usage:

  <TextArea v-model="value"                   - Binds value property to textarea
            :label="secondlabelText"          - Label at the top of the textarea
            :placeholder="placeholder"        - Placeholder directly to the textarea
            :rows="rows"                      - Sets the height as strings
            :validators="validators"          - Array of validator Objects. When multiple validators fail,
                                                only one error is displayed, determined by their order in the array.
                                                Each Object should have three fields:
                name    - Validator id
                message - Error message that shown when validation fails
                validator - Function that takes input value as an argument and returns Boolean

            :showErrors="showErrors"          - Responsible for showing error message
            :initValidation="initValidation"  - Responsible for initial run validation
            :initialTouched="initialTouched"  - Initial set of touched property
            @validation>                      - Emitted when the textarea value changes or in initial proccess depend
                                                on initValidation value
  </TextArea>
-->

<template>
  <div class="ds-text-area">
    <label>
      <div class="ds-label-text" v-if="label">{{label}}</div>
      <textarea
        v-model="textareaValue"
        :key="textAreaId"
        :placeholder="placeholder"
        :name="name"
        :rows="rows"
        :class="{
          'ds-error': textareaErrors.length && touched && showErrors,
          'ds-valid': textareaErrors.length == 0 && touched && showErrors
        }"
        :disabled="disabled"
        @blur="onBlur"
      />
    </label>
    <div class="ds-textarea-errors-wraper">
      <span v-if="textareaErrors.length && touched && showErrors" class="ds-error-message">
        {{ textareaErrors[0] }}
      </span>
      
      <div class="ds-notification">{{ notificationStr }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TextArea",
    props: {
      value: null,
      label: String,
      placeholder: String,
      name: String,
      rows: Number,
      disabled: Boolean,
      maxCharacters: Number,
      validators: Array,
      showErrors: {
        type: Boolean,
        default: true
      },
      initValidation: {
        type: Boolean,
        default: false
      },
      initialTouched: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      validateEventName: undefined,
      touched: false,
      notificationStr: '',
      textAreaId: Math.random().toString(36).substring(7)
    }),
    methods: {
      onBlur() {
        this.touched = true
      },
      initValidate() {
        this.touched = true
        this.$emit('validation', this.validation)
      }
    },
    computed: {
      textareaValue: {
        get() {
          if (!this.value) {
            return ''
          }

          if (!this.maxCharacters || this.value.length < this.maxCharacters) {
            return this.value
          } else {
            return this.value.substring(0, this.maxCharacters)
          }
        },
        set(value) {
          this.$emit('input', value)
        }
      },
      validation() {
        let data = []

        if (!this.validators || !this.validators.length) {
          return data
        }

        for (let i = 0; i < this.validators.length; i++) {
          data.push([
            this.validators[i].name,
            this.validators[i].validator(this.textareaValue)
          ])
        }

        return data
      },
      textareaErrors() {
        let errors = []

        if (this.textareaValue && this.maxCharacters && this.textareaValue.length > this.maxCharacters) {
          errors.push(this.dsTranslateComplex(['Can input less characters (1/2)', 'Can input less characters (2/2)'],
                                              [`${this.maxCharacters}`]))
          this.$emit('validation', [['max-charactor', false]])
        }

        for (let i = 0; i < this.validation.length; i++) {
          if (!this.validation[i][1]) {
            errors.push(this.validators[i].message)
          }
        }

        return errors
      }
    },
    mounted() {
      if (this.maxCharacters) {
        this.notificationStr = `${this.value ? this.value.length : 0}/${this.maxCharacters}`
      }

      this.$nextTick(() => {
        if (this.initValidation) {
          this.initValidate()
        }
      })

      if (this.name) {
        this.validateEventName = `validate${this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()}`;
        document.addEventListener(this.validateEventName, this.initValidate);
      }

      document.addEventListener('validate', this.initValidate);
      this.$emit('validation', this.validation)
    },
    beforeDestroy() {
      if (this.name) {
        document.removeEventListener(this.validateEventName, this.initValidate)
      }
      document.removeEventListener('validate', this.initValidate)
    },
    watch: {
      textareaValue(val) {
        this.$emit('validation', this.validation)
        if (this.maxCharacters) {
          this.notificationStr = `${val.length}/${this.maxCharacters}`
        }
      },
      initialTouched(value) {
        this.touched = value
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .ds-text-area {
    label {
      display: block;

      .ds-label-text {
        color: @color-dark;
        font-family: "Roboto Light";
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      textarea {
        .font-desktop-small-regular-dark();
        padding: 18px 16px;
        box-sizing: border-box;
        border: 1px solid @color-gray-300;
        border-radius: 4px;
        background-color: @color-white;
        width: 100%;
        resize: none;
        box-sizing: border-box;

        &::placeholder {
          color: @color-gray-400;
          font-family: Roboto, sans-serif;
          font-size: 14px;
          line-height: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &:focus:not(.ds-error) {
          border-color: @color-primary;
        }
        &:focus {
          outline: none;
        }

        &.ds-error {
          border-color: @color-red;
          background-color: #ffedec;
        }

        &.ds-valid {
          border-color: @color-primary;
          background-color: #e9f8f3;
        }
      }
    }

    .ds-textarea-errors-wraper {
      box-sizing: border-box;
      font-size: 11px;
      line-height: 12px;
      max-width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .ds-error-message {
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

      .ds-notification {
        .font-desktop-x-small-regular-gray();
        text-align: right;
        padding: 2px 0;
        flex-grow: 1;
        white-space: nowrap;
      }
    }
  }

</style>
