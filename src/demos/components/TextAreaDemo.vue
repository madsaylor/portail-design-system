<template>
  <div class="row-col">
    <h3>TextArea</h3>
    Custom textarea component

    <Description compnent-name="TextArea"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="textarea-wrapper">
      <TextArea v-model="messageText" :label="labelText" :placeholder="placeholder"></TextArea>
    </div>
  </div>
</template>

<script>
import TextArea from '../../components/TextArea.vue';
import Description from '../../descriptions/Description.vue';
import Collapser from '../../components/Collapser.vue';

let usage = `
<div class="textarea-wrapper">
  <TextArea v-model="messageText" :label="labelText" :placeholder="placeholder"></TextArea>
</div>`.slice(1);

export default {
    name: "TextAreaDemo",
    components: {TextArea, Description, Collapser},
    data: () => ({
      openUsage: true,
      usage,
      messageText: null,
      labelText: 'Marathon',
      placeholder: 'Placeholder'
    })
}
</script>

<style lang="less" scoped>
  .textarea-wrapper {
    height: 100px;
    width: 500px;
  }
</style>
