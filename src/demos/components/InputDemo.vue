<template>
  <div class="row-col">
    <h3>Input</h3>

    Input with an ability to set icon and validation.

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <div class="input-component-demo">
      <Input
        placeholder="Placeholder"
        icon-right="search"
        top-title="Evaluez votre client"
        :validators="validators"
        help="huihu8dasu8hduashduoashduo"
      ></Input>
    </div>

  </div>
</template>

<script>
import Input from '../../components/Input'

let usage = `
<Input

></Input>`
.slice(1)

export default {
  name: "InputDemo",
  components: {Input},
  data: () => ({
    usage,
    validators: [
      {
        message: 'Maximum length is 25 characters',
        validator: (value) => {
          return value.length <= 25
        }
      },
    ]
  }),
}
</script>

<style lang="less" scoped>

</style>
