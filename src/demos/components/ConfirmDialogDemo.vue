<template>
  <div class="row-col">
    <h3>Confirm Dialog</h3>
    <Description component-name="ConfirmDialog"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage">
        <code class="html"></code>
      </pre>
    </Collapser>

    <div class="button-group">
      <Button class="button-modal" @click="opened = true">OPEN CONFIRM DIALOG</Button>
    </div>

    <ConfirmDialog
      :opened.sync="opened"
      :borderColor="borderColor"
      title="Dialog box title"
    >
      <div slot="ds-confirm-content">
        Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus, scelerisque nec pharetra id, tempor a tortor. Pellentesque non dignissim neque. 
      </div>
    </ConfirmDialog>
  </div>
</template>

<script>
import ConfirmDialog from '../../components/ConfirmDialog'
import Button from '../../components/Button'
import Description from '../../descriptions/Description'
import Collapser from '../../components/Collapser'

export default {
  name: 'ConfirmDialogDemo',
  components: { ConfirmDialog, Button, Description, Collapser },
  data() {
    return ({
      opened: false,
      borderColor: '#e6e7eb',
      usage: 'test'
    })
  }
}
</script>

<style lang="less">
</style>
