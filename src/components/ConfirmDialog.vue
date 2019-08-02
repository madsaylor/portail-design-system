<template>
  <Dialog
    :opened.sync="opened"
    :borderColor="borderColor"
  >
    <div
      class="ds-confirm-wrapper"
      :style="getStyle"
    >
      <div class="ds-confirm-header">
        {{ title }}
      </div>

      <div class="ds-confirm-body">
        <slot name="ds-confirm-content"></slot>
      </div>

      <div class="ds-confirm-footer">
        <Button>Cancel</Button>
        <Button>Accept</Button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from './Dialog'
import Button from './Button'

export default {
  name: 'confirm-dialog',
  components: {Dialog, Button},
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    borderColor: {
      type: String,
      default: '#eeeeee'
    },
    width: {
      type: String,
      default: '544px'
    },
    title: String
  },
  computed: {
    getStyle() {
      const style = {}
      style.width = this.width
      return style
    }
  }
}
</script>

<style lang="less">
.ds-confirm-wrapper {
  padding: 32px 40px;
}
</style>
