<!--
  FileUplaod with showing an icon and title

  Usage:

  <FileUpload
    :icon="icon"                      - Show Icon on the drop panel
    :iconSize="iconSize"              - Size of the Icon
    :title="title"                    - Show title on the drop panel
    :uploadOptions="uploadOptions"    - Upload options including the url of post, object consist from next fields:
                                          url             - Url of the destination server
                                          acceptedFiles   - Type of upload files, it can be separated by comman if it has multiple types
                                          addRemoveLinks  - Enable remove button on the thumbnail screen

    :files="files"                    - Array of selected files
    :preview="preview"                - If this property is true, Show preview images, default value is true
    @addfile                          - Return the file to add
    @removefile                       - Return the file to remove
    @invalidfile                      - Triggered when file is invalid
  />
-->

<template>
  <vue-dropzone :options="fileUploadOptions" id="file-upload" :useCustomSlot="true">
    <div v-if="files.length === 0 || !preview " class="dropzone-custom-content">
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
    files: Array,
    preview: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      mainOptions: {
        addedfile: (file) => {
          if (this.files.find(f => f.name === file.name) > 0) {
            this.$emit('invalidfile', 'This file is already selected')
            return
          }

          if (!this.fileTypeCheck(file)) {
            this.$emit('invalidfile', 'Invalid file type')
            return
          }

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
    },
    fileTypeCheck(file) {
      if (file.type === this.uploadOptions.acceptedFiles) {
        return true
      }

      if (this.uploadOptions.acceptedFiles === "*") {
        return true
      }

      if (this.uploadOptions.acceptedFiles.includes("/*")) {
        const type = this.uploadOptions.acceptedFiles.replace("/*", '')
        if (file.type.includes(type)) {
          return true
        }
      }

      return false
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
