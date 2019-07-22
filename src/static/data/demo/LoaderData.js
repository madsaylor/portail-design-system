let usage = `
<Loader v-model="loadingFullScreen" :fullScreen="fullScreen"></Loader>

<Dialog :opened.sync="dialogWrapperOpened">
  <div class="dialog-body-default">{{text}}</div>
  <template #loaderWrapper>
    <Loader v-model="loadingWrapper"></Loader>
  </template>
</Dialog>
        
<Dialog :opened.sync="dialogOpened">
  <div class="dialog-body-default">{{text}}</div>
  <template #loader>
    <Loader v-model="loading"></Loader>
  </template>
</Dialog>

<Signature v-model="signatureData">
  <template #loader>
    <Loader v-model="loadingSignature"></Loader>
  </template>
</Signature>
`.slice(1)

export default {
  usage
}
