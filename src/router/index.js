import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Synthetical from '../views/Synthetical.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  redirect: '/0',
  children: [{
      path: '0',
      name: 'Synthetical',
      component: Synthetical,
    },
    {
      path: '1',
      name: '',
    },
    {
      path: '2',
      name: '',
    },
    {
      path: '3',
      name: '',
    },
    {
      path: '4',
      name: '',
    },
    {
      path: '5',
      name: '',
    },
    {
      path: '6',
      name: '',
    },
    {
      path: '7',
      name: '',
    },
  ]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router