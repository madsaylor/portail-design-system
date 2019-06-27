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
  usage
}
