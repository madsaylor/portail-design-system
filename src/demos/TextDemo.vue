<template>
  <div class="grid">
    <div class="row-col">
      <h2>Fonts</h2>
      <h3>Asap</h3>
      To embed the font into a webpage, copy this code into the &lt;head&gt;
      of your HTML document.:
      <pre v-highlightjs=linkSnippet><code class="html"></code></pre>
      <h2>Font mixins</h2>
      <h3>Usage with Less</h3>
      <pre v-highlightjs="usageLess"><code class="less"></code></pre>

      <h3>Style list</h3>
    </div>
    <div class="row">
      <div class="col-6" v-for="fontStyle in fontStyles">
        <div :class="['card', 'font-style-demo', fontStyle]">
          .{{ fontStyle }}()
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let usageLess = `
@import '~@betao/ds/vars';

.some-class {
  .font-desktop-body-medium-dark-center();
}
`.slice(1)

export default {
  name: 'TextDemo',
  data: () => ({
    linkSnippet: ('<link href="https://fonts.googleapis.com/css?family=' +
                  'Asap:400,400i,500,600,600i,700,700i" rel="stylesheet">'),
    usageLess,
    fontStyles: [
      'font-button-big',
      'font-button-normal',
      'font-button-normal-alt',
      'font-desktop-body-medium-dark',
      'font-desktop-body-medium-dark-center',
      'font-desktop-body-medium-dark-right',
      'font-desktop-body-medium-gray',
      'font-desktop-body-medium-gray-center',
      'font-desktop-body-medium-light-gray',
      'font-desktop-body-medium-light-gray-center',
      'font-desktop-body-medium-primary',
      'font-desktop-body-medium-primary-center',
      'font-desktop-body-regular-accent',
      'font-desktop-body-regular-dark',
      'font-desktop-body-regular-dark-center',
      'font-desktop-body-regular-gray',
      'font-desktop-body-regular-gray-center',
      'font-desktop-components-field-helper-default',
      'font-desktop-components-field-helper-error',
      'font-desktop-h-2-dark',
      'font-desktop-h-3-dark',
      'font-desktop-small-italic-gray',
      'font-desktop-small-medium-accent-center',
      'font-desktop-small-medium-dark',
      'font-desktop-small-medium-dark-center',
      'font-desktop-small-regular-dark',
      'font-desktop-small-regular-dark-center',
      'font-desktop-small-regular-dark-right',
      'font-desktop-small-regular-gray',
      'font-desktop-small-regular-gray-center',
      'font-desktop-small-regular-gray-right',
      'font-desktop-small-regular-light-gray',
      'font-desktop-x-small-regular-gray',
    ],
  }),
}
</script>

<style lang="less">
@import '~@/styles/vars';

.font-style-demo {
  margin-bottom: @vu * 2;
}

.font-button-big {
  .font-button-big();
  &.card { background: @color-brand; }
}
.font-button-normal {
  .font-button-normal();
  &.card { background: @color-brand; }
}
.font-button-normal-alt {
  .font-button-normal-alt();
}
.font-desktop-body-medium-dark {
  .font-desktop-body-medium-dark();
}
.font-desktop-body-medium-dark-center {
  .font-desktop-body-medium-dark-center();
}
.font-desktop-body-medium-dark-right {
  .font-desktop-body-medium-dark-right();
}
.font-desktop-body-medium-gray {
  .font-desktop-body-medium-gray();
}
.font-desktop-body-medium-gray-center {
  .font-desktop-body-medium-gray-center();
}
.font-desktop-body-medium-light-gray {
  .font-desktop-body-medium-light-gray();
}
.font-desktop-body-medium-light-gray-center {
  .font-desktop-body-medium-light-gray-center();
}
.font-desktop-body-medium-primary {
  .font-desktop-body-medium-primary();
}
.font-desktop-body-medium-primary-center {
  .font-desktop-body-medium-primary-center();
}
.font-desktop-body-regular-accent {
  .font-desktop-body-regular-accent();
}
.font-desktop-body-regular-dark {
  .font-desktop-body-regular-dark();
}
.font-desktop-body-regular-dark-center {
  .font-desktop-body-regular-dark-center();
}
.font-desktop-body-regular-gray {
  .font-desktop-body-regular-gray();
}
.font-desktop-body-regular-gray-center {
  .font-desktop-body-regular-gray-center();
}
.font-desktop-components-field-helper-default {
  .font-desktop-components-field-helper-default();
}
.font-desktop-components-field-helper-error {
  .font-desktop-components-field-helper-error();
}
.font-desktop-h-2-dark {
  .font-desktop-h-2-dark();
}
.font-desktop-h-3-dark {
  .font-desktop-h-3-dark();
}
.font-desktop-small-italic-gray {
  .font-desktop-small-italic-gray();
}
.font-desktop-small-medium-accent-center {
  .font-desktop-small-medium-accent-center();
}
.font-desktop-small-medium-dark {
  .font-desktop-small-medium-dark();
}
.font-desktop-small-medium-dark-center {
  .font-desktop-small-medium-dark-center();
}
.font-desktop-small-regular-dark {
  .font-desktop-small-regular-dark();
}
.font-desktop-small-regular-dark-center {
  .font-desktop-small-regular-dark-center();
}
.font-desktop-small-regular-dark-right {
  .font-desktop-small-regular-dark-right();
}
.font-desktop-small-regular-gray {
  .font-desktop-small-regular-gray();
}
.font-desktop-small-regular-gray-center {
  .font-desktop-small-regular-gray-center();
}
.font-desktop-small-regular-gray-right {
  .font-desktop-small-regular-gray-right();
}
.font-desktop-small-regular-light-gray {
  .font-desktop-small-regular-light-gray();
}
.font-desktop-x-small-regular-gray {
  .font-desktop-x-small-regular-gray();
}
</style>
