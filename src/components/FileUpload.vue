<template>
  <vue-dropzone :options="uploadOptions" id="file-upload" :useCustomSlot="true">
    <div class="dropzone-custom-content">
      <div class="icon-wrapper">
        <Icon
          v-if="icon"
          :source="icon"
          :size="iconSize"
        />
      </div>

      <div class="title">
        {{title}}
      </div>
    </div>
  </vue-dropzone>
</template>

<script>
import Icon from './Icon.vue'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: "FileUpload",
  components: {
    vueDropzone: vue2Dropzone,
    Icon
  },
  props: {
    uploadOptions: Object,
    icon: String,
    iconSize: String,
    title: String
  }
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

#file-upload {
  position: relative;
  background-color: @color-gray-300;

  .dropzone-custom-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    .title {
      color: @color-dark;
    }
  }
}
</style>
