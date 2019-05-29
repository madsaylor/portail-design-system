<template>
  <div class="signature-wrapper">
    <VueSignaturePad
      :width="signaturePadWidth"
      :height="signaturePadHeight"
      :custom-style="signaturePadStyleObject"
      ref="signaturePad"
    />
    <Button class="clear-signature-button"
            @click="clear">
      Clear
    </Button>
    <Button v-if="showSaveButton"
            class="save-signature-button"
            @click="save">
      Save
    </Button>
  </div>
</template>

<script>
  import Button from './Button'

  export default {
    name: 'Signature',
    components: {Button},
    props: {
      signaturePadWidth: {
        type: String,
        default: '570px'
      },
      signaturePadHeight: {
        type: String,
        default: '222px'
      },
      signaturePadStyleObject: {
        type: Object
      },
      showSaveButton: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      clear() {
        this.$refs.signaturePad.clearSignature()
        this.$emit('empty', this.$refs.signaturePad.saveSignature().isEmpty)
      },
      save() {
        const { isEmpty, data } = this.$refs.signaturePad.saveSignature()

        this.$emit('empty', isEmpty)
        this.$emit('save', data)
      }
    }
  }
</script>

<style lang="less">
  @import '../styles/vars';

  .signature-wrapper {
    display: inline-block;

    .clear-signature-button {
      position: relative;
      bottom: 55px;
      left: calc(100% - 100px);
      user-select: none;

      .button {
        background: @color-light-blue-100 !important;

        &.primary, &.alt, &.plain, &.link-ico {
          &:hover, &:focus, &:active  {
            background: @color-light-blue-100 !important;
          }
        }
      }
    }

    .save-signature-button {
      display: flex;
      justify-content: flex-end;
      user-select: none;

      .button {
        background: @color-light-blue-200 !important;

        &.primary, &.alt, &.plain, &.link-ico {
          &:hover, &:focus, &:active {
            background: darken(@color-light-blue-200, 10%) !important;
          }
        }
      }
    }
  }

</style>
