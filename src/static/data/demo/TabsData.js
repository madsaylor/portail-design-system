let usage = `<Tabs :tabs="tabs" :active="active" @tab:click="onTabClick"/>`

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
