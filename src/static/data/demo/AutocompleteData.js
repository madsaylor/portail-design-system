let usage = `
<Autocomplete v-model="chosenDay"
              type="day"
              label="Day"
              :validators="validators"
              required>
</Autocomplete>

<Autocomplete v-model="chosenMonth"
              type="month"
              label="Month"
              :validators="validators"
              required>
</Autocomplete>

<Autocomplete v-model="chosenYear"
              type="year"
              label="Year"
              :validators="validators"
              required>
</Autocomplete>

<Autocomplete v-model="chosenCustom"
              :data-list="dataList"
              label="Custom"
              :validators="validators">
</Autocomplete>
`.slice(1)

export default {
  usage
}
