<template>
  <div class="row-col">
    <h3>Drag And Drop</h3>

    <Description compnent-name="DragAndDrop"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <DragAndDrop :list="dragList" @update:list="updateDraggableLists" />
  </div>
</template>

<script>
import DragAndDrop from '../../components/DragAndDrop'
import Description from '../../descriptions/Description'
import Collapser from '../../components/Collapser.vue'
import { DragAndDropData } from '../../static/index'

export default {
  name: "DragAndDropDemo",
  components: { DragAndDrop, Description, Collapser },
  data() {
    return ({
      openUsage: true,
      usage: DragAndDropData.usage,
      dragList: [
        { name: 'item 1', quantity: '1', price: '$42 303,43', percentage: '44%', total: '$42 303,43' },
        { name: 'item 2', quantity: '2', price: '$42 303,43', percentage: '44%', total: '$42 303,43' },
        { name: 'item 3', quantity: '6', price: '$42 303,43', percentage: '44%', total: '$42 303,43' },
        { name: 'item 4', quantity: '8', price: '$42 303,43', percentage: '44%', total: '$42 303,43' },
        { name: 'item 5', quantity: '1', price: '$42 303,43', percentage: '44%', total: '$42 303,43' },
        { name: 'item 6', quantity: '1', price: '$42 303,43', percentage: '44%', total: '$42 303,43' }
      ]
    })
  },
  methods: {
    updateDraggableLists(value) {
      this.dragList = [...value]
    }
  }
}
</script>