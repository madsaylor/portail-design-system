<template>
  <div class="row-col">
    <h3>FileUpload</h3>

    FileUplaod with showing an icon and title
    <Description compnent-name="FileUpload"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div>Multi File Upload</div>
    <div>
      <FileUpload
        v-model="file"
        icon="cloud_upload"
        iconSize="32px"
        title="Add your logo"
        :preview="true"
        :validators="validators"
        :multiple="true"
      />
    </div>
    <br />

    <div>Single File Upload</div>
    <div>
      <FileUpload
        v-model="singleFile"
        icon="cloud_upload"
        iconSize="32px"
        title="Add your logo"
        :preview="true"
        :validators="validators"
        :multiple="false"
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
    file: [],
    singleFile: null,
    invalidMessage: '',
    validators: [
      {
        name: 'required',
        message: 'File is required',
        validator: value => Array.isArray(value) ? value.length > 0 : value
      }
    ]
  })
}
</script>
