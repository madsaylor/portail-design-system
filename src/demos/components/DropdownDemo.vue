<template>
  <div class="row-col dropdown-demo">
    <h3>Dropdown</h3>

    Dropdown that can hold different things

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <Button ref="dropButton" @click="dropdownOpened = !dropdownOpened">
      Choose position
    </Button>
    <Dropdown
      :target="$refs.dropButton"
      :opened.sync="dropdownOpened"
      :position="position"
    >
      <div class="dropdown-content">
        Position:<br />

        <template v-for="option in positions">
          <input type="radio" :id="option" :value="option" v-model="position">
          <label :for="option">{{ option }}</label>
          <br />
        </template>
      </div>
    </Dropdown>

    <Button ref="dropButton2" @click="dropdown2Opened = !dropdown2Opened">
      Simple animation
    </Button>
    <Dropdown
      :target="$refs.dropButton2"
      :opened.sync="dropdown2Opened"
      :position="position"
      just-fade
    >
      <div class="dropdown-content">
        Hello!
      </div>
    </Dropdown>

    <a class="hover-me"
      ref="hoverMe"
      @mouseover="dropdown3Opened = true"
      @mouseleave="dropdown3Opened = false"
    >Hover me!</a>
    <Dropdown
      :target="$refs.hoverMe"
      :opened.sync="dropdown3Opened"
      :position="position"
      just-fade-in
    >
      <div class="dropdown-content">
        Good job!
      </div>
    </Dropdown>

  </div>
</template>

<script>
import Button from '../../components/Button.vue'
import Dropdown from '../../components/Dropdown.vue'

let usage = `
<Button ref="dropButton" @click="dropdownOpened = !dropdownOpened">
  Position
</Button>
<Dropdown
  :target="$refs.dropButton"
  :opened.sync="dropdownOpened"
  :position="position"
>
  ...
</Dropdown>
`.slice(1)

export default {
  name: 'DropdownDemo',
  components: {Button, Dropdown},
  data: () => ({
    usage,
    dropdownOpened: false,
    dropdown2Opened: false,
    dropdown3Opened: false,
    position: 'bottom-right',
    positions: [
      'bottom-left',
      'bottom-middle',
      'bottom-right',
      'left-bottom',
      'left-center',
      'left-top',
      'modal',
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

<style lang="less" scoped>
@import '../../styles/vars';

.dropdown-demo {

  .button {
    margin-right: 8px
  }

  .dropdown-content {
    display: inline-block;
    border-radius: 2px;
    box-shadow: 0 2px 12px 1px rgba(0,0,0,0.2);
    padding: 20px;
    background: white;
  }

  .hover-me {
    border: 1px dashed @color-primary;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 10px;
  }
}
</style>
