<template>
  <div class="ds-chips-wrapper">
    <div :class="['ds-chips-container', {'ds-chips-container-active': active, 'ds-chips-container-error': error}]">
      <div v-if="label"
           :class="['ds-chips-label', {'ds-chips-label-active': active, 'ds-chips-label-error': error}]">
        {{label}}
      </div>

      <span class="ds-chips"
            tabindex="0"
            @focus="onFocusChips(index)"
            @blur="onBlurChips(index)"
            :key="index"
            v-for="(title, index) in valueWrapper">

        <span class="ds-chip-title">
          {{title}}
        </span>

        <Icon :class="['ds-chips-icon', {'ds-chips-icon-selected': index === selectedChips}]"
              close
              :color="getIconColor"
              v-if="removable"
              @click="onRemove(index)">
        </Icon>
    </span>

      <input class="ds-chips-input"
             v-bind="inputAttrs"
             type="text"
             v-model="newChip"
             @focus="onFocusInput"
             @blur="onBlurInput"
             @keypress="onKeyPress"/>
    </div>
    <div v-if="error" class="ds-chips-errors">
        <span v-if="error" class="ds-error-message">
          {{ inputErrors[0] }}
        </span>
    </div>
  </div>
</template>

<script>
  import Icon from './Icon'

  export default {
    name: 'Chips',
    components: {Icon},
    props: {
      value: null,
      label: String,
      placeholder: String,
      removable: Boolean,
      validators: Array,
      showErrors: {
        type: Boolean,
        default: true
      }
    },
    data: () => ({
      selectedChips: -1,
      newChip: '',
      active: false,
      touched: false
    }),
    methods: {
      onFocusChips(index) {
        this.selectedChips = index
      },
      onBlurChips() {
        this.selectedChips = -1
      },
      onFocusInput() {
        this.active = true
      },
      onBlurInput() {
        this.touched = true
        this.active = false
        this.addNewChip()
      },
      setTouchEmitValidation() {
        this.touched = true
        this.$emit('validation', this.validation)
      },
      onRemove(index) {
        this.valueWrapper.splice(index, 1)
        this.setTouchEmitValidation()
      },
      onKeyPress(event) {
        event = event ? event : window.event
        let charCode = event.which ? event.which : event.keyCode

        if (charCode === 32 || charCode === 13) {
          event.preventDefault()
          this.addNewChip()
        }
      },
      addNewChip() {
        if (this.newChip) {
          this.valueWrapper = this.valueWrapper.concat(this.newChip)
          this.newChip = ''
          this.setTouchEmitValidation()
        }
      },
      validate() {
        this.setTouchEmitValidation()
      }
    },
    computed: {
      error() {
        return this.inputErrors.length && this.touched && this.showErrors
      },
      validation() {
        if (!this.validators || !this.validators.length) {
          return []
        }

        let data = []

        let requiredValidatorIndex = this.validators.findIndex((validator) => validator.name === 'required')

        if (~requiredValidatorIndex) {
          data.push([
            this.validators[requiredValidatorIndex].name,
            this.validators[requiredValidatorIndex].validator(this.valueWrapper),
            this.validators[requiredValidatorIndex].message
          ])
        }

        for (let i = 0; i < this.validators.length; i++) {

          let invalid = false
          for (let j = 0; j < this.valueWrapper.length; j++) {

            if (!invalid && !this.validators[i].validator(this.valueWrapper[j])
                && this.validators[i].name !== 'required') {

              data.push([
                this.validators[i].name,
                this.validators[i].validator(this.valueWrapper[j]),
                this.validators[i].message
              ])
              invalid = true
            }
          }
        }

        return data
      },
      inputErrors() {
        let errors = []

        for (let i = 0; i < this.validation.length; i++) {
          if (!this.validation[i][1]) {
            errors.push(this.validation[i][2])
          }
        }

        return errors
      },
      valueWrapper: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      },
      inputAttrs() {
        return {
          placeholder: this.placeholder
        }
      },
      getIconColor() {
        return '#98A9BC'
      }
    },
    mounted() {
      document.addEventListener('validate', this.validate)
      this.$emit('validation', this.validation)
    },
    beforeDestroy() {
      document.removeEventListener('validate', this.validate)
    }
  }
</script>

<style lang="less">
  @import '../styles/vars';

  .ds-chips-wrapper {

    .ds-chips-container {
      cursor: text;
      padding-bottom: 5px;
      border: solid 1px #E8ECEF;
      border-radius: 3px;
      padding: 0 10px;
      background-color: white;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      height: 42px;

      .ds-chips-label {
        color: @color-gray-500;
        font-family: Lato, Arial, Helvetica, sans-serif;
        font-size: 12px;
        cursor: default;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;


        &.ds-chips-label-active {
          // color: @color-primary;
        }

        &.ds-chips-label-error {
          color: @color-red;
        }
      }

      .ds-chips {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: default;
        padding: 4px 8px 4px 10px;
        margin: 4px 10px 4px 0;
        border-radius: 2px;
        background-color: @color-gray-300;
        color: @color-gray-500;

        .ds-chip-title {
          font-size: 16px;
          font-family: Roboto, "Helvetica Neue", sans-serif;
        }

        .ds-chips-icon {
          vertical-align: middle;
          cursor: pointer;

          &.ds-chips-icon-selected {
            fill: @color-white !important;
          }
        }

        &:focus {
          color: @color-white;
          outline: none;
        }
      }

      .ds-chips-input {
        padding: 12px 0 12px;
        border: none;
        background-color: transparent;
        flex-grow: 1;
        flex-shrink: 0;
        width: 30px;
        font-size: 14px;
        color: @color-dark;

        &:focus {
          outline: none;
        }
      }

      &.ds-chips-container-active {
        border: solid 1px @color-primary;
      }

      &.ds-chips-container-error {
        border: solid 1px @color-red;
      }
    }

    .ds-chips-errors {
      font-size: 12px;
      color: @color-red;
    }
  }
</style>
