<template>
  <div class="ds-autocomplete-wrapper">
    <Input class="ds-autocomplete-input"
           slideLabel
           :sm="sm"
           :md="md"
           :lg="lg"
           :label="label"
           :validators="validators"
           v-model="inputValue"
           ref="autocomplete"
           @inputFocus="autocompleteOpened = true"
           @inputBlur="onInputBlur"
           :confirmModel="dataListWrapper"
    />

    <Icon v-if="inputValue"
          class="ds-autocomplete-icon"
          close
          :color="iconColor"
          @click="clear()">
    </Icon>

    <Dropdown
      :target="$refs.autocomplete"
      :opened.sync="autocompleteOpened"
      :position="position"
      :transitionTime="0">

      <div class="ds-dropdown-content ds-autocomplete-dropdown-content" v-if="showList">
        <div class="ds-content" v-for="item in dataSearchListWrapper" @click="select(item)">
          <span v-if="item.number">{{item.number}} - </span> {{item.title}}
        </div>
      </div>
    </Dropdown>
  </div>
</template>

<script>
  import Input from './Input'
  import Dropdown from './Dropdown'
  import Icon from './Icon'

  import _ from 'lodash'

  export default {
    name: 'Autocomplete',
    components: {Icon},
    comments: {Input, Dropdown, Icon},
    props: {
      value: String,
      label: String,
      lg: Boolean,
      md: Boolean,
      sm: Boolean,
      dataList: Array,
      validators: Array,
      type: {
        type: String,
        validator(value) {
          return ['custom', 'day', 'month', 'year'].indexOf(value) !== -1
        },
        default: 'custom'
      },
      iconColor: {
        type: String,
        default: 'gray-500'
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
      getDataString(value) {
        let dataStr = ''

        if (value.number) {
          dataStr = `${value.number} - `
        }

        dataStr = dataStr + value.title

        return dataStr
      },
      searchData() {
        let searchString = this.inputValue
        searchString = searchString.toLowerCase()

        this.searchResults = this.dataListWrapper.filter((data) => {
          return ~this.getDataString(data).toString().toLowerCase().indexOf(searchString)
        })

        this.searchId = undefined
      },
      select(value) {
        this.inputValue = this.getDataString(value)
      },
      clear() {
        this.inputValue = ''
      },
      onInputBlur() {
        setTimeout(() => {
          this.autocompleteOpened = false
        }, 100)
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

<style lang="less">
  @import '../styles/vars';

  .ds-autocomplete-wrapper {
    margin-bottom: 15px;

    .ds-autocomplete-input {
      .ds-slide-label {
        top: 26px !important;
        margin-left: 7px;

        &.ds-slide-label-active {
          top: 22px !important;

          &.ds-label-error {
            color: @color-red;
          }
        }

        &.ds-label-error {
          color: @color-red;
        }
      }

      input {
        height: 50px !important;
        border: 2px solid #e2e2e2 !important;
        border-radius: 5px !important;
        padding-bottom: 2px !important;

        font-size: 16px !important;
        padding-left: 20px !important;
        font-weight: 400 !important;
        font-family: Roboto, sans-serif !important;
        color: #989898 !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;

        &.ds-error {
          color: @color-red !important;
          border-color: @color-red !important;
        }

        &:focus {
          color: rgba(0,0,0,0.87) !important;
        }
      }
    }

    .ds-autocomplete-icon {
      position: relative;
      right: 30px;
      bottom: 12px;
      cursor: pointer;
    }

    .ds-autocomplete-dropdown-content {
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

    .ds-drawer {
      margin-top: 3px;
    }

    @media (max-width: 991px) {
      .ds-autocomplete-input {
        width: 100% !important;
      }
    }
  }
</style>
