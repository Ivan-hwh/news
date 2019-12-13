// 引入vue包
import Vue from 'vue'
// 引入vue-router包
import VueRouter from 'vue-router'
// 引入要渲染的页面 例如login登录页面
import Login from '@/views/Login.vue'
import Personal from '@/views/Personal.vue'

// use
Vue.use(VueRouter)
// 创建路由对象
var router = new VueRouter({
  // 配置路由
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'Personal',
      path: '/Personal/:id',
      component: Personal
    }

  ]
})
// 暴露路由
export default router
