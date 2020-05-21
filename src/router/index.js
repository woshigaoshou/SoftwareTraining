import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import {
  CHECK_TOKEN
} from '../store/mutation-types'

const login = () => import("../components/common/login");
const stu_index = () => import("components/content/index_stu")
const stu_index_content = () => import("components/content/stu_index_content")
const Teacher = () => import("../views/Teacher/Teacher")
const CollegeAdmin = () => import("../views/CollegeAdmin/collegeAdmin")
const Admin = () => import("../views/Admin/admin")
const Expert = () => import("../views/Expert/expert")
const teacherContent = () => import("../components/content/teacherContent")

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/index',
  component: stu_index,
  children: [{
    path: '/index',
    component: stu_index_content
  }]
},
{
  path: '/login',
  component: login
},
{
  path: '/Teacher',
  component: Teacher,
  children: [{
    path: '/teacherContent',
    component: teacherContent
  }]
},
{
  path: '/CollegeAdmin',
  component: CollegeAdmin
},
{
  path: '/Admin',
  component: Admin
},
{
  path: '/Expert',
  component: Expert
},
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  // console.log(to.path);
  // console.log(next);
  if (to.path === '/login') {
    let token = localStorage.getItem('Authorization');
    if (token === '' || token === null) {
      next();
    } else {
      next('/index');
    }
  } else {
    store.commit(CHECK_TOKEN)
    next()
  }
})

export default router
