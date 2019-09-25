let usage = `
<Chips v-model="simpleChips"></Chips>

<Chips v-model="chips"
       :removable="true"
       :label="label"
       :placeholder="placeholder"
       :validators="validators">
</Chips>
`.slice(1)

export default {
  usage
}
