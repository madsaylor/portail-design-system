<template>
  <div class="">
    <div class="input-wrapper">
      <input type="file" id="file-input" @change="fileInputChange" multiple />
      <Input
        type="text"
        :label="label"
        v-model="selectedFileText"
        disabled
      />
      <Icon attach_file class="open-icon" @click="fileInputOpen" />
    </div>

    <div class="files-wrapper">
      <div v-for="file in files" :key="file.name" class="file-name">
        <span class="name">{{file.name}}</span>
        <Icon class="close" close @click="removeFile(file)" />
      </div>
    </div>
  </div>
</template>

<script>
import Input from './Input';
import Icon from './Icon'

export default {
  name: 'MultiFileAttach',
  components: {Input, Icon},
  props: {
    label: String,
    files: Array,
    maxTotalSize: {
      type: Number,
      default: 2
    },
    maxFileCount: {
      type: Number,
      default: 20
    }
  },
  computed: {
    selectedFileText() {
      if (this.files.length === 0) {
        return ''
      } else if (this.files.length === 1) {
        return '1 file selected'
      } else {
        return this.files.length + ' files selected'
      }
    },
    currentTotalSize() {
      let totalSize = 0;
      this.files.forEach(file => {
        totalSize += file.size
      })
      return totalSize
    }
  },
  methods: {
    fileInputChange(e) {
      const currentTotal = (this.attachedTotalSize(e.target.files) + this.currentTotalSize) / (1024 * 1000)
      if (currentTotal > this.maxTotalSize) {
        return
      }

      if (this.files.length >= this.maxFileCount) {
        return
      }
      this.$emit('fileInput', e.target.files)
    },
    fileInputOpen() {
      document.getElementById('file-input').click();
    },
    removeFile(file) {
      this.$emit('fileRemove', file)
    },
    attachedTotalSize(files) {
      let totalSize = 0;
      Object.keys(files).forEach(key => {
        totalSize += files[key].size
      })
      return totalSize
    }
  }
}
</script>

<style lang="less">
@import '~@/styles/vars';

.input-wrapper {
  position: relative;
  margin-bottom: 24px;

  #file-input {
    display: none;
  }

  .input {
    width: 100%;

    label {
      input {
        border: 1px solid @color-gray-300 !important;
        background-color: @color-white !important;
        color: @color-gray-500 !important;
      }
    }
  }

  .open-icon {
    position: absolute;
    right: 6px;
    bottom: 6px;
    cursor: pointer;
  }
}

.files-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  .file-name {
    height: 24px;
    background-color: #F4F6FB;
    border: 1px solid #E6E7EB;
    border-radius: 2px;
    display: flex;
    align-items: center;
    margin-right: 12px;
    margin-bottom: 8px;

    .name {
      font-size: 12px;
      line-height: 16px;
      color: #838795;
      padding: 4px;
    }

    .close {
      cursor: pointer;
    }
  }
}

</style>
