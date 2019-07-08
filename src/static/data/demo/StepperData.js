let usage = `
<Step v-model="steps" @current:step="setCurrentStep" :selectedStep="stepNumber">
  <template #header></template>
  <template #step-1>
    <Card class="dashboard-report">
      <div class="report-title">
        Chiffre d'affaires réalisé en 2018
      </div>
      <div class="report-amount green">
        <Icon arrow_upward></Icon>95,00 €
      </div>
      <div class="report-subtitle">
        dont 0,00 € ce mois-ci
      </div>
    </Card>
  </template>
  <template #step-2>
    <Icon account_circle size="12px" padding="30px 2px" />
    <Icon account_circle size="16px" padding="28px 2px" color="primary" />
    <Icon account_circle padding="24px 2px" color="blue"/>
    <Icon account_circle size="36px" padding="18px 2px" color="red" />
    <Icon account_circle size="52px" padding="10px 2px" color="gray-400" />
    <Icon account_circle size="72px" color="#55aaff" />
  </template>
  <template #step-3>
    <Input sm label="Small"/>
    <Input md label="Medium"/>
    <Input lg label="Large"/>
  </template>
  <template #footer></template>
</Step>
`.slice(1)

export default {
  usage
}
