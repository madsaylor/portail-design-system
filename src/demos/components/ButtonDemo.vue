<template>
  <div class="row-col">
    <h3>Button</h3>

    Button with an optional icon and different styles

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <div style="line-height: 64px">
      <Button big>Big</Button>&nbsp;
      <Button icon="add">Left Icon</Button>&nbsp;
      <Button icon-right="expand_more">Right Icon</Button>&nbsp;
      <Button alt>Alt</Button>&nbsp;
      <Button icon="add" alt>Alt icon</Button>&nbsp;
      <Button plain>Plain </Button>&nbsp;
      <Button disabled>Disabled</Button>&nbsp;
      <Button icon="menu" big plain></Button>&nbsp;
      <Button icon="menu" big></Button>&nbsp;
      <Button icon="menu" plain></Button>&nbsp;
      <Button icon="menu"></Button>&nbsp;
      <Button link="https://github.com/highqualitycode" icon="account_circle">Github</Button>&nbsp;
      <!-- OR -->
      <button class="button primary">
        Button Label
      </button>
    </div>

  </div>
</template>

<script>
import Button from '../../components/Button.vue'

let usage = `
<Button big>Big</Button>&nbsp;
<Button icon="add">Left Icon</Button>&nbsp;
<Button icon-right="expand_more">Right Icon</Button>&nbsp;
<Button alt>Alt</Button>&nbsp;
<Button icon="add" alt>Alt icon</Button>&nbsp;
<Button plain>Plain </Button>&nbsp;
<Button disabled>Disabled</Button>&nbsp;
<Button icon="menu" big plain></Button>&nbsp;
<Button icon="menu" big></Button>&nbsp;
<Button icon="menu" plain></Button>&nbsp;
<Button icon="menu"></Button>&nbsp;
<!-- OR -->
<button class="button primary">
  Button Label
</button>
`.slice(1)

export default {
  name: 'ButtonDemo',
  components: {Button},
  data: () => ({usage}),
}
</script>
