<template>
  <div class="row-col">
    <h3>Tooltip</h3>

    A styled tooltip

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <div class="tooltip-component-demo">
      <div class="hover-to-see"
        @mouseover="tooltipVisibleHover = true"
        @mouseleave="tooltipVisibleHover = false"
      >
        Hover me to see a tooltip
        <Tooltip :visible="tooltipVisibleHover">
          <h3 class="white-text">H3</h3>
          <span>I have a slot!</span>
        </Tooltip>
      </div>
      <div class="click-to-see"
           @click="tooltipVisibleClick = !tooltipVisibleClick"
      >
        {{tooltipVisibleClick ? 'Click me to hide a tooltip' : 'Click me to see a tooltip'}}
        <Tooltip :visible="tooltipVisibleClick">
          Some information
        </Tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from '../../components/Tooltip'

let usage = `
<Tooltip :visible="tooltipVisibleHover">
<Tooltip :visible="tooltipVisibleClick">`
.slice(1)

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
