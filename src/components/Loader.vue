<template>
  <div :class="['loader', ...loaderWrapperClasses]" :style="{...backgroundColor}">
    <div :class="[...loaderClasses]"></div>
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
      }
    },
    computed: {
      backgroundColor() {
        return {
          backgroundColor: this.value ? `rgba(255, 255, 255, 0.${this.opacity})`: ''
        }
      },
      loaderClasses() {
        if (this.value) {
          return this.fullScreen ? 'base-loader' : 'mini-loader'
        } else {
          return ''
        }
      },
      loaderWrapperClasses() {
        let loaderWrapperClasses = []

        if (this.value) {
          if (this.fullScreen) {
            loaderWrapperClasses.push('full-screen')
            loaderWrapperClasses.push('ds-loader-wrapper')
          } else {
            loaderWrapperClasses.push('ds-loader-wrapper-mini')
          }
        }

        return loaderWrapperClasses
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .ds-loader-wrapper, .ds-loader-wrapper-mini {
    z-index: 5000;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .loader {
      z-index: 5001;
    }
  }

  .ds-loader-wrapper {
    position: fixed;

    .loader {
      position: fixed;
      margin: auto;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }

  .ds-loader-wrapper-mini {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .base-loader {
    width: 64px;
    height: 64px;
    background-image: url('../icons/portail-loader.gif');
  }

  .mini-loader {
    width: 32px;
    height: 32px;
    background-image: url('../icons/portail-loader-small.gif');
  }

  .full-screen {
    height: 100%;
    width: 100%;
  }
</style>
