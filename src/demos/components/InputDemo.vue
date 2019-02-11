<template>
  <div class="row-col">
    <h3>Input</h3>

    A styled input with an ability to set icon and validation.

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <div class="input-component-demo">
      <Input
        placeholder="Maximum 10 characters"
        icon-right="search"
        top-title="Input with right icon and help"
        help="Some info"
        v-model="inputValue"
        :validators="validators"
      />
      <Input
        placeholder="Placeholder"
        icon="today"
        v-model="inputValue2"
        top-title="Input with left icon and bottom help"
        :bottom-help="{label: 'bottom help', text: 'This is bottom help tooltip'}"
      />
      <Input
        placeholder="Disabled"
        v-model="inputValue3"
        top-title="Disabled input"
        disabled
      />
    </div>

  </div>
</template>

<script>
import Input from '../../components/Input'

let usage = `
<Input
  placeholder="Maximum 10 characters"
  icon-right="search"
  top-title="Input with right icon and help"
  help="Some info"
  v-model="inputValue"
  :validators="validators"
  @validation="logError($event)"
/>
<Input
  placeholder="Placeholder"
  icon="today"
  top-title="Input with left icon and bottom help"
  v-model="inputValue2"
  :bottom-help="{label: 'bottom help', text: 'This is bottom help tooltip'}"
/>
<Input
  placeholder="Disabled"
  top-title="Disabled input"
  v-model="inputValue3"
  disabled
/>`
.slice(1)

export default {
  name: "InputDemo",
  components: {Input},
  data: () => ({
    usage,
    inputValue: 'Input with validator',
    inputValue2: '',
    inputValue3: '',
    validators: [
      {
        message: 'Maximum length is 10 characters',
        validator: (value) => {
          return value.length <= 10
        }
      },
    ]
  })
}
</script>

<style lang="less" scoped>
.input-component-demo {
  display: flex;

  .input-component-wrapper:not(:first-child) {
    margin-left: 30px;
  }
}
</style>
