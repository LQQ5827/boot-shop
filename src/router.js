import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/admin/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'layout',
      component: Home,
      children: [
        { path: 'admin', name: 'admin', component: Admin },
        { path: 'goods', name: 'goods', component: () => import('@/views/admin/goods/index.vue') },
        { path: 'category', name: 'category', component: () => import('@/views/admin/goods/category.vue') },
        { path: 'order', name: 'order', component: () => import('@/views/admin/order/index.vue') },
        { path: 'user', name: 'user', component: () => import('@/views/admin/user/index.vue') },
      ]
    },
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Login.vue')
    }, {
      path: '/index',
      name: 'index',
      component: () => import('@/views/front/index.vue')
    },
  ]
})
