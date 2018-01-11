import Vue from 'vue'
import App from './App.vue'

import store from './store'

Vue.config.productionTip = false

const app = new Vue({
  store,
  el: '#App',
  template: '<App></App>',
  components: { App }
})
