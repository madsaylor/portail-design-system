<!--
  Collapser component for displaying collapsible content

  Usage:

  <Collapser :opened.sync="openUsage"  -  Responsible on open status of Collapser component
             :label="label">           -  Label of collapser component

    Collapser content...
  </Collapser>
-->

<template>
    <div class="ds-collapser" :style="{backgroundColor: bgColor}">
      <div
        class="top"
        :style="{backgroundColor: bgColor}"
        @click="onCollapserClick"
      >
        <div class="title" :style="{textAlign: titleAlignment}">{{label}}</div>
        <div class="icon-wrapper">
          <Icon color="#3F4352" :source="opened ? 'expand_less' : 'expand_more'"></Icon>
        </div>
      </div>
      <div class="body" :style="{backgroundColor: bgColor}" v-show="opened">
        <slot></slot>
      </div>
    </div>
</template>

<script>
    import Icon from './Icon';

    export default {
      components: { Icon },
      name: 'Collapser',
      props: {
          label: String,
          opened: Boolean,
          titleAlignment: {
            type: String,
            default: 'center'
          },
          bgColor: {
            type: String,
            default: '#ffffff'
          }
      },
      methods: {
        onCollapserClick() {
          this.$emit('update:opened', !this.opened)
        }
      }
    }
</script>

<style lang="less">
  @import "../styles/vars";

    .ds-collapser {
      display: flex;
      width: 100%;
      flex-direction: column;
      box-shadow: @card-shadow;
      margin-bottom: @collapser-margin-bottom;
      cursor: pointer;

      .top {
        display: flex;
        width: 100%;
        height: 40px;
        align-items: center;

        background-color: white;
        .font-components-button-normal-alt-dark();

        & > div {
          display: flex;
          justify-content: center;
        }

        .title {
          flex: 1;
          padding-left: 15px;
          padding-right: 15px;
          display: block;
        }

        .icon-wrapper {
          width: 50px;
        }
      }

      .body {
        padding: @collapser-body-padding;
        background-color: white;
      }
    }
</style>
