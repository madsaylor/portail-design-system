<template>
  <div class="row-col">
    <h3>FileUpload</h3>

    FileUplaod with showing an icon and title
    <Description compnent-name="FileUpload"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div>
      <FileUpload
        icon="cloud_upload"
        iconSize="32px"
        title="Add your logo"
        :files="files"
        :preview="true"
        :validators="validators"
        @addfile="addfile"
        @removefile="removefile"
      />
    </div>

  </div>
</template>

<script>
import FileUpload from '../../components/FileUpload.vue'
import Description from '../../descriptions/Description'
import Collapser from '../../components/Collapser.vue'
import {FileUploadData} from '../../static/index'

export default {
  name: 'FileUploadDemo',
  components: {FileUpload, Description, Collapser},
  data: () => ({
    openUsage: true,
    usage: FileUploadData.usage,
    files: [],
    invalidMessage: '',
    validators: [
      {
        name: 'required',
        message: 'File is required',
        validator: files => files.length > 0
      }
    ]
  }),
  methods: {
    addfile(file) {
      this.files = [...this.files, file]
    },
    removefile(file) {
      this.files = this.files.filter(f => f.lastModified !== file.lastModified || f.name !== file.name)
    }
  }
}
</script>
