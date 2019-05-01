<template>
  <div>
    <label>
      <div class="label-text" v-if="label">{{label}}</div>
      <textarea
        v-model="textareaValue"
        :placeholder="placeholder"
        :name="name"
        :rows="rows"
      />
    </label>
  </div>
</template>

<script>
  export default {
    name: "TextArea",
    props: {
      value: null,
      label: String,
      placeholder: String,
      name: String,
      rows: Number
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
      display: block;
      position: relative;

      .label-text {
        .font-desktop-x-small-regular-gray();
        height: 16px;
        margin-bottom: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      textarea {
        .font-desktop-small-regular-dark();
        padding: 7px 12px;
        box-sizing: border-box;
        border: 1px solid @color-gray-300;
        border-radius: 2px;
        background-color: @color-white;
        width: 100%;
        resize: none;
        box-sizing: boder-box;

        &::placeholder {
          .font-desktop-small-regular-gray();
        }

        &:focus:not(.error) {
          border-color: @color-primary;
        }
        &:focus {
          outline: none;
        }
      }
    }
  }

</style>
