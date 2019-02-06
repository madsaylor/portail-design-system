<template>
  <div class="grid grid-select-demo">
    <div class="row-col">
      <h3>Grid select</h3>

      Component for displaying grid of items with ability to select one.

      <pre v-highlightjs="usage"><code class="js"></code></pre>
      <GridSelect
        :items="gridItems"
        :labels-top="gridLabels"
        v-model="selected"
        ></GridSelect>
    </div>
  </div>
</template>

<script>
import GridSelect from '../../components/GridSelect'

let usage = `
<GridSelect
  :items="gridItems"
  :labels-top="gridLabels"
  v-model="selected"
></GridSelect>
`.slice(1)

export default {
  name: "GridSelectDemo",
  data: () => ({
    usage,
    selected: {}
  }),
  components: {
    GridSelect
  },
  computed: {
    gridItems() {
      let items = []
      for (let i = 0; i < 4; i++) {
        let row = []
        for (let j = 0; j < 6; j++) {
          let item = {j}
          item.displayValue = j.toString()
          if (j === 0) {
            item.disabled = true
          }
          row.push(item)
        }
        items.push(row)
      }
      return items
    },
    gridLabels() {
      return ['th1','th2','th3','th4','th5','th6']
    }
  }
}
</script>

<style scoped>
 .grid-select-demo {
   width: 50%;
 }
</style>
