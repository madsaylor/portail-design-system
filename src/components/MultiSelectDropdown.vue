<template>
  <div class="ds-multi-select-dropdown-wrapper">
    <input :class="['ds-multi-select', {'ds-multi-select-error': checkError}]"
           type="text"
           ref="multiSelect"
           v-model="inputSelectValue"
           @click="changeListState"
           readonly="readonly"/>
    <Icon expand_more color="dark" class="ds-multi-select-icon"/>
    <div class="ds-multi-select-error-message-wrapper" v-if="checkError">
      {{multiSelectErrors[0]}}
    </div>
    <Dropdown :target="$refs.multiSelect"
              :opened.sync="dropDownListState"
              :position="dropDownPosition">

      <div class="ds-multi-select-dropdown-content">
        <div class="ds-checkbox-container-wrapper"
             v-for="(option, index) in options">

            <label class="ds-checkbox-container">
              <input class="ds-checkbox-input"
                     type="checkbox"
                     :value="idMode ? option.id : option.value"
                     v-model="multiSelectValue"/>
              <span class="ds-checkbox-text">{{ option.title }} {{ option.value }}</span>
              <span class="ds-checkbox-checkmark"></span>
            </label>
        </div>
      </div>
    </Dropdown>
  </div>
</template>

<script>
  import Dropdown from './Dropdown'
  import Icon from './Icon'

  export default {
    name: 'MultiSelectDropdown',
    components: {Dropdown, Icon},
    props: {
      value: null,
      options: Array,
      openDropDownList: {
        type: Boolean,
        default: false
      },
      dropDownPosition: {
        type: String,
        default: "default"
      },
      idMode: {
        type: Boolean,
        default: false
      },
      validators: Array,
      initValidation: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      inputSelectValue: undefined,
      touched: false
    }),
    computed: {
      multiSelectValue: {
        get() {
          this.validate()
          return this.value || []
        },
        set(value) {
          let deselectIndex = -1

          this.options.forEach((option) => {
            if (option.deselectAll) {
              deselectIndex = value.findIndex((val) => val === (this.idMode ? option.id : option.value))
            }
          })

          if (~deselectIndex) {
            if (deselectIndex === value.length - 1) {
              value = [value[deselectIndex]]
            } else {
              value.splice(deselectIndex, 1)
            }
          }

          this.touched = true
          this.inputSelectValue = this.calcInputSelectValue(value)
          this.$emit('input', value)
        }
      },
      dropDownListState: {
        get() {
          return this.openDropDownList
        },
        set(value) {
          this.$emit('update:open-drop-down-list', value)
        }
      },
      idValue() {
        if (this.idMode) {
          let idValueObj = {}
          this.options.forEach((option) => idValueObj[option.id] = option.value)
          return idValueObj
        } else {
          return null
        }
      },
      validation() {
        if (!this.validators || !this.validators.length) {
          return []
        }

        let data = []
        for (let i = 0; i < this.validators.length; i++) {
          data.push([
            this.validators[i].name,
            this.validators[i].validator(this.inputSelectValue),
          ])
        }

        return data
      },
      multiSelectErrors() {
        let errors = []

        for (let i = 0; i < this.validation.length; i++) {
          if (!this.validation[i][1]) {
            errors.push(this.validators[i].message)
          }
        }

        return errors
      },
      checkError() {
        return this.multiSelectErrors.length && this.touched
      }
    },
    methods: {
      changeListState() {
        this.dropDownListState = !this.dropDownListState
      },
      calcInputSelectValue(multiSelectValue) {
        return this.idMode ? Array.isArray(multiSelectValue) && multiSelectValue.map((value) => this.idValue[value]) :
                             multiSelectValue
      },
      validate() {
        if (this.initValidation || this.touched) {
          this.$emit('validation', this.validation)
        }
      },
    },
    mounted() {
      this.inputSelectValue = this.calcInputSelectValue(this.multiSelectValue)
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .ds-multi-select-dropdown-wrapper {

    .ds-multi-select {
      height: 30px;
      width: 250px;
      padding-right: 25px;
      border: none;
      border-bottom: 1px solid @color-gray-300;

      background-color: rgba(0,0,0,0);

      &:focus {
        outline: none;
        border-bottom: 1px solid @color-light-blue-200;
      }

      &.ds-multi-select-error {
        border-bottom: 1px solid @color-red;
      }
    }

    .ds-multi-select-icon {
      position: relative;
      top: -3px;
      left: -25px;
    }

    .ds-multi-select-error-message-wrapper {
      width: 275px;
      font-size: 12px;
      color: @color-red;
    }

    .ds-multi-select-dropdown-content {
      display: inline-block;
      border-radius: 2px;
      box-shadow: @card-shadow;
      padding: 15px;
      background: white;

      .ds-checkbox-container-wrapper {

        /* Customize the label (the ds-checkbox-container) */
        .ds-checkbox-container {
          display: block;
          position: relative;
          padding-left: 35px;
          margin-bottom: 12px;
          color: @color-dark;
          cursor: pointer;
          font-size: 22px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;

          /* Hide the browser's default checkbox */
          .ds-checkbox-input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;

            /* When the checkbox is checked, add a blue background */
            &:checked {
              ~ .ds-checkbox-checkmark {
                background-color: @color-light-blue-200;
                border-color: rgba(0, 0, 0, 0);

                /* Show the ds-checkbox-checkmark when checked and apply styles the ds-checkbox-checkmark/indicator */
                &:after {
                  display: block;
                  left: 6px;
                  top: 2px;
                  width: 5px;
                  height: 10px;
                  border: solid white;
                  border-width: 0 3px 3px 0;
                  -webkit-transform: rotate(45deg);
                  -ms-transform: rotate(45deg);
                  transform: rotate(45deg);
                }
              }

              ~ .ds-checkbox-text {
                color: @color-light-blue-200;
              }
            }
          }

          /* Create a custom checkbox */
          .ds-checkbox-checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 20px;
            width: 20px;
            border: 2px solid @color-gray-500;
            border-radius: 2px;
            background-color: @color-white;

            /* Create the ds-checkbox-checkmark/indicator (hidden when not checked) */
            &:after {
              content: "";
              position: absolute;
              display: none;
            }
          }

          .ds-checkbox-text {
            font-size: 16px;
          }
        }

        &:hover {
          background-color: @color-gray-200;
        }
      }
    }
  }
</style>
