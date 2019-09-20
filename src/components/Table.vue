<!--
  Table component for displaying list of data

  Usage:

  <Table v-model="value"                    - Data for displaying table
         :range="range"                     - Object is provide start and end data range points for displaying on
                                              current page
         :headers="headers"                 - Array of object which contains key value of data, and title of the columns
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
          :style="getFlex(header)"
          :key="index"
        >
          <span>{{header.title}}</span>
          <span v-if="header.sortable" class="icons-wrapper">
            <div @click="sortAsc(header)">▲</div>
            <div @click="sortDsc(header)">▼</div>
          </span>
        </div>
      </Card>
    </div>

    <div class="ds-table-body-wrapper">
      <div
        class="ds-table-body"
        v-for="(data, dataIndex) in getData"
        :key="dataIndex"
        @click="onClick(data, dataIndex)"
      >
        <Card class="ds-data-wrapper">
          <span
            v-for="(value, index) in headers"
            :style="getFlex(value)"
            :key="index"
          >
            <template v-if="value.badge">
              <Badge :color="getBadgeColor(data, value)" >{{ getCellValue(data, value) }}</Badge>
            </template>
            <template v-else>
              {{ getCellValue(data, value) }}
            </template>
          </span>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>

  const COLORS_BY_STATUS = {
    cancelled: '#30302d',
    refunded: '#3B9AE3',
    partial_refunded: '#52a0d8',
    draft: '#9e9e9e',
    paid_with_deposit: '#66bb6a',
    paid: '#66bb6a',
    converted: '#66bb6a',
    expired: '#ef5350',
    pending_with_paid_deposit: '#68b7a3',
    pending_with_deposit_pending: '#ffa726',
    waiting: '#ffa726',
    sent: '#1E88E5',
    default: '#9e9e9e'
  };

  import Card from './Card'
  import Badge from './Badge'
  import { get } from 'lodash'

  export default {
    name: 'Table',
    components: {Card, Badge},
    props: {
      value: Array,
      range: Object,
      headers: {
        type: Array,
        default: () => []
      },
      identifierField: String,
    },
    data: () => ({
      internalRange: undefined
    }),
    computed: {
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
      getFlex(header) {
        if (header.width) {
          return {
            flexBasis: header.width
          }
        } else {
          return {
            flex: 1
          }
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
      },
      getCellValue(value, header) {
        let cellValue = `${header.prefix || ''} ${get(value, header.key) || '0'} ${header.suffix || ''}`
        if (header.filter) {
          cellValue = header.filter(cellValue)
        }
        return cellValue
      },
      getBadgeColor(value, header) {
        const cellValue = get(value, header.key)
        return COLORS_BY_STATUS[cellValue] || 'primary'
      },
      sortAsc(header) {
        this.value.sort((a, b) => get(a, header.key) >= get(b, header.key) ? 1 : -1)
      },
      sortDsc(header) {
        this.value.sort((a, b) => get(a, header.key) <= get(b, header.key) ? 1 : -1)
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
      @media screen and (max-width: 551px) {
        display: none;
      }

      .ds-header-wrapper {
        display: flex;
        height: 20px;
        color: @color-gray-500;
        font-family: Lato;
        font-size: 14px;
        line-height: 20px;
        padding: 0 24px 16px;
        cursor: default;
        background-color: transparent;
        box-shadow: none;

        .ds-header {
          text-align: right;
          display: flex;
          justify-content: flex-end;
          align-items: center;

          .icons-wrapper {
            line-height: 10px;
            margin-left: 10px;
            font-size: 8px;
          }

          &:first-child {
            text-align: left;
            justify-content: flex-start;
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

          @media screen and (max-width: 551px) {
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 16px 16px 12px 16px;
          }

          span {
            &:first-child {
              text-align: left;
            }

            @media screen and (max-width: 551px) {
              font-size: 14px;

              &:first-child {
                flex-basis: 100% !important;
                font-size: 16px;
                line-height: 24px;
                margin-bottom: 16px;
              }

              &:nth-child(2) {
                text-align: left;
              }
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
