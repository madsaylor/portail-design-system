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
      <div class="pagination-body" v-for="client in getClients">
        <Card class="client-wrapper">
        <span v-for="(value, key, index) in client"
              :style="getFlex(index)">
          {{value}}
        </span>
        </Card>
      </div>
    </div>
    <div class="pagination-count">
      <span class="count">{{this.startNumber}}-{{this.endNumber}} of {{count}}</span>
      <Icon source="left-arrow" size="12px" padding="28px 24px 0px" @click="previous" :disabled="current === 1"/>
      <Icon source="right-arrow" size="12px" padding="28px 0px 0px" @click="next"/>
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
        }
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
        getClients() {
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

        .header {
          text-transform: capitalize;
        }
      }
    }

    .pagination-body-wrapper {
      .pagination-body {
        .client-wrapper {
          display: flex;
          margin-bottom: 16px;
        }
      }
    }

    .pagination-count {
      display: flex;
      justify-content: flex-end;

      .count {
          padding: 24px 0 0;
      }

      .icon {
        &:disabled {
          pointer-events: none;
          svg {
            fill: @color-gray-300;
          }
        }
      }
    }
  }
</style>
