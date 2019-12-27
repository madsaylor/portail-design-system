<template>
  <div class="row-col">
    <h3>Tooltip</h3>

    A styled tooltip
    <Description compnent-name="Tooltip"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="row-col tooltip-buttons">
      <Tooltip
        popoverWidth="200px"
        placement="left"
        class="default-tooltip"
        :forceShow="forceShow"
        :forceHide="true"
        @update:forceShow="forceShowUpdate"
      >
        <div slot="popover">This is a tooltip content</div>
        <div slot="reference">
          <Button>Tooltip</Button>
        </div>
      </Tooltip>
    </div>

    <div class="row-col tooltip-buttons">
      <Tooltip
        popoverWidth="560px"
        poperHeight="175px"
        poperPadding="20px 40px 50px 30px"
        poperMargin="0 0 0 30px"
        poperBoxSizing="border-box"
        placement="left"
        class="default-tooltip"
        type="custom"
        :forceShow="forceShow"
        :forceHide="true"
        @update:forceShow="forceShowUpdate"
      >
        <div slot="popover">
          <div class="ds-tooltip-content-custom">
            C'est vraiment pratique, l’utilisation du mini TPE est très complète (en plus d’être beaucoup moins cher
            qu'un TPE classique en location). Pouvoir faire en même temps caisse enregistreuse et avoir immédiatement
            les statistiques des ventes, c'est un vrai plus !
          </div>
        </div>
        <div slot="reference">
          <Button>Custom Tooltip</Button>
        </div>
      </Tooltip>
    </div>

    <div class="row-col">
      <Tooltip type="mini">
        <div>This is the mini Tooltip content</div>
        <div>Second line of mini tooltip</div>
      </Tooltip>
    </div>
  </div>
</template>

<script>
import Tooltip from '../../components/Tooltip'
import Button from '../../components/Button.vue'
import Description from '../../descriptions/Description'
import Collapser from '../../components/Collapser.vue'
import {TooltipData} from '../../static/index'

export default {
  name: 'TooltipDemo',
  components: {Tooltip, Description, Collapser, Button },
  data: () => ({
    tooltipVisibleHover: false,
    tooltipVisibleClick: false,
    tooltipOffset: {offset: '0px 50px'},
    forceShow: true,
    openUsage: true,
    usage: TooltipData.usage
  }),
  methods: {
    forceShowUpdate(value) {
      this.forceShow = value
    }
  }
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

.tooltip-buttons {
  margin-bottom: 20px;

  .default-tooltip {
    margin-right: 10px;
  }
}
</style>
