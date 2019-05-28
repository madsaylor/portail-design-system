<template>
    <div class="row-col">
      <h3>Signature</h3>
      <p>Signature component for make signatures</p>

      <Description compnent-name="Signature"></Description>

      <Collapser :opened.sync="openUsage" label="Usage">
        <pre v-highlightjs="usage"><code class="html"></code></pre>
      </Collapser>

      <Signature :signature-pad-style-object="signaturePadStyleObject"
                 :show-save-button="showSaveButton">
      </Signature>
    </div>
</template>

<script>
  import Signature from '../../components/Signature'
  import Collapser from '../../components/Collapser'
  import Description from '../../descriptions/Description'

let usage = `
      <Signature :signature-pad-style-object="signaturePadStyleObject"
                 :show-save-button="showSaveButton">
      </Signature>
`.slice(1)

  export default {
    name: 'SignatureDemo',
    components: {Signature, Collapser, Description},
    data: () => ({
      usage,
      openUsage: true,
      signaturePadStyleObject: {
        border: '1px solid #1eb386'
      },
      showSaveButton: false
    })
  }
</script>

<style lang="less" scoped>

</style>
