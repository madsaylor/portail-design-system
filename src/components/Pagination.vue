<!--
  Pagination component for display data like table with pagination

  Usage:

  <Pagination :count="count"        - Length of data array
              :size="size"          - Size of records which is displaying on one page
              :current="current"    - Current page which is displayed
              @getCurrent>          - Emitted event on local change of current page value in pagination component and take back local current page value
      Pagination content...
  </Pagination>
-->

<template>
  <div class="pagination-wrapper">
    <slot :range="range"></slot>
    <div class="pagination-count">
      <span class="count">
        {{this.startNumber}}-{{this.endNumber}} of {{count}}
      </span>
      <Icon source="left-arrow"
            size="12px"
            padding="8px 24px 0px"
            @click="previous"
            :disabled="currentPage === 1"/>
      <Icon source="right-arrow"
            size="12px"
            padding="8px 8px 0px 0px"
            @click="next"
            :disabled="currentPage * size > count"/>
    </div>
  </div>
</template>

<script>
  import Icon from './Icon'

    export default {
      name: 'Pagination',
      components: {Icon},
      props: {
        count: Number,
        size: Number,
        current: Number
      },
      data: () => ({
        paginationCurrent: undefined
      }),
      computed: {
        startNumber() {
          return (this.currentPage - 1) * this.size + 1
        },
        endNumber() {
          let temporaryCount = this.currentPage * this.size
          return temporaryCount > this.count ? this.count : temporaryCount
        },
        range() {
          return {
            start: this.startNumber,
            end: this.endNumber
          }
        },
        currentPage: {
          get() {
            return this.paginationCurrent
          },
          set(value) {
            this.paginationCurrent = value
          }
        }
      },
      methods: {
        previous() {
          this.currentPage--
          this.$emit('getCurrent', this.currentPage)
        },
        next() {
          this.currentPage++
          this.$emit('getCurrent', this.currentPage)
        }
      },
      mounted() {
        this.currentPage = this.current
      },
      watch: {
        current(newValue) {
          this.currentPage = newValue
        }
      }
    }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .pagination-wrapper {
    .pagination-count {
      display: flex;
      justify-content: flex-end;

      .count {
        cursor: default;
        padding: 0;
        margin: 2px 0;
        height: 20px;
        color: @color-gray-500;
      }

      .icon {
        cursor: pointer;

        &[disabled] {
          pointer-events: none;
          fill: @color-gray-400;
        }
      }
    }
  }
</style>
