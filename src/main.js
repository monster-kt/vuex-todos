import Vue from 'vue'
import App from './App.vue'
import store from './store/index'

// 导入 ant-design-vue 组件库
import Antd from 'ant-design-vue'
// 导入组件库的样式表
import 'ant-design-vue/dist/antd.css'

// 阻止启动生产消息，常用作指令
Vue.config.productionTip = false

// 安装组件库
Vue.use(Antd)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
