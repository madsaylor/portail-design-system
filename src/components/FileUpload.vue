<!--
  FileUplaod with showing an icon and title

  Usage:

  <FileUpload
    :icon="icon"                      - Show Icon on the drop panel
    :iconSize="iconSize"              - Size of the Icon
    :title="title"                    - Show title on the drop panel
    :files="files"                    - Array of selected files
    :preview="preview"                - If this property is true, Show preview images, default value is true
    :showErrors="true"                - If this property is true, Show errors under the Image, default value is true
    :validators:="validators"         - Input file validation
    @addfile                          - Return the file to add
    @removefile                       - Return the file to remove
    @validation                       - Return validation status
  />
-->

<template>
  <div class="ds-upload-wrapper">
    <vue-dropzone v-if="multiple" :options="fileUploadOptions" id="ds-file-upload" :useCustomSlot="true">
      <div v-if="files.length === 0 || !preview " class="ds-dropzone-custom-content">
        <div class="ds-icon-wrapper">
          <Icon
            v-if="icon"
            :source="icon"
            :size="iconSize"
          />
        </div>

        <div class="ds-title">
          {{title}}
        </div>
      </div>

      <div v-else class="ds-selected-files-wrapper">
        <div v-for="(f, index) in files" :key="index" class="ds-file-wrapper">
          <img width="100" height="100" :src="f.dataURL" />
          <Icon source="close" color="#ddd" size="24px" @click.native="removeFile(f)" />
        </div>
      </div>
    </vue-dropzone>

    <vue-dropzone v-else :options="fileUploadOptions" id="ds-file-upload" :useCustomSlot="true">
      <div v-if="!file || !preview " class="ds-dropzone-custom-content">
        <div class="ds-icon-wrapper">
          <Icon
            v-if="icon"
            :source="icon"
            :size="iconSize"
          />
        </div>

        <div class="ds-title">
          {{title}}
        </div>
      </div>

      <div v-else class="ds-selected-files-wrapper">
        <div class="ds-file-wrapper">
          <img width="100" height="100" :src="file.dataURL" />
          <Icon source="close" color="#ddd" size="24px" @click.native="removeFile(file)" />
        </div>
      </div>
    </vue-dropzone>

    <div class="ds-errors" v-if="inputErrors.length && touched">
      {{ inputErrors[0] }}
    </div>
  </div>
  
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
    icon: String,
    iconSize: String,
    title: String,
    files: {
      type: Array,
      default: () => []
    },
    validators: Array,
    preview: {
      type: Boolean,
      default: true
    },
    showErrors: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      mainOptions: {
        addedfile: (file) => {
          this.touched = true
          this.errors = []

          if (this.files.find(f => f.name === file.name)) {
            let message = this.dsTranslate('File selected')

            this.$emit('invalidfile', message)
            this.errors.push(message)
            return
          }

          if (!this.fileTypeCheck(file)) {
            let message = this.dsTranslate('File invalid')

            this.$emit('invalidfile', message)
            this.errors.push(message)
            return
          }

          setTimeout(() => {
            if (!this.multiple) {
              this.file = file
            }
            this.$emit('addfile', file)
          }, 300)
        },
        url: 'https://*',
        addRemoveLinks: true,
        acceptedFiles: "image/*"
      },
      touched: false,
      errors: [],
      file: null
    }
  },
  methods: {
    removeFile(file) {
      if (!this.multiple) {
        this.file = null
      }
      this.$emit('removefile', file)
    },
    fileTypeCheck(file) {
      if (file.type === this.mainOptions.acceptedFiles) {
        return true
      }

      if (this.mainOptions.acceptedFiles === "*") {
        return true
      }

      if (this.mainOptions.acceptedFiles.includes("/*")) {
        const type = this.mainOptions.acceptedFiles.replace("/*", '')
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
    },
    validation() {
      if (!this.validators || !this.validators.length) {
        return []
      }

      let data = []
      for (var i = 0; i < this.validators.length; i++) {
        if (!this.multiple) {
          data.push([
            this.validators[i].name,
            this.validators[i].validator(this.file)
          ])
        } else {
          data.push([
            this.validators[i].name,
            this.validators[i].validator(this.files)
          ])
        }
        
      }
      return data
    },
    inputErrors() {
      if (this.errors.length > 0) {
        return this.errors
      }

      let errors = []

      for (var i = 0; i < this.validation.length; i++) {
        if (!this.validation[i][1]) {
          errors.push(this.validators[i].message)
        }
      }

      return errors
    }
  },
  watch: {
    files() {
      this.$emit('validation', this.validation)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-upload-wrapper {
  width: 100%;

  #ds-file-upload {
    width: 100%;
    position: relative;
    min-height: @file-upload-panel-height; 
    background-color: @color-gray-300;

    .ds-dropzone-custom-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      .ds-title {
        color: @color-dark;
        font-weight: @file-upload-title-weight;
        font-size: @file-upload-title-size;
        line-height: @fle-upload-line-height;
        margin-top: @file-upload-title-margin-top;
      }
    }

    .ds-selected-files-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;

      .ds-file-wrapper {
        margin-left: 10px;
        margin-right: 10px;
        position: relative;

        img {
          object-fit: cover;
        }

        .ds-icon {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }

  .ds-errors {
    color: @color-red;
    font-family: @font-family;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    display: block;
    max-width: 100%;
  }
}

.dz-preview {
  display: none !important;
}

.dropzone .dz-message {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

</style>
