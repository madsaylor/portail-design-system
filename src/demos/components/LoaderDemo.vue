<template>
    <div class="row-col">
      <h3>Loader</h3>
      <p>Loader component for displaying in time of loading any state of application</p>

      <Description compnent-name="Loader"></Description>

      <Collapser :opened.sync="openUsage" label="Usage">
        <pre v-highlightjs="usage"><code class="html"></code></pre>
      </Collapser>

      <div>
        <Button @click="temporaryFullScreenLoader">Open full screen loader on 5 sec</Button>
        <Loader v-model="loadingFullScreen" :fullScreen="fullScreen"></Loader>
      </div>
      <div class="demo-loader-wrapper">
        <Button class="base-btn-loader" @click="temporaryLoader">Open dialog with loader on 5 sec</Button>
        <Loader v-model="loading" :target="$refs.dialog"></Loader>
        <Dialog :opened.sync="dialogOpened" ref="dialog">
          <div class="dialog-body-default">{{text}}</div>
        </Dialog>
      </div>
      <div class="demo-loader-wrapper">
        <Button class="base-btn-loader base-btn-loader-bottom" @click="temporarySignatureLoader">Apply loader on signature component on 5 sec</Button>
        <Loader v-model="loadingSignature" :target="$refs.signature"></Loader>
        <Signature v-model="signatureData" ref="signature"></Signature>
      </div>
    </div>
</template>

<script>
  import Loader from '../../components/Loader'
  import Collapser from '../../components/Collapser'
  import Description from '../../descriptions/Description'
  import Button from '../../components/Button'
  import Dialog from '../../components/Dialog'
  import Signature from '../../components/Signature'

let text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`

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
    name: 'LoaderDemo',
    components: {Loader, Collapser, Description, Button, Dialog, Signature},
    data: () => ({
      text,
      usage,
      openUsage: true,
      loadingFullScreen: false,
      loading: false,
      loadingSignature: false,
      fullScreen: true,
      dialogOpened: false,
      signatureData: undefined
    }),
    methods: {
      temporaryFullScreenLoader() {
        this.loadingShow('loadingFullScreen', 5)
      },
      temporaryLoader() {
        this.dialogOpened = true
        this.loadingShow('loading', 5)
      },
      temporarySignatureLoader() {
        this.loadingShow('loadingSignature', 5)
      },
      loadingShow(name, sec) {
        this[name] = true
        setTimeout(() => {
          this[name] = false
        }, sec * 1000)
      }
    }
  }
</script>

<style lang="less" scoped>
  .demo-loader-wrapper {
    .base-btn-loader {
      margin-top: 10px;
      width: 100%;
    }
    .base-btn-loader-bottom {
      margin-bottom: 10px;
    }
  }

  .dialog-body-default {
    height: auto;
    width: 600px;
    padding: 20px;
  }
</style>
