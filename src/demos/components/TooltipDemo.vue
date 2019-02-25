<template>
  <div class="row-col">
    <h3>Tooltip</h3>

    A styled tooltip

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <Tooltip>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
      scelerisque sit amet velit vitae tristique. Nullam congue in lorem in
      aliquam. Sed euismod nisl a ex commodo, non aliquet lacus mattis.
    </Tooltip>
  </div>
</template>

<script>
import Tooltip from '../../components/Tooltip'

let usage = `
<Tooltip>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
  scelerisque sit amet velit vitae tristique. Nullam congue in lorem in
  aliquam. Sed euismod nisl a ex commodo, non aliquet lacus mattis.
</Tooltip>
`.slice(1)

export default {
  name: "TooltipDemo",
  components: {Tooltip},
  data: () => ({
    tooltipVisibleHover: false,
    tooltipVisibleClick: false,
    usage
  })
}
</script>

<style lang="less" scoped>
@import '../../styles/vars';

.tooltip-component-demo {
  display: flex;

  .click-to-see,
  .hover-to-see {
    position: relative;
    padding: 10px;
    color: @color-white;
    background-color: @color-gray-500;
    margin-right: 20px;

    .tooltip-wrapper {
      margin-top: 15px;
    }
  }

  .white-text {
    color: @color-white;
    margin: 0;
  }
}
</style>
