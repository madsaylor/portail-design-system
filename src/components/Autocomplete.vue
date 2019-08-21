<template>
  <div class="ds-autocomplete-wrapper">

    <Input class="ds-autocomplete-input"
           slideLabel
           md
           label="Slide label"
           v-model="inputValue"
           ref="autocomplete"
           @inputFocus="autocompleteOpened = true"
           @inputBlur="autocompleteOpened = false"
    />

    <Dropdown
      :target="$refs.autocomplete"
      :opened.sync="autocompleteOpened"
      :position="position">

      <div class="ds-dropdown-content" v-if="showList">
        <div class="ds-content" v-for="item in dataSearchListWrapper">
          <span v-if="item.number">{{item.number}} - </span> {{item.title}}
        </div>
      </div>

    </Dropdown>
  </div>
</template>

<script>
  import Input from './Input'
  import Dropdown from './Dropdown'

  import _ from 'lodash'

  export default {
    name: 'Autocomplete',
    comments: {Input, Dropdown},
    props: {
      value: String,
      type: {
        type: String,
        validator(value) {
          return ['custom', 'day', 'month', 'year'].indexOf(value) !== -1
        },
        default: 'custom'
      },
      dataList: {
        type: Array
      }
    },
    data: () => ({
      autocompleteOpened: false,
      position: 'bottom-right',
      bday: undefined,
      searchId: undefined,
      searchResults: undefined
    }),
    computed: {
      dataSearchListWrapper() {
        return this.searchResults || this.dataListWrapper
      },
      dataListWrapper() {
        if (this.type === 'day' || this.type === 'month' || this.type === 'year') {
          return this.bday
        } else {
          return this.dataList
        }
      },
      inputValue: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      },
      showList() {
        return this.dataListWrapper && this.dataListWrapper.length || this.dataSearchListWrapper && this.dataSearchListWrapper.length
      }
    },
    methods: {
      getDaysRange(N) {
        let days = Array.from({length: N}, (v, k) => k++)
        days.splice(0, 1)

        return days.map((dayNumber) => {
          return {
            title: dayNumber
          }
        })
      },
      getMonths() {
        let monthNumber
        let months = []
        let month = new Date(2019, 0)

        for (let i = 0; i < 12; i++) {
          monthNumber = month.getMonth() + 1

          if (monthNumber < 10) {
            monthNumber = '0' + monthNumber.toString()
          }

          months.push({
            number: monthNumber,
            title: _.capitalize(month.toLocaleString(_.get(window, `dsLang`, 'fr'), {month: 'long'}))
          })

          month.setMonth(monthNumber)
        }

        return months
      },
      getYears() {
        let years = []
        let year = new Date()
        year.setFullYear(year.getFullYear() - 16)

        for (let i = 0; i < 117; i++) {
          years.push({title: year.getFullYear()})
          year.setFullYear(year.getFullYear() - 1)
        }

        return years
      },
      checkAutocompleteData() {
        if (this.type === 'day') {
          this.bday = this.getDaysRange(32)
        } else if (this.type === 'month') {
          this.bday = this.getMonths()
        } else if (this.type === 'year') {
          this.bday = this.getYears()
        }
      },
      searchData() {
        let searchString = this.inputValue
        searchString = searchString.toLowerCase()

        this.searchResults = this.dataListWrapper.filter((data) => {
          let dataStr = ''

          if (data.number) {
            dataStr = `${data.number} - `
          }

          dataStr = dataStr + data.title
          return ~dataStr.toString().toLowerCase().indexOf(searchString)
        })
        this.searchId = undefined
      }
    },
    watch: {
      value() {
        if (!this.searchId) {
          this.searchId = setTimeout(() => this.searchData(), 300)
        }
      }
    },
    mounted() {
      this.checkAutocompleteData()
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .ds-autocomplete-wrapper {

    .ds-autocomplete-input {
      /*border: 2px solid #e2e2e2;*/
      /*border-radius: 5px;*/
      /*height: 50px;*/
      /*padding-left: 20px;*/
      /*padding-right: 30px;*/
    }

    .ds-dropdown-content {
      display: inline-block;
      border-radius: 2px;
      box-shadow: @card-shadow;
      background: white;
      height: auto;
      max-height: 240px;
      overflow-y: auto;

      .ds-content {
        cursor: pointer;
        font-size: 14px;
        overflow: hidden;
        padding: 0 15px;
        line-height: 48px;
        height: 48px;

        &:hover {
          background-color: @color-gray-200;
        }
      }
    }
  }
</style>
