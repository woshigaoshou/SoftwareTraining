import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import {
    CHECK_TOKEN
} from '../store/mutation-types'

const login = () =>
    import ("../components/common/login");
const student = () =>
    import ("../views/student")
const stu_index_content = () =>
    import ("components/content/stu_index_content")
const Teacher = () =>
    import ("../views/Teacher")
const CollegeAdmin = () =>
    import ("../views/collegeAdmin")
const Admin = () =>
    import ("../views/admin")
const admin_content = () =>
    import ("../components/content/admin_index_content")
const Expert = () =>
    import ("../views/expert")

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/index',
        component: student,
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
        component: Teacher
    },
    {
        path: '/CollegeAdmin',
        component: CollegeAdmin
    },
    {
        path: '/Admin',
        component: Admin,
        children: [{
            path: '/Admin/index',
            component: admin_content
        }]
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