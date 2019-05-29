<template>
  <div class="signature-wrapper">
    <div class="signature-pad-wrapper" @mousedown="clearPlaceholder" @mouseup="mouseup" @mouseleave="mouseleave">
      <VueSignaturePad
        class="signature-pad"
        :width="signaturePadWidth"
        :height="signaturePadHeight"
        ref="signaturePad"
      />
    </div>
    <div class="clear-signature-wrapper" v-if="!lockSignaturePad">
      <span class="clear-signature"
            @click="clear">
        Clear Signature
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Signature',
    props: {
      value: {
        type: String
      },
      signaturePadWidth: {
        type: String,
        default: '420px'
      },
      signaturePadHeight: {
        type: String,
        default: '158px'
      },
      lockSignaturePad: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      showPlaceholder : true,
      signatureData: undefined
    }),
    methods: {
      getSignaturePad() {
        let canvas = this.$refs.signaturePad.signaturePad._canvas
        let ctx = canvas.getContext('2d')

        return {canvas, ctx}
      },
      initSignature() {
        if (this.value) {
          this.$refs.signaturePad.fromDataURL(this.value)
        } else {
          let {canvas, ctx} = this.getSignaturePad()

          ctx.font = '500 18px Lato'
          ctx.fillStyle = '#babcc2'
          ctx.textAlign = 'center'
          ctx.fillText('START DRAWING WITH YOUR MOUSE', canvas.width / 2, canvas.height / 2)
        }
        this.checkLockSignaturePad(this.lockSignaturePad)
      },
      clearPlaceholder() {
        if (this.showPlaceholder && !this.value) {
          let {canvas, ctx} = this.getSignaturePad()
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          this.showPlaceholder = false
        }
      },
      clear() {
        this.$refs.signaturePad.clearSignature()
        this.$emit('empty', this.$refs.signaturePad.saveSignature().isEmpty)
      },
      mouseup() {
        this.emitMouseEvent('mouseup')
      },
      mouseleave() {
        this.emitMouseEvent('mouseleave')
      },
      emitMouseEvent(eventType) {
        const { isEmpty, data } = this.$refs.signaturePad.saveSignature()

        this.$emit('empty', isEmpty)
        if (!isEmpty && this.signatureData !== data) {
          this.signatureData = data
          this.$emit(eventType, data)
        }
      },
      checkLockSignaturePad(isLock) {
        if (isLock) {
          this.$refs.signaturePad.lockSignaturePad()
          this.showPlaceholder = false
        }
      }
    },
    watch: {
      lockSignaturePad(value) {
        this.checkLockSignaturePad(value)
      }
    },
    mounted() {
      this.$nextTick(() => this.initSignature())
    }
  }
</script>

<style lang="less">
  @import '../styles/vars';

  .signature-wrapper {
    display: inline-block;

    .signature-pad-wrapper {
      .signature-pad {
        border: 1px solid #e1e2e6;
        border-radius: 1px;
      }
    }

    .clear-signature-wrapper {
      display: flex;
      justify-content: flex-end;

      .clear-signature {
        height: 16px;
        width: 81px;
        color: @color-gray-500;
        font-family: Lato;
        font-size: 12px;
        line-height: 16px;
        margin-top: 8px;
        margin-right: 9px;
        cursor: pointer;
        user-select: none;
      }
    }
  }

</style>
