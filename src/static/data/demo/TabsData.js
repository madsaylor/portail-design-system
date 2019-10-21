let usage = `    
<Tabs :tabs="tabs" 
      :active="active" 
      :enableLoader="enableLoader" 
      :disabled="disabled"
      @tab:click="onTabClick">
  <template #tabs-1>
    <h4 class="body-title">MES FACTURES</h4>
    <Card class="ds-dashboard-report">
      <div class="ds-report-title">
        Chiffre d'affaires réalisé en 2018
      </div>
      ...
    </Card>
  </template>
  <template #tabs-2>
    <h4 class="body-title">MES DEVIS</h4>
    <Icon account_circle size="12px" padding="30px 2px" />
    ...
  </template>
  <template #tabs-3>
    <h4 class="body-title">MES AVOIRS</h4>
    <div class="tab-inputs">
      <Input sm label="Small"/>
      ...
    </div>
  </template>
</Tabs>`.slice(1)

let tabs = [
  {
    text: 'MES FACTURES'
  },
  {
    text: 'MES DEVIS'
  },
  {
    text: 'MES AVOIRS'
  }
]

export default {
  usage,
  tabs
}
