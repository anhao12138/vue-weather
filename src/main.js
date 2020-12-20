import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 清楚默认样式
import './assets/css/reset.css'
// 引入字体文件
import './assets/css/iconfont.css'
// 天气样式
import './assets/css/bg.styl'
// vant ui组件按需导入
import './plugins/vant.js'

Vue.config.productionTip = false
    // 全局使用axios
Vue.prototype.$http = axios
    // https://www.tianqiapi.com/天气API
axios.defaults.baseURL = 'https://v0.yiketianqi.com/'


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')