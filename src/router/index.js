import Vue from 'vue'
import VueRouter from 'vue-router'

const index = () => import("../components/content/index");
const login = () => import("../components/common/login");
const register = () => import("../components/common/register");

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/index',
    component: index
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/register',
    component: register
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
