<template>
  <div class="row-col input-demo">
    <h3>Input</h3>

    A styled input with an ability to set icon and validation.

    <h4>Usage guidlines</h4>
    Input fields can be used either standalone or grouped.

    <p>
      Standalone fields can be in 3 different widths:
    </p>

    <ul>
      <li>Small — 144px</li>
      <li>
        Medium - 252px
      </li>
      <li>
        Large - 464px
      </li>
    </ul>

    <p>
      When used on the same row, there can be only two standalone fields with
      32px margin between them. <br />
      If there is need to use 2 or more fields on the same row that are
      contextually belong together, those fields are called <b>grouped</b>
    </p>

    <p>
      Grouped fields do not have any fixed widths as their width are
      pre-defined by the layout and they always have 16px margin between them.
    </p>

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <div class="input-component-demo">
      Model value: {{ textValue }}<br />
      <Input sm label="Small" v-model="textValue"/>
      <Input md label="Medium" v-model="textValue"/>
      <Input lg label="Large" v-model="textValue"/>
      <Input
        md
        help="This is an explation of what the field is used for."
        icon="search"
        label="Icon, placeholder and help text"
        placeholder="Search"
        v-model="textValue"
      />
      <Input
        md
        disabled
        label="Disabled input"
        placeholder="Disabled"
        v-model="textValue"
      />
      <Input
        md
        label="Input with errors"
        :validators="demoValidators"
        v-model="textValue"
      />
      <Input
        placeholder="Placeholder"
        icon="today"
        v-model="inputValue2"
        label="Input with icon and bottom help"
        :bottom-help="{label: 'bottom help', text: 'This is bottom help tooltip'}"
      />
    </div>

  </div>
</template>

<script>
import Input from '../../components/Input'

let usage = `
<Input
  placeholder="Maximum 10 characters"
  icon="search"
  title="Input with icon and help"
  help="Some info"
  v-model="inputValue"
  :validators="validators"
  @validation="logError($event)"
/>
<Input
  placeholder="Placeholder"
  icon="today"
  title="Input with icon and bottom help"
  v-model="inputValue2"
  :bottom-help="{label: 'bottom help', text: 'This is bottom help tooltip'}"
/>
<Input
  placeholder="Disabled"
  title="Disabled input"
  v-model="inputValue3"
  disabled
/>`
.slice(1)

export default {
  name: "InputDemo",
  components: {Input},
  data: () => ({
    usage,
    textValue: '',
    inputValue: 'Input with validator',
    inputValue2: '',
    inputValue3: '',
    demoValidators: [
      {
        message: 'Error message',
        validator: (value) => false
      },
      {
        message: `
          Long error message: Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nam mollis ullamcorper rutrum. Pellentesque
          rutrum consectetur nulla, eget euismod justo vehicula
        `,
        validator: (value) => false
      },
    ]
  })
}
</script>

<style lang="less" scoped>
.input-demo {
  .input {
    margin-right: 32px;
    margin-bottom: 60px;
  }
}
</style>
