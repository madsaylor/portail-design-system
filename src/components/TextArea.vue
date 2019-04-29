<template>
  <div>
    <label>
      <div v-if="label">{{label}}</div>
      <textarea v-model="textareaValue" :placeholder="placeholder"></textarea>
    </label>
  </div>
</template>

<script>
  export default {
    name: "TextArea",
    props: {
      value: null,
      label: String,
      placeholder: String
    },
    computed: {
      textareaValue: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  div {
    label {
      color: @color-gray-500;
      font-size: 12px;
      line-height: 16px;
      font-family: Lato;
      margin-bottom: @textarea-label-margin-bottom;
    }

    textarea {
      width: 100%;
      height: 100%;
      font-size: 14px;
      line-height: 20px;
      font-family: Lato;
      padding: @textarea-textarea-padding;
      border: 1px solid @color-gray-200;
      border-radius: 2px;
      background-color: @color-white;
      overflow: hidden;
      resize: none;
    }
  }

</style>
