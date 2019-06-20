<template>
  <div class="row-col">
    <h3>Tooltip</h3>

    A styled tooltip
    <Description compnent-name="Tooltip"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Tooltip popoverWidth="200px" placement="top">
      <div slot="popover">This is a tooltip content</div>
      <div slot="reference">
        <Button>Top</Button>
      </div>
    </Tooltip>

    <Tooltip popoverWidth="200px" placement="bottom">
      <div slot="popover">This is a tooltip content</div>
      <div slot="reference">
        <Button>Bottom</Button>
      </div>
    </Tooltip>

    <Tooltip popoverWidth="200px" placement="left">
      <div slot="popover">This is a tooltip content</div>
      <div slot="reference">
        <Button>Left</Button>
      </div>
    </Tooltip>

    <Tooltip popoverWidth="200px" placement="right">
      <div slot="popover">
        This is a tooltip content
      </div>
      <div slot="reference">
        <Button>Right</Button>
      </div>
    </Tooltip>
  </div>
</template>

<script>
import Tooltip from '../../components/Tooltip'
import Button from '../../components/Button.vue'
import Description from '../../descriptions/Description'
import Collapser from '../../components/Collapser.vue'

let usage = `
<Tooltip popoverWidth="500px">
  <div slot="popover">
    This is a tooltip content
  </div>
  <div slot="reference">
    <Button></Button>
  </div>
</Tooltip>
`.slice(1)

export default {
  name: "TooltipDemo",
  components: {Tooltip, Description, Collapser, Button},
  data: () => ({
    tooltipVisibleHover: false,
    tooltipVisibleClick: false,
    openUsage: true,
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
