<template>
  <Dialog
    :opened="opened"
    :borderColor="borderColor"
    :clickOutsideToClose="clickOutsideToClose"
    @update:opened="updateOpenStatus"
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
        <Button @click="updateOpenStatus(false)" alt>{{ rejectLabel | dsTranslate }}</Button>
        <Button @click="acceptStatus">{{ acceptLabel | dsTranslate }}</Button>
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
      default: '#e6e7eb'
    },
    width: {
      type: String,
      default: '544px'
    },
    title: String,
    clickOutsideToClose: {
      type: Boolean,
      default: true
    },
    acceptLabel: {
      type: String,
      default: 'Accept'
    },
    rejectLabel: {
      type: String,
      default: 'Cancel'
    }
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
.ds-confirm-wrapper {
  padding: 40px 40px 32px 40px;
  box-sizing: border-box;
  font-family: Lato;

  .ds-confirm-header {
    font-size: 24px;
    line-height: 28px;
    color: #3F4352;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .ds-confirm-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .ds-button-link-wrapper {
      margin-left: 16px;
    }
  }

  .ds-confirm-body {
    margin-bottom: 32px;
    color: #3F4352;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
