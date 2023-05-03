import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueECharts from 'vue-echarts';
import "echarts";
import dataV from '@jiaminghi/data-view'
import "@/assets/variables.css"
import BaiduMap from 'vue-baidu-map'
import { BmlMarkerClusterer } from 'vue-baidu-map'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './utils/rem.js'
Vue.use(Element)

Vue.component("v-chart", VueECharts);
Vue.config.productionTip = false
Vue.use(dataV)
Vue.use(BaiduMap, {
  ak: 'iPZbUG8dlX7KKf0K5zk9L76UljGkyyPq'
})
Vue.component('bml-marker-cluster', BmlMarkerClusterer)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
