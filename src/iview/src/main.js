import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import HfUi from './common'
import './assets/styles/index.less'

Vue.use(iView, {
  // transfer: true,
  // size: 'small'
})

Vue.use(HfUi)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
