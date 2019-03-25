<template>
  <div class="row-col">
    <h3>Card</h3>

    Basic styled component: background, padding, shadow.

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <div class="grid">
      <div class="row-col"><Card>Hello, World!</Card></div>

      <div class="row">
        <div class="col-4">
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
        </div>
        <div class="col-4">
          <Card class="dashboard-report">
            <div class="report-title">
              Factures en attente
            </div>
            <div class="report-amount yellow">
              <Icon arrow_upward></Icon>43,00 €
            </div>
            <div class="report-subtitle">
              0 facture(s) en attente
            </div>
          </Card>
        </div>
        <div class="col-4">
          <Card class="dashboard-report">
            <div class="report-title">
              Factures impayées
            </div>
            <div class="report-amount red">
              <Icon arrow_upward></Icon>95,00 €
            </div>
            <div class="report-subtitle">
              0 facture(s) impayée(s)
            </div>
          </Card></div>
      </div>

      <div class="row">
        <div class="col-6">
          <Card class="user-todo">
            <Icon error_outline color="red"></Icon>
            <div class="todo-title">
              Ajout des documents nécessaires
            </div>
            <div class="todo-badge">Needs Response</div>
          </Card>
        </div>
        <div class="col-6">
          <Card class="user-todo">
            <Icon query_builder color="yellow"></Icon>
            <div class="todo-title">
              Ajout des documents nécessaires
            </div>
            <div class="todo-badge">Processing</div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../../components/Card.vue'
import Icon from '../../components/Icon.vue'

let usage = `
<Card>Hello, World!</Card>
<!-- OR -->
<div class="card">Hello, World!</div>

<!-- Dashboard Report card -->
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

<!-- User TODO card -->
<Card class="user-todo">
  <Icon query_builder color="yellow"></Icon>
  <div class="todo-title">
    Ajout des documents nécessaires
  </div>
  <div class="todo-badge">Processing</div>
</Card>
`.slice(1)

export default {
  name: 'CardDemo',
  components: {Card, Icon},
  data: () => ({usage})
}
</script>
