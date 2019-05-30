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
      validators: Array,
      showErrors: {
        type: Boolean,
        default: true
      },
      initValidation: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      touched: false
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

        for (let i = 0; i < this.validation.length; i++) {
          if (!this.validation[i][1]) {
            errors.push(this.validators[i].message)
          }
        }

        return errors
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (this.initValidation) {
          this.initValidate()
        }
      })
    },
    watch: {
      textareaValue() {
        this.$emit('validation', this.validation)
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
        padding: 7px 12px;
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
