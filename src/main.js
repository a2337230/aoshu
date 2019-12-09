import Vue from 'vue'
import App from './App'
import router from './router'
import VueClipboard from 'vue-clipboard2'
import Mint from 'mint-ui'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css'
// import Vconsole from 'vconsole';
// new Vconsole()
Vue.use(VueClipboard)
Vue.use(Mint)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
