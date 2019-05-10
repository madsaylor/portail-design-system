<template>
  <section
    v-if="opened"
    v-move-to-body
    class="dialog"

  >
    <div
      class="backdrop"
      :style="{opacity: backdropOpacity}"
      @click="backdropClick()"
      @keydown="e => escapePress(e)"
    ></div>
      <div :class="['dialog-content', {'border-content': borderColor, 'full-screen-content': fullScreen, 'full-screen-active-content': fullScreenActive}]"
           :style="{borderColor}">
        <div class="dialog-wrapper">
          <slot></slot>
        </div>
      </div>

  </section>
</template>

<script>
  const widthMD = 1280;

  export default {
    name: "Dialog",
    props: {
      opened: Boolean,
      backdropOpacity: {
        type: String,
        default: '0.6'
      },
      fullScreen: {
        type: Boolean,
        default: false
      },
      borderColor: String
    },
    data: () => ({
      windowWidth: window.innerWidth
    }),
    mounted() {
      window.addEventListener('resize', this.onResize)
      document.addEventListener('keydown', this.escapePress)
      document.addEventListener('keydown', this.tabPress, true)
    },

    directives: {
      moveToBody: {
        inserted: function (el) {
          document.body.appendChild(el)
        },
        unbind: function (el) {
          if(el.parentNode) {
            el.parentNode.removeChild(el);
          }
        }
      },
    },

    methods: {
      backdropClick() {
        this.$emit('update:opened', false)
      },
      /**
       * Check if the dropdown iteself or the target element have/are
       * the specified element
       */
      hasElement(el) {
        while (el.parentNode) {
          if (el === this.$el || el === this.targetElement) {
            return true
          }

          el = el.parentNode
        }
        return false
      },
      /**
       * Close dropdown when the Escape key is pressed
       */
      escapePress(event) {
        if (this.opened && event.code === "Escape") {
          this.$emit('update:opened', false)
        }
      },

      /**
       * When the dropdown is opened, only focus within it through TAB
       */
      tabPress(event) {
        if (!this.opened || event.code !== "Tab") {
          return
        }

        if (
          this.hasElement(document.activeElement) &&
          !document.activeElement.classList.contains('focus-trap')
        ) {
          return
        }

        event.preventDefault()

        let focusableQuery = `
        a[href]:not([tabindex='-1']),
        area[href]:not([tabindex='-1']),
        input:not([disabled]):not([tabindex='-1']),
        select:not([disabled]):not([tabindex='-1']),
        textarea:not([disabled]):not([tabindex='-1']),
        button:not([disabled]):not([tabindex='-1']),
        iframe:not([tabindex='-1']),
        [tabindex]:not([tabindex='-1']):not(.focus-trap),
        [contentEditable=true]:not([tabindex='-1'])
      `;
        let focusableElements = this.$el.querySelectorAll(focusableQuery)

        if (!focusableElements.length) {
          document.activeElement.blur()
          return
        }
        if (event.shiftKey) {
          focusableElements[focusableElements.length - 1].focus()
        }
        else {
          focusableElements[0].focus()
        }
      },
      onResize() {
        this.windowWidth = window.innerWidth
      }
    },
    computed: {
      fullScreenActive() {
        return this.fullScreen && widthMD >= this.windowWidth
      }
    },
    watch: {
      opened(value) {
        value ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize)
      document.removeEventListener('keydown', this.escapePress);
      document.removeEventListener('keydown', this.tabPress, true)
    },
  }
</script>

<style lang="less" scoped>
  @import "../styles/vars";

  .dialog {
    position: fixed;
    display: flex;
    -ms-flex: 1 0 auto;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 900;
    top: 0;

    .backdrop {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      z-index: 900;
      background-color: #000;
    }

    .dialog-content {
      width: auto;
      z-index: 1000;
      background-color: white;
      border-radius: 4px;
      height: auto;
      max-height: calc(100% - 128px);
      max-width: 1280px;

      .dialog-wrapper {
        height:100%;
        display: inline-flex;
        flex-direction: column;

        .dialog-header:not(:empty) {
          .font-desktop-h-3-dark-center();
          padding: 16px;
          box-sizing: border-box;
          background-color: @color-white;
          box-shadow: inset 0 -1px 0 0 @color-gray-300;
        }
        @media @screen-medium, @screen-small {
          .dialog-header:not(:empty) {
            padding: 12px;
          }
        }

        .dialog-body {
          overflow: auto;
        }
      }
    }

    .border-content {
      border-style: solid;
      border-width: 1px;
    }

    .full-screen-content {
      display: block;
      width: 1280px;
      height: 800px;
      max-height: 100%;
      max-width:1280px;

      .dialog-content {
        flex-grow: 1;
      }
    }

    .full-screen-active-content {
      width: 100% !important;
      height: 100% !important;
    }
  }

</style>
