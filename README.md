# Portail Design System

Vue components library for Portail project.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
<!--
### Run your tests
```
npm run test
```
 -->
### Lints and fixes files
```
npm run lint
```

## Adding new components

1. Create a new ***MyComponent*.vue** file in src/components using this
  template:


```vue
<!--
  Component description

  Usage:

    <MyComponent
      :prop1="..."  - Short description of prop1
      :prop2="..."  - Short description of prop2
      @event="..."  - Short description of event
    >
      Hello, World!
    </MyComponent>

  Properties:

    ...

  Events:

    ...
-->

<template>
  <div class="my-component">
    ...
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  props: {
    ...
  },
  data: () => ({
    ...
  }),
}
</script>

<style lang="less">
.my-component {
  ...
}
</style>
```

2. Create a new ***MyComponent*Demo.vue** file in src/demos/components with
this template:

```vue
<template>
  <div class="row-col">
    <h3>MyComponent</h3>

    Description

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <MyComponent>Hello, World!</MyComponent>
  </div>
</template>

<script>
import MyComponent from '../../components/MyComponent.vue'

let usage = `
<MyComponent>Hello, World!</MyComponent>
`.slice(1)

export default {
  name: 'MyComponentDemo',
  components: {MyComponent},
  data: () => ({usage}),
}
</script>
```

3. Push your changes and [Open a PR]

[Open a PR]: https://github.com/betao-dev/portail-design-system/pulls
