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
      <div
        class="dialog-content"
      >
        <slot></slot>
      </div>

  </section>
</template>

<script>
  export default {
    name: "Dialog",

    props: {
      opened: Boolean,
      backdropOpacity: {
        type: String,
        default: '0.6'
      },
    },

    mounted() {
      document.addEventListener('keydown', this.escapePress)
      document.addEventListener('keydown', this.tabPress, true)
    },

    directives: {
      moveToBody: {
        inserted: function (el) {
          document.body.appendChild(el)
          document.body.style.overflow = 'hidden';
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
        document.body.style.overflow = 'auto';
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
          document.body.style.overflow = 'auto';
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
    },
    beforeDestroy() {
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
      border-radius: 4px;
      background-color: white;
    }

  }

</style>
