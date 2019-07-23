<template>
  <div class="row-col">
    <h3>Tabs</h3>

    <h4>Usage</h4>
    <p>Tabs component can be controlled by next properties: </p>
    <Description compnent-name="Tabs"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Tabs :tabs="tabs" :active="active" @tab:click="onTabClick">
      <template #tabs-1>
        <h4 class="body-title">MES FACTURES</h4>
        <Card class="ds-dashboard-report">
          <div class="report-title">
            Chiffre d'affaires réalisé en 2018
          </div>
          <div class="ds-report-amount green">
            <Icon arrow_upward></Icon>95,00 €
          </div>
          <div class="ds-report-subtitle">
            dont 0,00 € ce mois-ci
          </div>
        </Card>
      </template>
      <template #tabs-2>
        <h4 class="body-title">MES DEVIS</h4>
        <Icon account_circle size="12px" padding="30px 2px" />
        <Icon account_circle size="16px" padding="28px 2px" color="primary" />
        <Icon account_circle padding="24px 2px" color="blue"/>
        <Icon account_circle size="36px" padding="18px 2px" color="red" />
        <Icon account_circle size="52px" padding="10px 2px" color="gray-400" />
        <Icon account_circle size="72px" color="#55aaff" />
      </template>
      <template #tabs-3>
        <h4 class="body-title">MES AVOIRS</h4>
        <div class="tab-inputs">
          <Input sm label="Small"/>
          <Input md label="Medium"/>
          <Input lg label="Large"/>
        </div>
      </template>
    </Tabs>
  </div>
</template>

<script>
  import Tabs from '../../components/Tabs'
  import Card from '../../components/Card'
  import Icon from '../../components/Icon'
  import Input from '../../components/Input'
  import Description from '../../descriptions/Description'
  import Collapser from '../../components/Collapser.vue'
  import {TabsData} from '../../static/index'

  export default {
    name: 'TabsDemo',
    components: { Tabs, Card, Icon, Input, Description, Collapser},
    data() {
      return ({
        openUsage: true,
        usage: TabsData.usage,
        active: 1,
        tabs: TabsData.tabs
      })
    },
    methods: {
      onTabClick(tab, index) {
        this.active = index;
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../styles/vars';
  .body-title {
    text-align: center;
  }

  .tab-inputs {
    display: flex;
    justify-content: space-between;
  }
</style>
