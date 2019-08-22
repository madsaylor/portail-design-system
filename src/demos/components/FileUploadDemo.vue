<template>
  <div class="row-col">
    <h3>FileUpload</h3>

    FileUplaod with showing an icon and title
    <Description compnent-name="FileUpload"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>
    
    <div class="ds-grid">
      <div class="row">
        <div class="col-6">
          <div>
            <div>Multi File Upload</div>
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
        </div>

        <div class="col-6">
          <div>
            <div>Single File Upload</div>
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
      </div>
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
