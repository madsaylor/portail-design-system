<template>
  <div :class="['ds-calendar', {'ds-sm': sm, 'ds-md': md, 'ds-lg': lg, preventScroll: datepickerVisible}]" :style="{width}">
    <label>
      <div v-if="label" :id="id"
           @click="onInputPrevent($event, true)"
           :class="['ds-label-text', 'ds-slide-label-date', {'ds-slide-label': slideLabel, 'ds-label-focus': labelFocus},
                    slideActive ? 'ds-slide-label-active' : slideLabel ? 'ds-slide-label-inactive' : '']">
        {{ label }}
      </div>

      <Icon :size="iconSize"
            v-if="iconLeft"
            :color="iconColor"
            :source="iconLeft"
            :class="['ds-icon-left', {'active-icon': activeIcon}]"
            :padding="iconPadding"
            @click="onIconClick"
      />

      <input
        v-bind="inputAttrs"
        :class="['date', 'ds-has-icon', {
          'ds-slide-input': slideLabel,
          'ds-has-left-icon': iconLeft,
          'ds-text-right': textAlign === 'right'
        }]"
        v-model="inputValue"
        ref="input"
        :style="getStyle"
        @focus.prevent="inputFocus"
        @click.prevent="inputFocus"
        @blur="inputBlur"
        @mousedown="onInputPrevent($event)"/>

      <Icon :size="iconSize"
            :color="iconColor"
            :class="{'active-icon': activeIcon}"
            :source="'today'"
            :padding="iconPadding"
            @click="onIconClick"
      />
    </label>

    <Dropdown
      v-show="getDatepickerPosition !== 'modal'"
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
      v-show="getDatepickerPosition === 'modal'"
      :opened.sync="datepickerVisible"
      :borderColor="!isMobile && datepickerBorderColorDesktop"
      :datepickerContainer="isMobile"
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
  import Datepicker from './Datepicker'
  import Dropdown from './Dropdown'
  import Icon from './Icon'
  import Dialog from './Dialog'

  const DesktopWidth = 960

  export default {
    name: 'Calendar',
    components: {Datepicker, Dropdown, Icon, Dialog},
    props: {
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
      lang: String,
      lg: Boolean,
      md: Boolean,
      sm: Boolean,
      placeholder: String,
      value: null,
      datepickerBorderColorDesktop: String,
      datepickerBackgroundColor: String,
      datepickerBackdropOpacity: String,
      datepickerWrapperStyleObject: Object,
      slideLabel: Boolean,
      activeIcon: {
        type: Boolean,
        default: false
      },
      width: String,
      minDate: Date,
      maxDate: Date,
      dateRangeStart: Date,
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
      textAlign: {
        type: String,
        default: 'left'
      }
    },
    data: () => ({
      datepickerVisible: false,
      slideActive: undefined,
      labelFocus: undefined,
      windowWidth: window.innerWidth,
      positions: Array,
      id: Math.random().toString(36).substring(7)
    }),
    mounted() {
      if (this.datePositionChangeable) {
        this.positions = this.datepickerPosition.split(' ')
        window.addEventListener('resize', this.onResize)
      }

      setTimeout(() => this.slideInit(), 500)
    },
    computed: {
      overflowCheckStatus() {
        return this.getDatepickerPosition === 'modal' && this.datePositionChangeable
      },
      inputAttrs() {
        return {
          type: 'text',
          placeholder: this.placeholder
        }
      },
      locale() {
        if (this.$root === this) {
          return this.lang || 'fr-fr'
        }
        return this.lang || this.$root.locale || 'fr-fr'
      },
      inputValue: {
        get() {
          if (!this.value || isNaN(this.value)) {
            return ''
          }

          return this.value.toLocaleDateString(this.locale)
        },
        set(value) {
          // if (this.getType === 'ds-calendar') {
          //   return
          // }

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
          this.datepickerVisible = false
          this.$emit('input', value)
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
      onInputPrevent(event, callInputFocus) {
        event.preventDefault()
        if (callInputFocus) {
          this.inputFocus()
        }
      },
      inputFocus() {
        if (this.slideLabel) {
          this.labelFocus = true
          this.slideActive = true
        }

        this.datepickerVisible = !this.datepickerVisible
        this.$refs.input.blur()

        this.$emit('inputFocus')
      },
      inputBlur() {
        if (this.slideLabel) {
          this.labelFocus = false;

          if (!this.value) {
            this.slideActive = false;
          }
        }

        this.$emit('inputBlur')
      },
      slideInit() {
        if (this.slideLabel && this.value) {
          this.slideActive = true;
        }
      },
      onResize() {
        this.windowWidth = window.innerWidth
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
      onIconClick() {
        this.$emit('icon-click')
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
      if (this.datePositionChangeable) {
        window.removeEventListener('resize', this.onResize)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';
  @import '../styles/mixins';

  .ds-calendar {
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

    input {
      .font-desktop-small-regular-dark();
      padding: 7px 12px;
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

      &:focus {
        outline: none;
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

    input + .ds-icon {
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

    input {
      cursor: pointer;
    }

    &.ds-lg {
      input {
        .placeholder-font-size(16px);
        font-size: 16px;
      }
    }
  }
</style>

