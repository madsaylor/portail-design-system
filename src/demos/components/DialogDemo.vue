<template>
  <div class="row-col">
    <h3>Dialog</h3>

    <p>Dialog window can have any body what you want. Just put some HTML code or another component inside dialog tag.</p>
    <p>State of dialog is regulated by property <b>opened</b>.</p>
    <p>Opacity of the backdrop is regulated bu property <b>backdropOpacity</b>.</p>

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <Button @click="opened = true">OPEN DIALOG</Button>
    <Button @click="datepickerVisible = true" alt>OPEN CALENDAR</Button>

    <Dialog
      :opened.sync="opened"
    >
      <div class="dialog-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </Dialog>

    <Dialog
      :opened.sync="datepickerVisible"
      :backdropOpacity="'0.3'"
    >
      <Datepicker
        :min="datepickerMin"
        :max="datepickerMax"
        v-model="datepickerValue"
      ></Datepicker>
    </Dialog>
  </div>
</template>

<script>
  import Dialog from "../../components/Dialog"
  import Button from "../../components/Button"
  import Datepicker from "../../components/Datepicker"


  let usage = `
    <Dialog :opened.sync="opened" >
      <div class="dialog-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </Dialog>

    <Dialog :opened.sync="datepickerVisible" :backdropOpacity="'0.3'">
      <Datepicker
        :min="datepickerMin"
        :max="datepickerMax"
        v-model="datepickerValue"
      ></Datepicker>
    </Dialog>
  `.slice(1)

  export default {
    name: "DialogDemo",
    components: {Dialog, Button, Datepicker},
    data() {
      return ({
        opened: false,
        datepickerValue: new Date(),
        datepickerVisible: false,
        datepickerMin: undefined,
        datepickerMax: undefined,
        usage
      })
    }
  }
</script>

<style scoped>
  .dialog-body {
    height: auto;
    width: 600px;
    padding: 20px;
  }

  .button {
    margin: 10px;
  }
</style>
