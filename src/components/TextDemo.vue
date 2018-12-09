<template>
  <div class="grid">
    <div class="row-col">
      <h2>Fonts</h2>
      <h3>Asap</h3>
      To embed the font into a webpage, copy this code into the &lt;head&gt;
      of your HTML document.:
      <pre v-highlightjs=linkSnippet><code class="html"></code></pre>
      Use the following CSS rules to specify these families:
      <pre v-highlightjs=useSnippet><code class="css"></code></pre>
      <h2>Font Styles</h2>
      <div
        v-for="fontStyle in fontStyles"
        :class="['card', 'font-style-demo', fontStyle]"
      >.{{ fontStyle }}()</span>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TextDemo',
  data: () => ({
    linkSnippet: ('<link href="https://fonts.googleapis.com/css?family=' +
                  'Asap:400,400i,500,600,600i,700,700i" rel="stylesheet">'),
    useSnippet: `font-family: 'Asap', sans-serif;`,
    fontStyles: [
      'font-desktop-body-medium-dark',
      'font-desktop-body-medium-dark-right',
      'font-desktop-body-medium-gray',
      'font-desktop-body-medium-light-gray',
      'font-desktop-body-medium-primary',
      'font-desktop-body-regular-dark',
      'font-desktop-body-regular-gray',
      'font-desktop-h-2-dark',
      'font-desktop-h-3-dark',
      'font-desktop-small-italic-gray',
      'font-desktop-small-medium-dark',
      'font-desktop-small-regular-dark',
      'font-desktop-small-regular-dark-right',
      'font-desktop-small-regular-gray',
      'font-desktop-small-regular-gray-right',
      'font-desktop-small-regular-light-gray',
      'font-desktop-x-small-regular-gray',
    ],
  }),
}
</script>

<style lang="less">
@import '../styles/vars.less';

.font-style-demo {
  margin-bottom: @vu * 2;
  height: @vu * 8;
}

.font-desktop-body-medium-dark {
  .font-desktop-body-medium-dark();
}
.font-desktop-body-medium-dark-right {
  .font-desktop-body-medium-dark-right();
}
.font-desktop-body-medium-gray {
  .font-desktop-body-medium-gray();
}
.font-desktop-body-medium-light-gray {
  .font-desktop-body-medium-light-gray();
}
.font-desktop-body-medium-primary {
  .font-desktop-body-medium-primary();
}
.font-desktop-body-regular-dark {
  .font-desktop-body-regular-dark();
}
.font-desktop-body-regular-gray {
  .font-desktop-body-regular-gray();
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
.font-desktop-small-medium-dark {
  .font-desktop-small-medium-dark();
}
.font-desktop-small-regular-dark {
  .font-desktop-small-regular-dark();
}
.font-desktop-small-regular-dark-right {
  .font-desktop-small-regular-dark-right();
}
.font-desktop-small-regular-gray {
  .font-desktop-small-regular-gray();
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
