<template>
  <div class="row-col">
    <h3>MultiFileAttach</h3>

    Customized multi-file-attach component with label.
    <Description compnent-name="MultiFileAttach"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>
    <div class="row-col">
      <MultiFileAttach
        label="Multi File Attach Example"
        :files="files"
        @fileInput="fileInput"
        @fileRemove="fileRemove"
      />
    </div>
  </div>
</template>

<script>
import MultiFileAttach from '../../components/MultiFileAttach.vue'
import Description from '../../descriptions/Description'
import Collapser from '../../components/Collapser.vue'

let usage = `
  <MultiFileAttach
    label="Multi File Attach Example"
    :files="files"
    :maxTotalSize="2"
    :maxFileCount="20"
    @fileInput="fileInput"
    @fileRemove="fileRemove"
  />
`.slice(1)

export default {
  name: 'MultiFileAttachDemo',
  components: {MultiFileAttach, Description, Collapser},
  data() {
    return {
      openUsage: true,
      usage,
      files: []
    }
  },
  methods: {
    fileInput(file) {
      this.files = [...this.files, file]
    },
    fileRemove(file) {
      this.files = this.files.filter(f => f.name !== file.name)
    }
  }
}
</script>
