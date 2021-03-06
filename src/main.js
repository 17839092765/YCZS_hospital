import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
import * as echarts from 'echarts'

Vue.config.productionTip = false

/* rem */
function resize() {
  const doc = document.documentElement
  doc.style.fontSize = doc.clientWidth / 19.2 + 'px'
}
resize()
window.addEventListener('resize', resize)
document.documentElement.addEventListener('DOMContentLoaded', resize)

window.echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')