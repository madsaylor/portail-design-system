<template>
  <div class="row-col">
    <h3>Chips</h3>
    <p>The list items are displayed as 'chips'</p>

    <Description compnent-name="Chips"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Chips v-model="simpleChips"></Chips><br/>

    <Chips v-model="chips"
           :removable="true"
           :placeholder="placeholder"
           :validators="validators">
    </Chips>
  </div>
</template>

<script>
  import Chips from '../../components/Chips.vue'
  import Description from '../../descriptions/Description'
  import Collapser from '../../components/Collapser.vue'
  import {ChipsData} from '../../static/index'

  const EMAIL = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  export default {
    name: 'ChipsDemo',
    components: {Chips, Description, Collapser},
    data: () => ({
      openUsage: true,
      usage: ChipsData.usage,
      simpleChips: ['apple', 'banana', 'grapefruit'],
      chips: ['test@gmail.com'],
      label: 'Recipient email',
      placeholder: 'Add a recipient',
      validators: [
        {
          name: 'required',
          message: 'The field is required',
          validator: value => !!value.length
        },
        {
          name: 'email',
          message: 'The email field must be a valid email',
          validator: value => EMAIL.test(value)
        }
      ]
    })
  }
</script>

<style lang="less">

</style>
