<template>
  <draggable v-model="draggableList" :group="group" @start="drag=true" @end="drag=false">
    <div class="draggable-item" v-for="(element, index) in list" :key="index">
      <Icon menu />
      <span class="title">{{ element.name }}</span>
      <span>{{ element.quantity || '' }}</span>
      <span>{{ element.price || '' }}</span>
      <span>{{ element.percentage || '' }}</span>
      <span>{{ element.total || '' }}</span>
    </div>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import Icon from './Icon'

export default {
  name: 'drag-and-drop',
  components: {
    draggable, Icon
  },
  props: {
    list: Array
  },
  data() {
    return {
      group: { name: 'people', pull: 'clone', put: false }
    }
  },
  computed: {
    draggableList: {
      get() {
        return this.list
      },
      set(value) {
        this.$emit('update:list', value)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.draggable-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  font-size: 14px;
  line-height: 20px;
  border: 1px solid #E6E7EB;
  border-radius: 2px;
  margin-bottom: 12px;

  .title {
    flex-basis: 40%;
  }
}
</style>
