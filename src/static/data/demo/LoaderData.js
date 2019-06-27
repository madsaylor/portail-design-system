let usage = `
<Loader v-model="loadingFullScreen" :fullScreen="fullScreen"></Loader>

<Loader v-model="loading" :target="$refs.dialog"></Loader>
<Dialog :opened.sync="dialogOpened" ref="dialog">
  <div class="dialog-body-default">Lorem ipsum ...</div>
</Dialog>

<Loader v-model="loadingSignature" :target="$refs.signature"></Loader>
<Signature v-model="signatureData" ref="signature"></Signature>
`.slice(1)

export default {
  usage
}
