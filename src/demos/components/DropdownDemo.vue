<template>
  <div class="row-col">
    <h3>Dropdown</h3>

    Dropdown that can hold different things

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <Button
      ref="dropButton"
      @click="dropdownOpened = !dropdownOpened"
    >
      Position
    </Button>
    <Dropdown
      :target="$refs.dropButton"
      :opened="dropdownOpened"
      :position="position"
    >
      <div class="position-menu">
        Position:<br />

        <template v-for="option in positions">
          <input type="radio" :id="option" :value="option" v-model="position">
          <label :for="option">{{ option }}</label>
          <br />
        </template>
      </div>
    </Dropdown>
  </div>
</template>

<script>
import Button from '../../components/Button.vue'
import Dropdown from '../../components/Dropdown.vue'

let usage = `
<Button
  ref="dropButton"
  @click="dropdownOpened = !dropdownOpened"
>
  Position
</Button>
<Dropdown
  :target="$refs.dropButton"
  :opened="dropdownOpened"
  :position="position"
>
  <div class="position-menu">
    Position:<br />

    <template v-for="option in positions">
      <input type="radio" :id="option" :value="option" v-model="position">
      <label :for="option">{{ option }}</label>
      <br />
    </template>
  </div>
</Dropdown>
`.slice(1)

export default {
  name: 'DropdownDemo',
  components: {Button, Dropdown},
  data: () => ({
    usage,
    dropdownOpened: false,
    position: 'bottom-right',
    positions: [
      'bottom-left',
      'bottom-middle',
      'bottom-right',
      'left-bottom',
      'left-center',
      'left-top',
      'right-bottom',
      'right-center',
      'right-top',
      'top-left',
      'top-middle',
      'top-right',
    ]
  }),
}
</script>

<style>
.position-menu {
  display: inline-block;
  border-radius: 2px;
  box-shadow: 0 2px 12px 1px rgba(0,0,0,0.2);
  padding: 20px;
  background: white;
}
</style>
