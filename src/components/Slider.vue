<template>
  <div class="ds-slider"
       :style="{width, height}">
    <div class="ds-slider-header">
      <span class="ds-slider-title">{{header}}</span>
      <div class="ds-title-header-controls">
        <Icon angle_left_solid
              size="18px"
              color="gray-500"
              class="ds-slider-control-left"
              @click="changeSlide(-1)">
        </Icon>
        <Icon angle_right_solid
              size="18px"
              color="gray-500"
              class="ds-slider-control-right"
              @click="changeSlide(1)">
        </Icon>
      </div>
    </div>
    <div class="ds-slider-body" >
      <div :class="{'slide-active': slideActive}">
        <slot :name="activeSlider"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from './Icon'

  export default {
    name: 'Slider',
    components: {
      Icon
    },
    props: {
      header: String,
      width: String,
      height: String,
      startIndex: Number,
    },
    data: () => ({
      slideActive: false
    }),
    computed: {
      activeSlider() {
        return `slider-${this.startIndex}`
      },
      sliderStartIndex: {
        get() {
          return this.startIndex
        },
        set(value) {
          this.$emit('update:startIndex', value)
        }
      }
    },
    methods: {
      changeSlide(value) {
        let nextSlideIndex = this.sliderStartIndex + value
        let slideCount = Object.keys(this.$slots).length

        if (slideCount) {
          this.slideActive = true

          setTimeout(() => {
            this.slideActive = false

            if (nextSlideIndex < 1) {
              this.sliderStartIndex = slideCount
            } else if (nextSlideIndex > slideCount) {
              this.sliderStartIndex = 1
            } else {
              this.sliderStartIndex += value
            }
          }, 200)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .ds-slider {
    background-color: @color-white;
    overflow: hidden;

    .ds-slider-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      padding: 0 23px;
      position: relative;
      border-bottom: 1px solid @color-gray-200;

      .ds-slider-title {
        height: 19px;
        color: @color-dark;
        font-family: Roboto, sans-serif;
        font-size: 16px;
        letter-spacing: 0.2px;
        line-height: 19px;
        cursor: default;
      }

      .ds-title-header-controls {
        position: absolute;
        right: 23px;
        top: 21px;

        .ds-slider-control-left {
          padding-right: 14px;
        }

        .ds-slider-control-left,
        .ds-slider-control-right {
          cursor: pointer;
        }
      }
    }

    .ds-slider-body {
      @keyframes slider {
        0% { transform: translateX(0); }
        25% { transform: translateX(25%); }
        50% { transform: translateX(50%); }
        75% { transform: translateX(75%); }
        100% { transform: translateX(100%); }
      }

      .slide-active {
        animation-name:slider;
        animation-duration:0.2s;
        animation-timing-function: ease-in-out;
        animation-iteration-count:infinite;
      }
    }
  }
</style>
