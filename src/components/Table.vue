<!--
  Table component for displaying list of data

  Usage:

  <Table v-model="value"                    - Data for displaying table
         :headers="headers"                 - Array of object which contains configuration of the each rows
         :identifierField="identifierField" - Field which is identifier for emit data from pickup event
         @pickup>                           - Emitted when click on record, will emit current record data or identifier
                                              data with index on current page.
  </Table>
-->

<template>
  <div class="ds-table-wrapper">
    <div class="ds-table-header">
      <Card class="ds-header-wrapper">
        <div class="ds-header"
          v-for="(header, index) in headers"
          :style="getFlex(header)"
          :key="index"
        >
          <div class="ds-title-wrapper" @click="sorting(header)">
            <span class="ds-header-title">{{header.title}}</span>
            <Icon color="#778CA2" v-if="sortKey === header.key" :source="sortType === '+' ? 'arrow_upward' : 'arrow_downward'" size="20px" />
          </div>
          <slot :name="getFilterSlotName(header)"></slot>
        </div>
      </Card>
    </div>

    <div class="ds-table-body-wrapper">
      <div
        class="ds-table-body"
        v-for="(row, dataIndex) in pageItems"
        :key="dataIndex"
        @click="onClick(row, dataIndex)"
      >
        <div class="ds-data-wrapper">
          <span
            v-for="(header, index) in headers"
            :style="getFlex(header)"
            :key="index"
          >
            <slot :name="getSlotName(header)"
                  :value="getCellValue(row, header)"
                  :orgValue="getOrgValue(row, header)"
                  :row="row">
            </slot>

            <template v-if="!hasSlot(header)">
              {{ getCellValue(row, header) }}
            </template>
          </span>
        </div>
      </div>
    </div>

    <div class="ds-table-footer">
      <div v-if="pagination" class="pagination-wrapper">
        <Pagination
          :total="total"
          :pageSize="pageSize"
          :current="current"
          @page:change="updatePage"
        />
      </div>
    </div>
  </div>
</template>

<script>

  const SORT_TYPES = {
    ASC: '+',
    DSC: '-'
  }

  import Card from './Card'
  import Icon from './Icon'
  import Pagination from './Pagination'
  import { get } from 'lodash'

  export default {
    name: 'Table',
    components: {Card, Icon, Pagination},
    props: {
      value: Array,
      headers: {
        type: Array,
        default: () => []
      },
      pagination: Boolean,
      pageSize: Number,
      total: Number,
      current: Number,
      identifierField: String,
    },
    data: () => ({
      sortType: null,
      sortKey: null,
      pageItems: []
    }),
    methods: {
      getSlotName(header) {
        return `cell-${header.key}`
      },
      getFilterSlotName(header) {
        return `filter-${header.key}`
      },
      hasSlot(header) {
        const slotName = `cell-${header.key}`
        return !!this.$scopedSlots[slotName]
      },
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
      getCellValue(value, header) {
        let cellValue = get(value, header.key, '') || ''
        if (header.filter) {
          cellValue = header.filter(cellValue)
        }
        cellValue = `${header.prefix || ''} ${cellValue} ${header.suffix || ''}`
        return cellValue
      },
      getOrgValue(value, header) {
        return get(value, header.key, '')
      },
      sorting(header) {
        if (this.sortKey === header.key && this.sortType === SORT_TYPES.ASC) {
          this.sortType = SORT_TYPES.DSC
        } else {
          this.sortType = SORT_TYPES.ASC
        }
        this.sortKey = header.key

        const sortCombinationKey = (this.sortType + this.sortKey).replace('+', '')
        this.$emit('sort', sortCombinationKey)
      },
      updatePage(page) {
        this.$emit('update:page', page)
      }
    },
    mounted() {
      this.pageItems = this.value
    },
    watch: {
      value(val) {
        this.pageItems = val
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .ds-table-wrapper {
    color: @color-gray-500;

    .ds-table-header {
      @media screen and (max-width: 551px) {
        display: none;
      }

      .ds-header-wrapper {
        display: flex;
        font-family: Roboto Medium;
        font-size: 12px;
        line-height: 20px;
        padding: 0 0 14px;
        cursor: default;
        background-color: transparent;
        box-shadow: none;

        .ds-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          cursor: pointer;
          padding-right: 16px;
          box-sizing: border-box;

          .ds-title-wrapper {
            width: 100%;
            margin-bottom: 8px;

            .ds-header-title {
              font-size: 12px;
              line-height: 14px;
              text-transform: uppercase;
            }
          }

          &::v-deep {
            > * {
              width: 100% !important;
            }
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
          padding: 10px 0;
          margin-bottom: 6px;
          background-color: @color-white;
          align-items: center;

          @media screen and (max-width: 551px) {
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 16px 16px 12px 16px;
          }

          span {
            box-sizing: border-box;
            padding-right: 16px;

            &::v-deep {
              > * {
                max-width: 100%;
              }
            }

            @media screen and (max-width: 551px) {
              font-size: 14px;
            }

            &:first-child {
              padding-left: 12px;
            }

            &:last-child {
              padding-right: 12px;
            }
          }

          &:hover {
            background-color: rgba(30, 179, 134, 0.05);
          }
        }

        &:last-child {
          .ds-data-wrapper {
            margin-bottom: 24px;
          }
        }
      }
    }

    .ds-table-footer {
      .pagination-wrapper {
        display: flex;
        justify-content: flex-end;
        margin-top: 45px;
      }
    }
  }
</style>
