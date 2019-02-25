<!--
  Dropdown that can hold different things

  Usage:

    <Dropdown
      :target="myButton"      - Element to dropdown next to
      :position="'top-left'"  - Where to open relative to the target
      :opened="menuOpened"    - Is dropdown opened
      :just-fade-in="true"    - Change the enter animation to just fade in
      :just-fade-out="true"   - Change the leave animation to just fade out
      :just-fade="true"       - Change both
    >
      Dropdown content...
    </Dropdown>

  Properties:

    target - DOM element or CSS selector string. Element, next to which, a
      dropdown should be opened (usually the element that triggers open)

    position - String. Where dropdown should be placed relatively to the
      target. Formated as 'primaryAlignment-secondaryAlignment':

                  top-left      top-middle     top-right
                    +--------------------------------+
                    |       |                |       |
                    |       |                |       |
      left-top      |       |                |       |     right-top
       +------------------+ |                | +------------------+
       |            |     | |                | |     |            |
       |            |     | |                | |     |            |
       |            |     | |                | |     |            |
       |            +--------------------------------+            |
       +------------------+ +----------------+ +------------------+
       |                  | |                | |                  |
      left-center         | |     Target     | |        right-center
       |                  | |                | |                  |
       +------------------+ +----------------+ +------------------+
       |            +--------------------------------+            |
       |            |     | |                | |     |            |
       |            |     | |                | |     |            |
       |            |     | |                | |     |            |
       +------------------+ |                | +------------------+
      left-bottom   |       |                |       |   right-bottom
                    |       |                |       |
                    |       |                |       |
                    +--------------------------------+
                bottom-left   bottom-middle   bottom-right

    opened - Boolean. Is dropdown shown. Supports .sync modifier that
      lets the component close itself (when user clicks outside)
-->

<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div v-if="opened" class="dropdown" :style="{
      ...positionStyle,
      transition: `
        transform ${transitionTime}ms ease-out,
        opacity ${transitionTime}ms ease-out
      `,
    }">
      <div ref="dropdownContent">
        <slot>
          <div class="example-menu">
            Example Menu
          </div>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    target: null,
    justFade: Boolean,
    justFadeIn: Boolean,
    justFadeOut: Boolean,
    position: {
      type: String,
      validator(value) {
        return [
          'top-left',    'top-middle',    'top-right',
          'left-top',                     'right-top',
          'left-center',                  'right-center',
          'left-bottom',                  'right-bottom',
          'bottom-left', 'bottom-middle', 'bottom-right',
        ].indexOf(value) !== -1
      },
      default: 'bottom-right',
    },
    opened: Boolean,
  },
  data: () => ({
    transitionTime: 100,
    contentRect: null,
    targetRect: null,
    offsetParent: null,
  }),
  computed: {
    /**
     * Target element to "attach" the component to
     */
    targetElement() {
      let element = this.target

      if (element == null) {
        return
      }

      if (element.length) {
        element = element[0]
      }

      if (element.$el) {
        element = element.$el
      }

      if (typeof element === "string") {
        element = document.querySelector(element)
      }

      return element
    },
    /**
     * Style vars for absolute position of the component
     */
    positionStyle() {
      if (this.contentRect == null || this.targetRect == null) {
        return {position: 'absolute'}
      }
      // Get a fresh targetRect in case the window got scrolled
      // after the last update
      let targetRect = this.targetElement.getBoundingClientRect()
      let left = targetRect.left + window.pageXOffset
      let top = targetRect.top + window.pageYOffset

      let targetHeight = this.targetRect.height
      let targetWidth = this.targetRect.width
      let contentHeight = this.contentRect.height
      let contentWidth = this.contentRect.width

      let margin = 4
      let [primaryAlignment, secondaryAlignment] = this.position.split('-')

      switch (primaryAlignment) {
        case 'top':
          top -= contentHeight + margin
          break
        case 'left':
          left -= contentWidth + margin
          break
        case 'right':
          left += targetWidth + margin
          break
        case 'bottom':
          top += targetHeight + margin
      }

      switch (secondaryAlignment) {
        case 'left':
          left -= contentWidth - targetWidth
          break
        case 'middle':
          left -= (contentWidth - targetWidth) / 2
          break
        case 'right':
          break
        case 'top':
          top -= contentHeight - targetHeight
          break
        case 'center':
          top -= (contentHeight - targetHeight) / 2
          break
        case 'bottom':
      }

      // Offset for non-static-positioned parents if needed
      let el = this.offsetParent
      while (el) {
        left -= el.offsetLeft
        top -= el.offsetTop
        el = el.offsetParent
      }

      return {
        position: 'absolute',
        left: left + 'px',
        top: top + 'px',
        'z-index': 2,
      }
    },
    /**
     * 2D transformation matrix for CSS transform parameter
     */
    transformationMatrix() {
      if (this.contentRect == null || this.targetRect == null) {
        return 'matrix(1, 0, 0, 1, 0, 0)'
      }

      let targetWidth = this.targetRect.width
      let targetHeight = this.targetRect.height
      let contentWidth = this.contentRect.width
      let contentHeight = this.contentRect.height

      let scaleX = targetWidth / contentWidth
      let scaleY = targetHeight / contentHeight

      let translateX = (
        this.targetRect.left - this.contentRect.left -
        contentWidth / 2 + targetWidth / 2
      )
      let translateY = (
        this.targetRect.top - this.contentRect.top -
        contentHeight / 2 + targetHeight / 2
      )

      return `matrix(
        ${scaleX}, ${0},
        ${0}, ${scaleY},
        ${translateX}, ${translateY}
      )`
    },
  },
  methods: {
    /**
     * Transition methods:
     * For enter transition we first render an invisible dropdown to get
     * content's height, width and .offsetParent for positioning
     */
    beforeEnter(el) {
      el.style.opacity = '0'
    },

    enter(el, done) {
      this.offsetParent = el.offsetParent
      this.targetRect = this.targetElement.getBoundingClientRect()
      this.contentRect = this.$refs.dropdownContent.getBoundingClientRect()

      setTimeout(done, this.transitionTime)

      // The timeout and the second contentRect assignment below aren't
      // generally needed by fix the slightly off first-time opening animation
      setTimeout(() => {
        this.contentRect = this.$refs.dropdownContent.getBoundingClientRect()
        if (this.justFade || this.justFadeIn) {
          el.style.opacity = '1'
          return
        }

        el.style.transform = this.transformationMatrix
        el.style.display = 'none'

        el.offsetHeight  // Forcing layout update

        el.style.display = 'block'

        el.offsetHeight  // Forcing layout update

        el.style.transform = 'none'
        el.style.opacity = '1'
      }, 0)
    },

    leave(el, done) {
      this.targetRect = this.targetElement.getBoundingClientRect()
      this.contentRect = this.$refs.dropdownContent.getBoundingClientRect()

      setTimeout(done, this.transitionTime)

      if (this.justFade || this.justFadeOut) {
        el.style.opacity = '0'
        return
      }

      el.style.transform = this.transformationMatrix
      el.style.opacity = '0'
    },

    /**
     * Close dropdown on an outside click
     */
    outsideClick(event) {
      let el = event.target
      while (el.parentNode) {
        if (el === this.$el || el === this.targetElement) {
          return
        }
        el = el.parentNode
      }
      this.$emit('update:opened', false)
    },
  },
  mounted() {
    document.addEventListener('click', this.outsideClick, true)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.outsideClick, true)
  },
}
</script>
