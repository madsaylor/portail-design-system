<template>
  <Dialog
    :opened="opened"
    :borderColor="borderColor"
    @update:opened="updateOpenStatus"
  >
    <div
      class="ds-alert-wrapper"
      :style="getStyle"
    >
      <div class="ds-alert-header">
        {{ title }}
      </div>

      <div class="ds-alert-body">
        <slot name="ds-alert-content"></slot>
      </div>

      <div class="ds-alert-footer">
        <Button @click="updateOpenStatus(false)" alt>Got it</Button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from './Dialog'
import Button from './Button'

export default {
  name: 'alert-dialog',
  components: {Dialog, Button},
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    borderColor: {
      type: String,
      default: '#e6e7eb'
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
  },
  methods: {
    updateOpenStatus(status) {
      this.$emit('update:opened', status)
      this.$emit('accept', false)
    },
    acceptStatus() {
      this.$emit('update:opened', false)
      this.$emit('accept', true)
    }
  }
}
</script>

<style lang="less">
.ds-alert-wrapper {
  padding: 40px 40px 32px 40px;
  box-sizing: border-box;
  font-family: Lato;

  .ds-alert-header {
    font-size: 24px;
    line-height: 28px;
    color: #3F4352;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .ds-alert-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .ds-alert-body {
    margin-bottom: 32px;
    color: #3F4352;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
