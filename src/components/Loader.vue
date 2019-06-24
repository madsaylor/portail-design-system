<template>
    <div v-if="value"
        :class="['loader-wrapper', {'full-screen': fullScreen}]"
        :style="{...positionStyle, opacity: `0.${opacity}`}">
      <div :class="['loader', fullScreen ? 'base-loader' : 'small-loader']"></div>
    </div>
</template>

<script>
  export default {
    name: 'Loader',
    props: {
      value: Boolean,
      fullScreen: {
        type: Boolean,
        default: false
      },
      opacity: {
        type: Number,
        default: 80
      },
      target: null
    },
    data: () => ({
      availableTarget: undefined,
      targetWidth: undefined,
      targetHeight: undefined,
      targetX: undefined,
      targetY: undefined
    }),
    methods: {
      getLoaderRect() {
        let loader =  document.getElementsByClassName('loader')
        if (loader && loader[0]) {
          return loader[0].getBoundingClientRect()
        }
      },
      onResizeScroll() {
        this.calculateTargetSize()
      },
      calculateTargetSize() {
        if (this.value && this.targetElement) {
          let target = this.targetElement.getBoundingClientRect()

          this.targetWidth = target.width
          this.targetHeight = target.height
          this.targetX = target.x
          this.targetY = target.y
        }
      }
    },
    computed: {
      targetElement() {
        let element = this.availableTarget

        if (element == null) {
          return
        }

        if (element.length) {
          element = element[0]
        }

        if (element.$el) {
          element = element.$el
        }

        if (typeof element === 'string') {
          element = document.querySelector(element)
        }

        return element
      },
      positionStyle() {
        let positionStyle = {}

        if (!this.fullScreen && this.targetWidth && this.targetHeight) {
          let loader = this.getLoaderRect()
          positionStyle = {
            left: `${(this.targetWidth / 2 - loader.width / 2) + this.targetX}px`,
            top: `${(this.targetHeight / 2 - loader.height / 2) + this.targetY}px`
          }
        }

        return positionStyle
      }
    },
    watch: {
      targetElement() {
        this.calculateTargetSize()
      }
    },
    updated() {
      this.availableTarget = this.target
    },
    mounted() {
      if (!this.fullScreen) {
        window.addEventListener('resize', this.onResizeScroll)
        window.addEventListener('scroll', this.onResizeScroll)
      }
    },
    beforeDestroy() {
      if (!this.fullScreen) {
        window.removeEventListener('resize', this.onResizeScroll)
        window.removeEventListener('scroll', this.onResizeScroll)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .loader-wrapper {
    background-color: @color-white;
    z-index: 5000;
    position: fixed;
    top: 0;
    left: 0;

    .loader {
      z-index: 5001;
      position: fixed;

    }

    .base-loader {
      margin: auto;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 64px;
      height: 64px;
      background-image: url('../icons/portail-loader.gif');
    }

    .small-loader {
      width: 32px;
      height: 32px;
      background-image: url('../icons/portail-loader-small.gif');
    }
  }

  .full-screen {
    height: 100%;
    width: 100%;
  }
</style>
