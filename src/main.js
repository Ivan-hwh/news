import Vue from 'vue'
import App from './App.vue'
import '@/styles/reset.css'
import router from '@/router/index.js'
import { Toast, Uploader, Dialog, Field, Popup, Picker, Icon, Tab, Tabs, List, PullRefresh } from 'vant'

Vue.use(Toast)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
Vue.use(PullRefresh)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
