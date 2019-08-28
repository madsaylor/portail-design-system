let usage = `
<Autocomplete v-model="chosenDay"
              type="day"
              label="Day"
              :validators="validators"
              :daysMounth="28"
              minWidth="100px"
              required>
</Autocomplete>

<Autocomplete v-model="chosenMonth"
              type="month"
              label="Month"
              :validators="validators"
              minWidth="150px"
              required>
</Autocomplete>

<Autocomplete v-model="chosenYear"
              type="year"
              label="Year"
              :validators="validators"
              minWidth="100px"
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
