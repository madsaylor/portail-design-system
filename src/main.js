import Vue from 'vue'
import VueSignaturePad from 'vue-signature-pad'
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/monokai.css'
import Internationalization from './plugins/Internationalization'

import './utils/patch-ios-safari-click'

import './fonts/lato.css'
import App from './App.vue'
import moment from 'moment'


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
Vue.use(VueSignaturePad)
Vue.use(Internationalization)

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('shortDate', function (value) {
  if (!value) return ''
  return moment(value).format('DD/MM/YYYY');
})

new Vue({
  render: h => h(App),
  data: { locale: 'fr-fr' },
}).$mount('#app')
