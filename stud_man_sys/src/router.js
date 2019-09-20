import Vue from 'vue'
import Router from 'vue-router'
import stuList from './views/stuList'
import addStu from './views/addStu'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass:'active',
  linkExactActiveClass:'exact',
  routes: [
    {
      path: '/stulist',
      name: 'stulist',
      component:stuList
    },
    {
      path: '/addstu',
      name: 'addstu',
      component: addStu
    },
    {
      path: '*',
      redirect: '/stulist'
    }
  ]
})
