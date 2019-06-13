<template>
  <div class="accordion-wrapper">
    <Collapser :opened.sync="accordion.open"
               :label="getLabel(accordion.label, index)"
               v-for="(accordion, index) in value"
               :key="index">
      <slot :name="accordion.name"></slot>
    </Collapser>
  </div>
</template>

<script>
  import Collapser from './Collapser';

  export default {
    name: 'Accordion',
    components: {Collapser},
    props: {
      value: Array
    },
    methods: {
      getLabel(label, index) {
        return `${++index}. ${label}`
      }
    }
  }
</script>

<style lang="less">
  @import '../styles/vars';

  .accordion-wrapper {
    width: 100%;

    .collapser {
      margin-bottom: unset;
      padding-bottom: 1px;
      box-shadow: inset 0 -1px 0 0 @color-gray-300;

      .top {
        height: 56px;

        & > div {
          justify-content: left;
        }

        .title {
          height: 24px;
          font-family: Lato;
          font-size: 18px;
          line-height: 24px;
          flex: none;
          text-transform: none;
          letter-spacing: normal;
          font-weight: normal;
          margin-left: 12px;
        }

        .icon-wrapper {
          margin-left: 10px;
        }
      }
    }
  }
</style>
