<template>
  <div class="row-col">
    <h3>FileUpload</h3>

    FileUplaod with showing an icon and title
    <Description compnent-name="FileUpload"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div style="line-height: 64px">
      <FileUpload
        icon="cloud_upload"
        iconSize="48px"
        title="Add your logo"
        :uploadOptions="uploadOptions"
      />
    </div>

  </div>
</template>

<script>
import FileUpload from '../../components/FileUpload.vue'
import Description from '../../descriptions/Description'
import Collapser from '../../components/Collapser.vue'

let usage = `
  <FileUpload
    icon="cloud_upload"
    iconSize="48px"
    title="Add your logo"
    :uploadOptions="uploadOptions"
  />
`.slice(1)

export default {
  name: 'FileUploadDemo',
  components: {FileUpload, Description, Collapser},
  data: () => ({
    openUsage: true,
    usage,
    uploadOptions: {
      url: 'https://httpbin.org/post',
      addRemoveLinks: true,
      acceptedFiles: "image/*"
    }
  }),
}
</script>
