<template>
  <vue-dropzone :options="fileUploadOptions" id="file-upload" :useCustomSlot="true">
    <div v-if="files.length === 0 " class="dropzone-custom-content">
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

    <div v-else class="selected-files-wrapper">
      <div v-for="(file, index) in files" :key="index" class="file-wrapper">
        <img width="100" height="100" :src="file.dataURL" />
        <Icon source="close" color="#ddd" size="24px" @click.native="removeFile(file)" />
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
    title: String,
    files: Array
  },
  data() {
    return {
      mainOptions: {
        addedfile: (file) => {
          setTimeout(() => {
            this.$emit('addfile', file)
          }, 300)
        }
      },
    }
  },
  methods: {
    removeFile(file) {
      this.$emit('removefile', file)
    }
  },
  computed: {
    fileUploadOptions() {
      return { ...this.uploadOptions, ...this.mainOptions }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

#file-upload {
  position: relative;
  min-height: @file-upload-panel-height; 
  background-color: @color-gray-300;

  .dropzone-custom-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    .title {
      color: @color-dark;
      font-weight: @file-upload-title-weight;
      font-size: @file-upload-title-size;
      line-height: @fle-upload-line-height;
      margin-top: @file-upload-title-margin-top;
    }
  }

  .selected-files-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    .file-wrapper {
      margin-left: 10px;
      margin-right: 10px;
      position: relative;

      img {
        object-fit: cover;
      }

      .icon {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}

.dz-preview {
  display: none !important;
}
</style>
