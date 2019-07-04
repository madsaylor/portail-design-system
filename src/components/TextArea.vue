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
  <div>
    <label>
      <div class="label-text" v-if="label">{{label}}</div>
      <textarea
        v-model="textareaValue"
        :placeholder="placeholder"
        :name="name"
        :rows="rows"
        :class="{'error': textareaErrors.length && touched && showErrors}"
        @blur="onBlur"
      />
      <div class="notification">{{ notificationStr }}</div>
    </label>
    <div class="textarea-errors-wraper">
        <span v-if="textareaErrors.length && touched && showErrors" class="error-message">
          {{ textareaErrors[0] }}
        </span>
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
      maxCharacters: {
        type: Number,
        default: 200
      },
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
      notificationStr: ''
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
          return this.value
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

        if (this.textareaValue && this.textareaValue.length > this.maxCharacters) {
          errors.push(`You can input less than ${this.maxCharacters} charactors`)
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
      this.notificationStr = `You can input less than ${this.maxCharacters} charactors`

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
      textareaValue() {
        this.$emit('validation', this.validation)
      },
      initialTouched(value) {
        this.touched = value
      },
      value(val) {
        this.notificationStr = `${this.maxCharacters - val.length} characters are left`
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  div {
    label {
      display: block;
      position: relative;

      .label-text {
        .font-desktop-x-small-regular-gray();
        height: 16px;
        margin-bottom: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      textarea {
        .font-desktop-small-regular-dark();
        padding: 7px 12px 20px 12px;
        box-sizing: border-box;
        border: 1px solid @color-gray-300;
        border-radius: 2px;
        background-color: @color-white;
        width: 100%;
        resize: none;
        box-sizing: border-box;

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
      }

      .notification {
        .font-desktop-x-small-regular-gray();
        position: absolute;
        bottom: 10px;
        right: 10px;
      }
    }

    .textarea-errors-wraper {
      box-sizing: border-box;
      font-size: 11px;
      line-height: 12px;
      padding: 3px 0;
      position: absolute;
      max-width: 100%;

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
    }
  }

</style>
