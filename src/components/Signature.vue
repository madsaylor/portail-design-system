<template>
  <div class="signature-wrapper">
    <div class="signature-pad-wrapper" @mouseup="mouseup" @mouseleave="mouseleave">
      <VueSignaturePad
        class="signature-pad"
        :width="signaturePadWidth"
        :height="signaturePadHeight"
        ref="signaturePad"
      />
    </div>
    <div class="clear-signature-wrapper">
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
      }
    },
    data: () => ({
      signatureData: undefined
    }),
    methods: {
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
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (this.value) {
          this.$refs.signaturePad.fromDataURL(this.value)
        }
      })
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
