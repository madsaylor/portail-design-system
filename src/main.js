import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/monokai.css'

import './fonts/lato.css'
import App from './App.vue'


// import and globally register every component form /components
let context = require.context('./components', true, /.*\.vue$/)
context.keys().forEach(key => {
  // Get component config
  let component = context(key)

  // Strip the leading `./` and extension from the key
  let componentName = key.replace(/^\.\/(.*)\.\w+$/, '$1')

  // Register component globally
  Vue.component(componentName, component.default || component)
})

Vue.config.productionTip = false
Vue.use(VueHighlightJS)

new Vue({
  render: h => h(App),
  data: { locale: 'fr-fr' },
}).$mount('#app')
