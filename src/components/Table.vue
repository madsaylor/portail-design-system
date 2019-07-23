<!--
  Table component for displaying list of data

  Usage:

  <Table v-model="value"                    - Data for displaying table
         :range="range"                     - Object is provide start and end data range points for displaying on
                                              current page
         :ratios="ratios"                   - Array for set up flex ratio between field of record
         :identifierField="identifierField" - Field which is identifier for emit data from pickup event
         @pickup>                           - Emitted when click on record, will emit current record data or identifier
                                              data with index on current page.
  </Table>
-->

<template>
  <div class="ds-table-wrapper" v-if="getRange">
    <div class="ds-table-header">
      <Card class="ds-header-wrapper">
        <div class="ds-header"
             v-for="(header, index) in headers"
             :style="getFlex(index)">
          {{header}}
        </div>
      </Card>
    </div>
    <div class="ds-table-body-wrapper">
      <div class="ds-table-body" v-for="(data, dataIndex) in getData" @click="onClick(data, dataIndex)">
        <Card class="ds-data-wrapper">
      <span v-for="(value, key, index) in data"
            :style="getFlex(index)">
        {{value}}
      </span>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from './Card'

  export default {
    name: 'Table',
    components: {Card},
    props: {
      value: Array,
      range: Object,
      ratios: {
        type: Array,
        default: () => new Array(100).fill('1'),
      },
      identifierField: String,
    },
    data: () => ({
      internalRange: undefined
    }),
    computed: {
      headers() {
        return Object.keys(this.value[0])
      },
      getData() {
        return this.value.slice(this.getRange.start - 1, this.getRange.end)
      },
      getRange: {
        get() {
          return this.internalRange
        },
        set(value) {
          this.internalRange = value
        }
      }
    },
    methods: {
      getFlex(index) {
        return {
          flex: this.ratios[index]
        }
      },
      onClick(data, dataIndex) {
        if (this.identifierField) {
          this.$emit('pickup', data[this.identifierField], dataIndex)
        } else {
          this.$emit('pickup', data, dataIndex)
        }
      },
      checkRange() {
        if (!this.getRange) {
          this.getRange = {
            start: 1,
            end: this.value.length
          }
        }
      }
    },
    watch: {
      range(newValue) {
        this.getRange = newValue
      }
    },
    mounted() {
      this.getRange = this.range
      this.checkRange()
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .ds-table-wrapper {
    .ds-table-header {
      .ds-header-wrapper {
        display: flex;
        height: 20px;
        color: @color-gray-500;
        font-family: Lato;
        font-size: 14px;
        line-height: 20px;
        padding: 0 24px 16px;
        cursor: default;

        .ds-header {
          text-transform: capitalize;
          text-align: right;

          &:first-child {
            text-align: left;
          }
        }
      }
    }

    .ds-table-body-wrapper {
      color: @color-dark;
      font-family: Lato;
      font-size: 14px;
      line-height: 20px;
      cursor: pointer;

      .ds-table-body {
        .ds-data-wrapper {
          display: flex;
          padding: 22px 24px;
          margin-bottom: 16px;
          text-align: right;

          span {
            &:first-child {
              text-align: left;
            }
          }
        }

        &:last-child {
          .ds-data-wrapper {
            margin-bottom: 24px;
          }
        }
      }
    }
  }
</style>
