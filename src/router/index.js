import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import {
  CHECK_TOKEN
} from '../store/mutation-types'


const login = () =>
  import("../components/common/login");
const stu_index = () =>
  import("components/content/index_stu")
const stu_index_content = () =>
  import("components/content/stu_index_content")
const Teacher = () =>
  import("../views/Teacher/Teacher")
const CollegeAdmin = () =>
  import("../views/CollegeAdmin/collegeAdmin")
const Admin = () =>
  import("../views/Admin/admin")
const Expert = () =>
  import("../views/Expert/expert")
const teacherContent = () =>
  import("../components/content/teacherContent")
const expertContent = () =>
  import("../components/content/expertContent")
const collegeAdminContent = () =>
  import("../components/content/collegeAdminContent")
const AdminContent = () =>
  import("../components/content/admin_index_content")



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
  component: CollegeAdmin,
  children: [{
    path: '/collegeAdminContent',
    component: collegeAdminContent
  }]
},
{
  path: '/Admin',
  component: Admin,
  children: [{
    path: '/AdminContent',
    component: AdminContent
  }]
},
{
  path: '/Expert',
  component: Expert,
  children: [{
    path: '/expertContent',
    component: expertContent
  }]
}]


const router = new VueRouter({
  routes,
  // mode: 'history'
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('Authorization');
  const identity_ids = [
    "/index",
    "/teacherContent",
    "/collegeAdminContent",
    "/adminContent",
    "/expertContent"
  ]
  let id = localStorage.getItem('iid')
  if (token) {
    if (to.path === '/login') {
      next(identity_ids[id - 1])
    }
    else {
      next()
    }
  } else {
    if (to.path !== '/login') {
      alert('登录已失效，请重新登录');
      next('/login');
    }
    else {
      next();
    }
  }
})

export default router
