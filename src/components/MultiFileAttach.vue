<template>
  <div class="">
    <div class="input-wrapper">
      <input type="file" id="file-input" @change="fileInputChange" />
      <Input
        type="text"
        :label="label"
        v-model="selectedFileText"
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
    files: Array
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
    }
  },
  methods: {
    fileInputChange(e) {
      this.$emit('fileInput', e.target.files[0])
    },
    fileInputOpen() {
      document.getElementById('file-input').click();
    },
    removeFile(file) {
      this.$emit('fileRemove', file)
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
  }

  .open-icon {
    position: absolute;
    right: 6px;
    bottom: 6px;
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
