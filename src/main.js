import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/monokai.css'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueHighlightJS)

new Vue({
  render: h => h(App),
}).$mount('#app')
