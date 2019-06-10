<template>
  <div class="pagination-wrapper" v-if="value.length">
    <div class="pagination-header">
      <Card class="header-wrapper">
        <div class="header"
             v-for="(header, index) in headers"
             :style="getFlex(index)">
          {{header}}
        </div>
      </Card>
    </div>
    <div class="pagination-body-wrapper">
      <div class="pagination-body" v-for="(data, dataIndex) in getData" @click="onClick(data, dataIndex)">
        <Card class="data-wrapper">
        <span v-for="(value, key, index) in data"
              :style="getFlex(index)">
          {{value}}
        </span>
        </Card>
      </div>
    </div>
    <div class="pagination-count">
      <span class="count">{{this.startNumber}}-{{this.endNumber}} of {{count}}</span>
      <Icon source="left-arrow" size="12px" padding="8px 24px 0px" @click="previous" :disabled="current === 1"/>
      <Icon source="right-arrow" size="12px" padding="8px 8px 0px 0px" @click="next" :disabled="current * size > count"/>
    </div>
  </div>
</template>

<script>
  import Icon from './Icon'
  import Card from './Card'

    export default {
      name: 'Pagination',
      components: {Icon, Card},
      props: {
        value: Array,
        count: Number,
        size: Number,
        current: Number,
        ratios: {
          type: Array,
          default: () => new Array(100).fill('1')
        },
        identifierField: String
      },
      computed: {
        startNumber() {
          return (this.current - 1) * this.size + 1
        },
        endNumber() {
          let temporaryCount = this.current * this.size
          return temporaryCount > this.count ? this.count : temporaryCount
        },
        headers() {
          return Object.keys(this.value[0])
        },
        getData() {
          return this.value.slice(this.startNumber - 1, this.endNumber)
        }
      },
      methods: {
        previous() {
          this.$emit('previous')
        },
        next() {
          this.$emit('next')
        },
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
        }
      }
    }
</script>

<style lang="less" scoped>
  @import '../styles/vars';

  .pagination-wrapper {
    width: 960px;

    .pagination-header {
      .header-wrapper {
        display: flex;
        height: 20px;
        color: @color-gray-500;
        font-family: Lato;
        font-size: 14px;
        line-height: 20px;
        padding: 0 24px 16px;
        cursor: default;

        .header {
          text-transform: capitalize;
          text-align: right;

          &:first-child {
            text-align: left;
          }
        }
      }
    }

    .pagination-body-wrapper {
      color: @color-dark;
      font-family: Lato;
      font-size: 14px;
      line-height: 20px;
      cursor: pointer;

      .pagination-body {
        .data-wrapper {
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
          .data-wrapper {
            margin-bottom: 24px;
          }
        }
      }
    }

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
