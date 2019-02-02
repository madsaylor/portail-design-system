<template>
  <div class="row-col">
    <h3>Icon</h3>

    An icon of a specific size (default 24px), with optional padding for
    easier alignment.

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <icon account_circle size="12px" padding="30px 2px" />
    <icon account_circle size="16px" padding="28px 2px" />
    <icon account_circle padding="24px 2px" />
    <icon account_circle size="36px" padding="18px 2px" />
    <icon account_circle size="52px" padding="10px 2px" />
    <icon account_circle size="72px" />
  </div>
</template>

<script>
import Icon from '../../components/Icon.vue'

let usage = `
<icon account_circle size="12px" padding="30px 2px" />
<icon account_circle size="16px" padding="28px 2px" />
<icon account_circle padding="24px 2px" />
<icon account_circle size="36px" padding="18px 2px" />
<icon account_circle size="52px" padding="10px 2px" />
<icon account_circle size="72px" />
`.slice(1)

export default {
  name: 'IconDemo',
  components: {Icon},
  data: () => ({usage}),
}
</script>
