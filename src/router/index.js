// 引入vue包
import Vue from 'vue'
// 引入vue-router包
import VueRouter from 'vue-router'
// 引入要渲染的页面 例如login登录页面
import Login from '@/views/Login.vue'
import Personal from '@/views/Personal.vue'
import editUser from '@/views/editUser.vue'
import register from '@/views/register.vue'
import index from '@/views/index.vue'
import articleDetail from '@/views/articleDetail.vue'
import myFollows from '@/views/myFollows.vue'
import myCollections from '@/views/myCollections.vue'
import comments from '@/views/comments.vue'

// use
Vue.use(VueRouter)
// 创建路由对象
var router = new VueRouter({
  // 配置路由
  routes: [
    {
      name: 'index',
      path: '/',
      component: index
    },
    {
      name: 'register',
      path: '/register',
      component: register
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'personal',
      path: '/personal/:id',
      component: Personal
    },
    {
      name: 'editUser',
      path: '/editUser/:id',
      component: editUser
    },
    {
      name: 'articleDetail',
      path: '/articleDetail/:id',
      component: articleDetail
    },
    {
      name: 'myFollows',
      path: '/myFollows',
      component: myFollows
    },
    {
      name: 'myCollections',
      path: '/myCollections',
      component: myCollections
    },
    {
      name: 'comments',
      path: '/comments/:id',
      component: comments
    }

  ]
})

router.beforeEach((to, from, next) => {
  // next()
  // console.log(to)
  if (to.path.indexOf('/personal/') === 0) {
    // 判断用户是否登录过了
    // localStorage.clear()
    let token = localStorage.getItem('news_token')
    // console.log(token)
    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})
// 暴露路由
export default router
